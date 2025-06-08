import NavigationCard from "../../components/NavigationCard.jsx";
import {UserOutlined, BankOutlined, AppstoreOutlined } from "@ant-design/icons";

export default function Admin() {
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
            Admin Dashboard
        </h1>
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
            }}
        >
            <NavigationCard title="User Verwaltung" icon={<UserOutlined/>} link="/admin/users"/>
            <NavigationCard title="Company Verwaltung" icon={<BankOutlined/>} link="/admin/companies"/>
            <NavigationCard title="Artikel Verwaltung" icon={<AppstoreOutlined/>} link="/admin/articles"/>
        </div>

    </div>
    );
}
