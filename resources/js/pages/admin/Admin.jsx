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
        <h1 className="page-title">
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
