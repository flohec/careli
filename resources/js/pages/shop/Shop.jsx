import NavigationCard from "../../components/NavigationCard.jsx";
import {AppstoreOutlined, BankOutlined, UserOutlined} from "@ant-design/icons";

export default function Shop() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '5%',
            paddingRight: '5%',
        }}>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                }}
            >
                <NavigationCard title="Standard Serverschränke" icon={<UserOutlined/>} link="/admin/users"/>
                <NavigationCard title="Deluxe Serverschränke" icon={<BankOutlined/>} link="/admin/companies"/>
                <NavigationCard title="Kühlung" icon={<AppstoreOutlined/>} link="/admin/articles"/>
                <NavigationCard title="Serverschrank Konfigurator" icon={<AppstoreOutlined/>} link="/admin/articles"/>
            </div>
        </div>
    );
}
