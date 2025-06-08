export default function ArticleManagement() {
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
                Article Management
            </h1>
            <p>Manage users here.</p>
        </div>
    );
}
