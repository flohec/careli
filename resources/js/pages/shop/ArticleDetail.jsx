import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rate, Spin, Alert, Avatar, Divider, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
    const id = atob(hashedId);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <div style={{ flex: "1 1 400px" }}>
                    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{article.name}</h1>
                    <h2 style={{ fontSize: "1.5rem", color: "#1677FF", marginBottom: "1.5rem" }}>
                        {parseFloat(article.base_price).toFixed(2)} €
                    </h2>

                    <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#444" }}>
                        {article.description}
                    </p>

                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ marginBottom: "0.5rem" }}>Details</h3>
                        <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
                            <li><strong>Kategorie:</strong> {article.category?.name}</li>
                            <li><strong>Größe:</strong> {article.height}×{article.width}×{article.depth} cm</li>
                            <li><strong>Gewicht:</strong> {article.weight} kg</li>
                            <li><strong>Bestand:</strong> {article.quantity}</li>
                            <li><strong>Artikel-Nr.:</strong> {article.id}</li>
                        </ul>
                    </div>

                    <Button type="primary" size="large" style={{ borderRadius: "8px" }}>
                        In den Warenkorb
                    </Button>
                </div>
            </div>

            {/* Bewertungen */}
            <Divider orientation="left" plain style={{ fontSize: "20px" }}>
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
