export default function FooterLinksPage({ type }) {
    const headingStyle = { color: '#2B93DD', marginTop: '2.5rem' };
    const subHeadingStyle = { color: '#1677FF', marginTop: '1.5rem' };
    const firstHeadingStyle = { ...headingStyle, marginTop: 0 };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '5%',
            paddingRight: '5%',
        }}>
            <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2B93DD, #000066)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'left',
                marginBottom: '20px',
            }}>
                {type}
            </h1>
            <div style={{ marginBottom: '5%' }}>
                {type === 'Impressum' && (
                    <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                        <h2 style={firstHeadingStyle}>Angaben gemäß § 5 TMG</h2>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>Careli GmbH</span><br />
                            Musterstraße 1<br />
                            12345 Musterstadt<br />
                            Deutschland
                        </p>
                        <h2 style={headingStyle}>Vertreten durch</h2>
                        <p>Geschäftsführer: Max Mustermann</p>
                        <h2 style={headingStyle}>Kontakt</h2>
                        <p>
                            Telefon: <span style={{ color: '#007BFF' }}>01234 / 567890</span><br />
                            E-Mail: <a href="mailto:info@careli.de" style={{ color: '#007BFF' }}>info@careli.de</a><br />
                            Website: <a href="https://www.careli.de" style={{ color: '#007BFF' }}>www.careli.de</a>
                        </p>
                        <h2 style={headingStyle}>Registereintrag</h2>
                        <p>
                            Eintragung im Handelsregister.<br />
                            Registergericht: Musterstadt<br />
                            Registernummer: HRB 123456
                        </p>
                        <h2 style={headingStyle}>Umsatzsteuer-ID</h2>
                        <p>
                            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                            DE123456789
                        </p>
                        <h2 style={headingStyle}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                        <p>Max Mustermann, Anschrift wie oben</p>
                        <h2 style={headingStyle}>Haftungsausschluss</h2>
                        <p>
                            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                        </p>
                    </div>
                )}
                {type === 'Datenschutzerklärung' && (
                    <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                        <h2 style={firstHeadingStyle}>1. Datenschutz auf einen Blick</h2>
                        <p>
                            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                        </p>
                        <h2 style={headingStyle}>2. Verantwortliche Stelle</h2>
                        <p>
                            Careli GmbH<br />
                            Musterstraße 1<br />
                            12345 Musterstadt<br />
                            E-Mail: <a href="mailto:datenschutz@careli.de" style={{ color: '#007BFF' }}>datenschutz@careli.de</a>
                        </p>
                        <h2 style={headingStyle}>3. Datenerfassung auf unserer Website</h2>
                        <h3 style={subHeadingStyle}>a) Server-Log-Dateien</h3>
                        <p>
                            Beim Aufrufen unserer Website werden durch den Provider automatisch Informationen in sogenannten Server-Log-Dateien gespeichert. Dies sind z.B. Browsertyp, Betriebssystem, Referrer-URL, Hostname und Uhrzeit der Serveranfrage. Diese Daten sind nicht bestimmten Personen zuordenbar.
                        </p>
                        <h3 style={subHeadingStyle}>b) Kontaktformular</h3>
                        <p>
                            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                        </p>
                        <h2 style={headingStyle}>4. Cookies</h2>
                        <p>
                            Unsere Website verwendet Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
                        </p>
                        <h2 style={headingStyle}>5. Analyse-Tools und Werbung</h2>
                        <p>
                            Wir nutzen keine externen Analyse- oder Werbetools, die personenbezogene Daten an Dritte weitergeben.
                        </p>
                        <h2 style={headingStyle}>6. Ihre Rechte</h2>
                        <p>
                            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
                        </p>
                        <h2 style={headingStyle}>7. Kontakt Datenschutz</h2>
                        <p>
                            Bei Fragen zum Datenschutz wenden Sie sich bitte an: <a href="mailto:datenschutz@careli.de" style={{ color: '#007BFF' }}>datenschutz@careli.de</a>
                        </p>
                    </div>
                )}
                {type === 'Nutzungsbedingungen' && (
                    <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                        <h2 style={firstHeadingStyle}>1. Geltungsbereich</h2>
                        <p>
                            Diese Nutzungsbedingungen gelten für alle Bestellungen und die Nutzung unseres Webshops für Serverschränke und Zubehör.
                        </p>
                        <h2 style={headingStyle}>2. Vertragsschluss</h2>
                        <p>
                            Der Vertrag kommt durch Ihre Bestellung im Onlineshop und unsere Bestätigung per E-Mail zustande. Sie erhalten eine Übersicht Ihrer Bestellung und die Vertragsbedingungen.
                        </p>
                        <h2 style={headingStyle}>3. Preise und Zahlung</h2>
                        <p>
                            Alle Preise sind Endpreise und enthalten die gesetzliche Mehrwertsteuer. Die Zahlung kann per Vorkasse, PayPal oder Kreditkarte erfolgen. Die Zahlungsabwicklung erfolgt über sichere, verschlüsselte Verbindungen.
                        </p>
                        <h2 style={headingStyle}>4. Lieferung und Versand</h2>
                        <p>
                            Die Lieferung erfolgt an die von Ihnen angegebene Adresse. Die Lieferzeit beträgt in der Regel 3-5 Werktage. Versandkosten werden im Bestellprozess angezeigt.
                        </p>
                        <h2 style={headingStyle}>5. Widerrufsrecht</h2>
                        <p>
                            Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Details finden Sie in unserer Widerrufsbelehrung.
                        </p>
                        <h2 style={headingStyle}>6. Haftung</h2>
                        <p>
                            Wir haften nur für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten.
                        </p>
                        <h2 style={headingStyle}>7. Schlussbestimmungen</h2>
                        <p>
                            Es gilt deutsches Recht. Gerichtsstand ist unser Firmensitz. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
