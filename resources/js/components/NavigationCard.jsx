import { Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function NavigationCard({ title, icon = <UserOutlined />, link }) {
    return (
        <Link
            to={link}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                flex: '1 1 calc((100% - 40px) / 3)',
                minWidth: '250px',
            }}
        >
            <Card
                hoverable
                style={{
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    background: '#f5f5f5',
                    padding: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                bodyStyle={{ padding: 0 }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                    const titleEl = e.currentTarget.querySelector('.card-title');
                    titleEl.style.textDecoration = 'underline';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    const titleEl = e.currentTarget.querySelector('.card-title');
                    titleEl.style.textDecoration = 'none';
                }}
            >
                <div style={{ fontSize: '3rem', color: '#2D94DE', marginBottom: '10px' }}>
                    {icon}
                </div>
                <h2
                    className="card-title"
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        color: '#2D94DE',
                        textDecoration: 'none',
                        transition: 'text-decoration 0.3s ease',
                    }}
                >
                    {title}
                </h2>
            </Card>
        </Link>
    );
}
