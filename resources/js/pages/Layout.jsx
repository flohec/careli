import { Layout, Menu, Badge, Avatar, Dropdown, Modal, Form, Input, message as antMessage } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import {useUser} from "../context/UserContext.jsx";
import {useState} from "react";

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
    const { user, login, logout } = useUser();
    const role = user ? user?.role?.slug : 'guest';
    console.log('Current role:', role);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleLogin = async () => {
        try {
            const values = await form.validateFields();
            const result = await login(values.email, values.password);
            if (result.success) {
                antMessage.success(result.message || 'Login erfolgreich!');
                setLoginModalVisible(false);
            } else {
                antMessage.error(result.message || 'Login fehlgeschlagen!');
            }
        } catch (err) {
            console.error('Login validation error:', err);
        }
    };

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            antMessage.success(result.message);
        } else {
            antMessage.error(result.message);
        }
    };
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
                    { role === 'admin' && (
                        <Menu.Item key="admin">
                            <Link style={{ fontWeight: 'bold' }} to="/admin">Admin</Link>
                        </Menu.Item>
                    )}
                </Menu>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Badge count={3} style={{ backgroundColor: '#007BFF' }}>
                        <ShoppingCartOutlined style={{ fontSize: '40px', cursor: 'pointer' }} />
                    </Badge>
                    <Dropdown
                        overlay={
                            <Menu>
                                {!user ? (
                                    <Menu.Item key="login" onClick={() => setLoginModalVisible(true)}>
                                        Login
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item key="logout" onClick={handleLogout}>
                                        Logout
                                    </Menu.Item>
                                )}
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Avatar icon={<UserOutlined />} size={50} style={{ cursor: 'pointer' }} />
                    </Dropdown>
                </div>
            </Header>
            <Modal
                title="Login"
                open={loginModalVisible}
                onCancel={() => setLoginModalVisible(false)}
                onOk={handleLogin}
                okText="Login"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>

            <Content style={{ padding: '1rem', flex: 1 }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center', background: '#2D94DE', color: '#fff' }}>
                © {new Date().getFullYear()} My Application. All rights reserved.
            </Footer>
        </Layout>
    );
}
