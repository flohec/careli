import { Layout, Menu, Badge, Avatar, Dropdown, Modal, Form, Input, message as antMessage } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import {useUser} from "../context/UserContext.jsx";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import { LogIn, UserPlus, LogOut } from 'lucide-react';

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || 'home';
    const { user, login, logout, fetchUser } = useUser();
    const role = user ? user?.role?.slug : 'guest';
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [cartAmount, setCartAmount] = useState(0);

    const handleLogin = async () => {
        try {
            const values = await form.validateFields();
            const result = await login(values.email, values.password);
            if (result.success) {
                await fetchUser(); // User neu laden
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
        await fetchUser(); // User neu laden
        if (result.success) {
            antMessage.success(result.message);
        } else {
            antMessage.error(result.message);
        }
    };
    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', height: '80px' }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    marginRight: '2%',
                }}>
                    <img
                        src="/images/logo2.png"
                        alt="Logo"
                        style={{
                            height: '100px',
                            width: '70px',
                            objectFit: 'contain',
                            marginRight: '4%',
                        }}
                    />
                </Link>
                <Menu mode="horizontal" selectedKeys={[currentPath]} style={{ lineHeight: '80px', flex: 1 }}>
                    <Menu.Item key="home">
                        <Link style={{ fontWeight: 'bold' }} to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="server-racks">
                        <Link style={{ fontWeight: 'bold' }} to="/server-racks">Serverschränke</Link>
                    </Menu.Item>
                    <Menu.Item key="cooling">
                        <Link style={{ fontWeight: 'bold' }} to="/cooling">Kühlung</Link>
                    </Menu.Item>
                   <Menu.Item key="configurator">
                       <Link
                           style={{
                               fontWeight: 'bold',
                               display: 'flex',
                               alignItems: 'center',
                               gap: 8,
                               position: 'relative'
                           }}
                           to="/configurator"
                       >
                           Serverschrank Konfigurator
                           <span
                               style={{
                                   background: 'linear-gradient(90deg, #1677FF 60%, #3D7CC6 100%)',
                                   color: '#fff',
                                   borderRadius: '999px',
                                   fontSize: '0.7rem',
                                   padding: '2px 10px',
                                   marginLeft: 0,
                                   marginBottom: 10,
                                   fontWeight: 700,
                                   boxShadow: '0 2px 8px rgba(22, 119, 255, 0.15)',
                                   letterSpacing: 1,
                                   lineHeight: 1.5,
                                   display: 'inline-block',
                                   verticalAlign: 'middle',
                                   border: '1px solid #1677FF'
                           }}
                           >
                               NEW
                           </span>
                       </Link>
                   </Menu.Item>
                    <Menu.Item key="about">
                        <Link style={{ fontWeight: 'bold' }} to="/about">Über uns</Link>
                    </Menu.Item>
                    { role === 'admin' && (
                        <Menu.Item key="admin">
                            <Link style={{ fontWeight: 'bold' }} to="/admin">Admin</Link>
                        </Menu.Item>
                    )}
                </Menu>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to={`/checkout`} style={{ display: 'flex', alignItems: 'center' }}>
                        <Badge count={cartAmount} style={{ backgroundColor: '#007BFF' }}>
                            <ShoppingCartOutlined style={{ fontSize: '40px', cursor: 'pointer' }} />
                        </Badge>
                    </Link>
                    <Dropdown
                        overlay={
                            <Menu>
                                {!user ? [
                                    <Menu.Item key="signup" onClick={() => setLoginModalVisible(true)}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <UserPlus style={{ marginRight: 6, fontSize: 18 }} />
                                            Registrieren
                                        </span>
                                    </Menu.Item>,
                                    <Menu.Item key="login" onClick={() => setLoginModalVisible(true)}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <LogIn style={{ marginRight: 6, fontSize: 18 }} />
                                            Login
                                        </span>
                                    </Menu.Item>
                                ] : (
                                    <Menu.Item key="logout" onClick={handleLogout}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <LogOut style={{ marginRight: 6, fontSize: 18 }} />
                                            Logout
                                        </span>
                                    </Menu.Item>
                                )}
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Avatar
                            icon={<UserOutlined />}
                            size={50}
                            style={{
                                backgroundColor: '#1677FF',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 119, 255, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
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
            <Footer style={{ background: 'linear-gradient(135deg, #3D7CC6, #132740)', color: '#fff' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                       <div style={{ display: 'flex', gap: '2rem', marginTop: '-2%' }}>
                           <Link className="footer-link" to="/imprint">Impressum</Link>
                           <Link className="footer-link" to="/privacy-policy">Datenschutzerklärung</Link>
                           <Link className="footer-link" to="/terms-of-use">AGB</Link>
                           <Link className="footer-link" to="/cookies">Cookie Settings</Link>
                       </div>
                       <div style={{ marginTop: '2%'}}>
                           © {new Date().getFullYear()} Careli GmbH
                       </div>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                       <img src="/images/logo-extended.png" alt="Logo" style={{ height: '70px', marginTop: '1%' }} />
                   </div>
               </div>
            </Footer>
        </Layout>
    );
}
