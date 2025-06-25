import { memo } from 'react';
import { Row, Col, Card, Button, Typography, Rate } from 'antd';
import {
    DatabaseOutlined,
    SketchOutlined,
    DashboardOutlined,
    ArrowRightOutlined,
    AmazonOutlined,
    GoogleOutlined,
    WindowsOutlined,
    OpenAIOutlined,
    FacebookOutlined,
    DiscordOutlined, CheckCircleOutlined, ThunderboltOutlined, LockOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../css/home.css';

const { Title, Paragraph, Text } = Typography;

// Data constants
const CATEGORIES = [
    {
        id: 'standard',
        title: 'Standard Racks',
        icon: <DatabaseOutlined />,
        description: 'Zuverlässige und robuste Server-Racks für den professionellen Einsatz'
    },
    {
        id: 'deluxe',
        title: 'Deluxe Racks',
        icon: <SketchOutlined />,
        description: 'Premium Server-Racks mit erweiterten Features und höchster Qualität'
    },
    {
        id: 'cooling',
        title: 'Kühlung',
        icon: <DashboardOutlined />,
        description: 'Professionelle Kühlungslösungen für optimale Serverperformance'
    }
];

const PARTNERS = [
    {
        name: 'Discord',
        icon: <DiscordOutlined style={{fontSize: '48px', color: '#5d6af2'}}/>,
        color: '#5d6af2'
    },
    {
        name: 'Amazon',
        icon: <AmazonOutlined style={{ fontSize: '48px', color: '#ff9c08' }} />,
        color: '#ff9c08'
    },
    {
        name: 'Google',
        icon: <GoogleOutlined style={{ fontSize: '48px', color: '#3aab58' }} />,
        color: '#3aab58'
    },
    {
        name: 'Microsoft',
        icon: <WindowsOutlined style={{ fontSize: '48px', color: '#ff5c29' }} />,
        color: '#ff5c29'
    },
    {
        name: 'OpenAI',
        icon: <OpenAIOutlined style={{ fontSize: '48px', color: '#333333' }} />,
        color: '#333333'
    },
    {
        name: 'Meta',
        icon: <FacebookOutlined style={{ fontSize: '48px', color: '#106bff' }} />,
        color: '#106bff'
    }
];

const REVIEWS = [
    {
        name: 'Michael Schmidt',
        company: 'Amazon Web Services',
        rating: 4,
        comment: 'Ausgezeichnete Qualität und schnelle Lieferung. Die Server-Racks entsprechen genau unseren Anforderungen.'
    },
    {
        name: 'Sarah Weber',
        company: 'Google Cloud',
        rating: 5,
        comment: 'Sehr professioneller Service und hochwertige Produkte. Können wir nur weiterempfehlen!'
    },
    {
        name: 'Thomas Müller',
        company: 'Microsoft Azure',
        rating: 5,
        comment: 'Kompetente Beratung und maßgeschneiderte Lösungen. Top Qualität zu fairen Preisen.'
    }
];

const CategoryCard = memo(({ category }) => {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        navigate('/shop', { state: { category: category.id } });
    };

    return (
        <div className="category-card" onClick={handleCategoryClick}>
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-title">{category.title}</h3>
            <p className="category-description">{category.description}</p>
            <button className="category-button">
                Jetzt entdecken <ArrowRightOutlined />
            </button>
        </div>
    );
});

// Hero Banner Section
const HeroBanner = memo(() => (
    <div style={{
        width: '100vw',
        height: '60vh',
        marginLeft: 'calc(-50vw + 50%)',
        backgroundImage: 'url(/images/serverRackBanner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative'
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(22, 119, 255, 0.7)'
        }}></div>
        <div className="page-content" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '600px', textAlign: 'left' }}>
                <Title level={1} style={{ color: 'white', fontWeight: 'bold', fontSize: '3.5rem', marginBottom: '1rem' }}>
                    Hochwertige Server-Racks für Ihr Rechenzentrum
                </Title>
                <Paragraph style={{ color: 'white', fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Entdecken Sie unsere robusten und zuverlässigen Server-Lösungen, die für maximale Performance und Sicherheit entwickelt wurden.
                </Paragraph>
                <Button type="primary" size="large" className="primary-button">
                    Jetzt entdecken <ArrowRightOutlined />
                </Button>
            </div>
        </div>
    </div>
));

// Shop by Category Section
const CategoriesSection = memo(() => (
    <section className="categories-section">
        <div className="page-content">
            <h2 className="section-title">Kategorien Entdecken</h2>
            <p className="section-subtitle">Entdecken Sie unsere Produktvielfalt für jede Anforderung.</p>
            <div className="categories-grid">
                {CATEGORIES.map(category => <CategoryCard key={category.id} category={category} />)}
            </div>
        </div>
    </section>
));

// Partner Section
const PartnerSection = memo(() => (
    <section className="partner-section">
        <div className="page-content">
            <h2 className="section-title">Unsere Partner</h2>
            <p className="section-subtitle">
                Wir arbeiten mit führenden Unternehmen zusammen, um erstklassige Lösungen zu liefern.
            </p>
            <div className="partner-grid">
                {PARTNERS.map(partner => (
                    <div key={partner.name} className="partner-card">
                        <div className="partner-logo" title={partner.name}>
                            {partner.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
));

// Featured Product Section
const FeaturedProductSection = memo(() => (
    <section className="featured-product-section">
        <div className="page-content">
            <div className="featured-product-card">
                <div className="featured-product-image">
                    <img src="/images/premium-server-rf1-42u-800x1200-a-plus-coolseven-ac-c7-dx-xxxxxxx-web-0970df63.jpg" alt="Featured Product"/>
                    <div className="image-overlay">
                        <span className="overlay-text">Bestseller</span>
                    </div>
                </div>
                <div className="featured-product-content">
                    <h2 className="section-title">Produkt-Highlight</h2>
                    <h3 className="featured-product-title">TitanFrame DC-42</h3>
                    <p className="featured-product-description">
                        Maximale Leistung und Flexibilität für Ihr Rechenzentrum. Mit integrierter Kühlung, modularem Design und verstärktem Sicherheitsglas.
                    </p>
                    <ul className="featured-product-specs">
                        <li><CheckCircleOutlined /> 42 Höheneinheiten</li>
                        <li><ThunderboltOutlined /> Integrierte PDU</li>
                        <li><LockOutlined /> Sicherheitsschlösser</li>
                    </ul>
                    <Button type="primary" size="large" className="primary-button">
                        Jetzt entdecken <ArrowRightOutlined />
                    </Button>
                </div>
            </div>
        </div>
    </section>
));


// Reviews Section
const ReviewsSection = memo(() => (
    <section className="reviews-section">
        <div className="page-content">
            <h2 className="section-title">Kundenbewertungen</h2>
            <p className="section-subtitle">
                Hören Sie, was unsere zufriedenen Kunden über uns zu sagen haben.
            </p>
            <div className="reviews-grid">
                {REVIEWS.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-header">
                            <div className="review-rating">
                                <Rate disabled defaultValue={review.rating} />
                            </div>
                            <h4 className="review-author">{review.name}</h4>
                            <p className="review-company">{review.company}</p>
                        </div>
                        <p className="review-comment">"{review.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
));

// Main Home Component
export default function Home() {
    return (
        <div className="home-page">
            <HeroBanner />
            <CategoriesSection />
            <FeaturedProductSection />
            <PartnerSection />
            <ReviewsSection />
        </div>
    );
}
