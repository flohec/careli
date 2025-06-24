import React, { useState, useEffect } from 'react';
import { Heart, Shield, Lightbulb, Zap, Users, Globe, Target, ArrowRight } from 'lucide-react';
import '../../css/about.css';

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStat, setCurrentStat] = useState(0);

    const stats = [
        { number: 5000, label: 'Installierte Serverschränke', suffix: '+' },
        { number: 100, label: 'Team Mitglieder', suffix: '+' },
        { number: 20, label: 'Jahre Erfahrung', suffix: '' },
        { number: 99, label: 'Kundenzufriedenheit', suffix: '%' }
    ];

    const values = [
        {
            icon: Heart,
            title: 'Leidenschaft',
            description: 'Wir fertigen Serverschränke mit höchster Präzision und Liebe zum Detail.'
        },
        {
            icon: Shield,
            title: 'Sicherheit',
            description: 'Unsere Schränke bieten maximale Sicherheit für Ihre wertvollen Daten.'
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'Stets auf dem neuesten Stand für moderne IT-Infrastrukturen.'
        },
        {
            icon: Zap,
            title: 'Qualität',
            description: 'Robuste Materialien und sorgfältige Verarbeitung garantieren Langlebigkeit.'
        }
    ];

    const team = [
        {
            name: 'Anna Becker',
            role: 'Geschäftsführerin',
            image: '👩‍💼',
            description: 'Anna führt unser Unternehmen mit Weitblick und technischem Know-how.',
            social: { linkedin: '#', twitter: '#' }
        },
        {
            name: 'Stefan Müller',
            role: 'Leiter Produktion',
            image: '👨‍🏭',
            description: 'Stefan sorgt für höchste Fertigungsqualität in jeder Produktionsphase.',
            social: { linkedin: '#', github: '#' }
        },
        {
            name: 'Laura Schmidt',
            role: 'Leiterin Design',
            image: '👩‍🎨',
            description: 'Laura entwickelt modulare, moderne Designs für flexible Serverlösungen.',
            social: { linkedin: '#', dribbble: '#' }
        },
        {
            name: 'Thomas Richter',
            role: 'Marketing & Vertrieb',
            image: '👨‍💼',
            description: 'Thomas bringt unsere Schränke erfolgreich in Rechenzentren weltweit.',
            social: { linkedin: '#', twitter: '#' }
        }
    ];

    const milestones = [
        { year: '2005', title: 'Gründung', description: 'Start der Produktion von Serverschränken.' },
        { year: '2010', title: 'Erweiterung', description: 'Neues Werk für Großserienproduktion.' },
        { year: '2015', title: 'Internationalisierung', description: 'Export nach Europa und Asien.' },
        { year: '2020', title: 'Smart Cabinets', description: 'Markteinführung smarter Schranklösungen.' },
        { year: '2024', title: '5.000 Installationen', description: 'Erreichen eines wichtigen Meilensteins.' }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const AnimatedCounter = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let startTime = null;
            const animate = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }, [end, duration]);

        return count;
    };

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className={`hero-text ${isVisible ? 'visible' : 'hidden'}`}>
                        <h1 className="hero-title">Über Uns</h1>
                        <p className="hero-subtitle">
                            Wir sind führender Hersteller von hochwertigen Serverschränken – zuverlässig, sicher und innovativ.
                        </p>
                        <div className="hero-divider">
                            <div className="divider-line"></div>
                            <div className="divider-line active"></div>
                            <div className="divider-line"></div>
                        </div>
                    </div>
                </div>
                <div className="floating-element small"></div>
                <div className="floating-element large"></div>
                <div className="floating-element medium"></div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-box">
                            <div className={`stat-number ${currentStat === index ? 'active' : ''}`}>
                                <AnimatedCounter end={stat.number} />{stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="mission-container">
                    <div className="mission-text">
                        <h2 className="section-title">Unsere Mission</h2>
                        <p>
                            Wir entwickeln und fertigen Serverschränke, die den höchsten Ansprüchen an Qualität und Flexibilität gerecht werden. Unser Ziel ist es, IT-Infrastrukturen weltweit zu sichern und zu optimieren.
                        </p>
                        <button className="primary-button">
                            <span>Mehr erfahren</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                    <div className="mission-box">
                        <Target size={64} className="mission-icon" />
                        <h3>Unser Ziel</h3>
                        <p>
                            Die beste Schranklösung für jede IT-Umgebung – stabil, sicher und individuell anpassbar.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <h2 className="section-title">Unsere Werte</h2>
                <div className="values-grid">
                    {values.map((value, index) => (
                        <div key={index} className="value-box">
                            <div className="value-icon">
                                <value.icon size={32} />
                            </div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section">
                <h2 className="section-title">Unsere Geschichte</h2>
                <div className="timeline">
                    {milestones.map((milestone, index) => (
                        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="timeline-content">
                                <div className="timeline-year">{milestone.year}</div>
                                <h3>{milestone.title}</h3>
                                <p>{milestone.description}</p>
                            </div>
                            <div className="timeline-dot"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2 className="section-title">Unser Team</h2>
                <div className="team-grid">
                    {team.map((member, index) => (
                        <div key={index} className="team-box">
                            <div className="team-image">{member.image}</div>
                            <h3>{member.name}</h3>
                            <p className="team-role">{member.role}</p>
                            <p className="team-description">{member.description}</p>
                            <div className="team-socials">
                                <Users size={16} />
                                <Globe size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
