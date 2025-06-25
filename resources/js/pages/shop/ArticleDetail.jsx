import { useEffect, useState } from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rate, Spin, Alert, Avatar, Divider, Button, InputNumber } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {useUser} from "../../context/UserContext.jsx";

const placeholderImg = "/images/logo.png";

const fakeReviews = [
    {
        user: "TechTom",
        rating: 5,
        comment: "Super stabiler Schrank, perfekte Kühlung, sehr empfehlenswert!",
    },
    {
        user: "AdminAnna",
        rating: 4,
        comment: "Montage war einfach, Lieferung schnell – Preis-Leistung top!",
    },
    {
        user: "RackRainer",
        rating: 5,
        comment: "Endlich genug Platz für alle Server – klare Kaufempfehlung.",
    },
];

export default function ArticleDetail() {
    const { id: hashedId } = useParams();
    const [cartStatus, setCartStatus] = useState(null); // 'success' | 'error'
    const [cartMessage, setCartMessage] = useState("");
    const id = atob(hashedId);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const { user } = useUser(); // Assuming you have a useUser hook to get user info

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/articles/${id}`);
                setArticle(response.data);
            } catch (err) {
                setError("Artikel konnte nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <Spin tip="Lade Artikel..." style={{ display: "block", marginTop: "50px", textAlign: "center" }} />;
    }

    if (error || !article) {
        return <Alert message={error || "Kein Artikel gefunden"} type="error" showIcon style={{ marginTop: "30px" }} />;
    }
    const handleAddToCart = async () => {
        if (!user) {
            setCartStatus("error");
            setCartMessage("Bitte melden Sie sich an, um Artikel zum Warenkorb hinzuzufügen.");
            return;
        }

        try {
            await axios.post('/api/cart', {
                article_id: article.id,
                type: 'article',
                quantity: selectedQuantity,
            }, {
                withCredentials: true
            });

            setCartStatus("success");
            setCartMessage(`${article.name} wurde dem Warenkorb hinzugefügt (${selectedQuantity}x)`);

        } catch (err) {
            console.error(err);
            setCartStatus("error");
            setCartMessage("Fehler beim Hinzufügen zum Warenkorb.");
        }

        // optional: Alert nach 5 Sekunden automatisch ausblenden
        setTimeout(() => {
            setCartStatus(null);
            setCartMessage("");
        }, 5000);
    };



    return (
        <div style={{ width: "100%", maxWidth: "1300px", margin: "0 auto", padding: "3rem 2rem" }}>
            {/* Hauptansicht */}
            <div style={{
                display: "flex",
                gap: "3rem",
                flexWrap: "wrap",
                marginBottom: "3rem",
                alignItems: "flex-start",
            }}>
                {/* Bild */}
                <div style={{
                    flex: "1 1 500px",
                    maxWidth: "600px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
                }}>
                    <img
                        src={article.filepath || placeholderImg}
                        alt={article.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>

                {/* Artikeldetails */}
                <div style={{flex: "1 1 400px"}}>
                    <h1 style={{fontSize: "2.5rem", marginBottom: "1rem"}}>{article.name}</h1>
                    <h2 style={{fontSize: "1.5rem", color: "#1677FF", marginBottom: "1.5rem"}}>
                        {parseFloat(article.base_price).toFixed(2)} €
                    </h2>

                    <p style={{
                        fontSize: "1.3rem",
                        marginBottom: "2rem",
                        color: "#222",
                        backgroundColor: "#f5f7fa",
                        padding: "1.2rem",
                        borderRadius: "12px",
                        lineHeight: 1.7,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>
                        {article.description}
                    </p>

                    <div style={{marginBottom: "2.5rem"}}>
                        <h3 style={{
                            marginBottom: "1rem",
                            fontSize: "1.5rem",
                            borderBottom: "2px solid #e0e0e0",
                            paddingBottom: "0.3rem"
                        }}>
                            Details
                        </h3>
                        <ul style={{
                            lineHeight: 2,
                            paddingLeft: 25,
                            fontSize: "1.2rem",
                            color: "#333",
                        }}>
                            <li><strong>Kategorie:</strong> {article.category?.name}</li>
                            <li><strong>Größe:</strong> {article.height}×{article.width}×{article.depth} cm</li>
                            <li><strong>Gewicht:</strong> {article.weight} kg</li>
                            <li><strong>Bestand:</strong> {article.quantity}</li>
                            <li><strong>Artikel-Nr.:</strong> {article.id}</li>
                        </ul>
                    </div>
                    {cartStatus && (
                        <Alert
                            message={cartMessage}
                            type={cartStatus}
                            showIcon
                            style={{ marginBottom: "1rem", width: "100%" }}
                        />
                    )}
                    <div style={{display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem"}}>
                        <InputNumber
                            min={1}
                            max={article.quantity}
                            defaultValue={1}
                            value={selectedQuantity}
                            onChange={(value) => setSelectedQuantity(value)}
                            style={{width: 100}}
                        />
                        <Button type="primary" size="large" style={{borderRadius: "8px"}} onClick={handleAddToCart}>
                            In den Warenkorb
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bewertungen */}
            <Divider orientation="left" plain style={{fontSize: "20px"}}>
                Kundenbewertungen
            </Divider>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem"
            }}>
                {fakeReviews.map((review, index) => (
                    <div key={index} style={{
                        padding: "1.5rem",
                        borderRadius: "12px",
                        background: "#fafafa",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                            <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
                            <strong>{review.user}</strong>
                        </div>
                        <Rate disabled defaultValue={review.rating} style={{ fontSize: 16, marginBottom: 8 }} />
                        <p style={{ margin: 0 }}>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
