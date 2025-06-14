import { Card, Tooltip } from "antd";
import "../../css/ArticleCard.css";
import { Package, Ruler, Weight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article, onEdit, linkable = false }) {
    const imageUrl = article.filepath || "/images/logo.png";

    return (
        <Link to={`/article/${hashId(article.id)}`} className="article-card-wrapper">
            <Card
                hoverable
                className="article-card"
                onClick={() => onEdit(article)}
                cover={
                    <div className="article-image-wrapper">
                        <img
                            alt="Artikelbild"
                            src={imageUrl}
                            loading="lazy"
                            className="article-image"
                        />
                    </div>
                }
            >
                <div className="article-info">
                    <div className="article-header">
                        <h3 className="article-title">{article.name}</h3>
                        <span className="article-price">{parseFloat(article.base_price).toFixed(2)} €</span>
                    </div>

                    <p className="article-description">{article.description}</p>

                    <div className="article-details-row">
                        <div className="detail">
                            <Package size={16} style={{marginRight: 4}}/>
                            {article.quantity ?? "–"}
                        </div>
                        <div className="detail center">
                            <Ruler size={16} style={{marginRight: 4}}/>
                            {article.height ?? "–"}×{article.width ?? "–"}×{article.depth ?? "–"} cm
                        </div>
                        <div className="detail right">
                            <Weight size={16} style={{marginRight: 4}}/>
                            {article.weight ?? "–"} kg
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
);
}
function hashId(id) {
    return btoa(id.toString()); // "12" → "MTI="
}
