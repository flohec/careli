import { Card } from "antd";

export default function ArticleCard({ article, onEdit }) {
    const imageUrl = article.filepath || "/images/logo.png";
//TODO lazy loading images und lade mini datei hoch dafür
    return (
        <Card
            title={article.name}
            onClick={() => onEdit(article)}
            cover={
                <img
                    alt="Artikelbild"
                    src={imageUrl}
                    style={{
                        height: 200,
                        objectFit: "cover",
                        borderBottom: "1px solid #f0f0f0",
                    }}
                />
            }
        >
            <p><strong>Preis:</strong> {article.base_price} €</p>
            <p><strong>Menge:</strong> {article.quantity}</p>
            <p style={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {article.description}
            </p>
        </Card>
    );
}
