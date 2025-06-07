import { Layout, Menu, Badge, Avatar } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import {useUser} from "../context/UserContext.jsx";

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
    const { user, login, logout } = useUser();
console.log('user', user);
    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', height: '80px' }}>
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    style={{
                        height: '200px',
                        width: '120px',
                        objectFit: 'contain',
                        marginLeft: '-1%',
                        marginRight: '2%',
                    }}
                />
                <Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '80px', flex: 1 }}>
                    <Menu.Item key="home">
                        <Link style={{ fontWeight: 'bold' }} to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="shop">
                        <Link style={{ fontWeight: 'bold' }} to="/shop">Shop</Link>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <Link style={{ fontWeight: 'bold' }} to="/about">About</Link>
                    </Menu.Item>
                    <Menu.Item key="admin">
                        <Link style={{ fontWeight: 'bold' }} to="/admin">Admin</Link>
                    </Menu.Item>
                </Menu>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Badge count={3} style={{ backgroundColor: '#007BFF' }}>
                        <ShoppingCartOutlined style={{ fontSize: '40px', cursor: 'pointer' }} />
                    </Badge>
                    <Avatar icon={<UserOutlined />} size={50} style={{ cursor: 'pointer' }} />                </div>
            </Header>
            <Content style={{ padding: '1rem', flex: 1 }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center', background: '#007BFF', color: '#fff' }}>
                © {new Date().getFullYear()} My Application. All rights reserved.
            </Footer>
        </Layout>
    );
}
