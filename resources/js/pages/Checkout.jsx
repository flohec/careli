import React, { useState, useEffect } from 'react';
import { Steps, Input, Button, Select, Form, Divider, Card, List, Row, Col } from 'antd';
import { CheckOutlined, CreditCardOutlined, TruckOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useUser } from '../context/UserContext.jsx';

const { Step } = Steps;
const { Option } = Select;

export default function Checkout() {
    const { user } = useUser();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Deutschland',
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        notes: ''
    });
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                firstName: user.first_name || '',
                lastName: user.name || '',
                email: user.email || '',
                address: user.street || '',
                city: user.city || '',
                postalCode: user.postal_code || '',
                country: user.country || 'Deutschland',
            }));
        }

        const fetchCart = async () => {
            try {
                const response = await fetch('/api/get-cart');
                const data = await response.json();
                setCartItems(data.items || []);
                const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setSubtotal(total);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [user]);

    const shipping = 5.99;
    const tax = subtotal * 0.19;
    const total = subtotal + shipping + tax;

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        Alert.success('Bestellung erfolgreich aufgegeben! 🎉');
    };

    return (
        <div className="checkout-container" style={{ padding: '2rem' }}>
            <Row gutter={24}>
                {/* Left Section: 2/3 */}
                <Col span={16}>
                    <Card>
                        <Steps current={currentStep} style={{ marginBottom: '2rem' }}>
                            <Step title="Kundendaten" icon={<UserOutlined />} />
                            <Step title="Lieferadresse" icon={<TruckOutlined />} />
                            <Step title="Zahlung" icon={<CreditCardOutlined />} />
                            <Step title="Bestätigung" icon={<CheckOutlined />} />
                        </Steps>

                        <div>
                            {currentStep === 0 && (
                                <Form layout="vertical">
                                    <Form.Item label="Vorname" required>
                                        <Input
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            placeholder="Max"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Nachname" required>
                                        <Input
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            placeholder="Mustermann"
                                        />
                                    </Form.Item>
                                    <Form.Item label="E-Mail" required>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="max@beispiel.de"
                                        />
                                    </Form.Item>
                                </Form>
                            )}

                            {currentStep === 1 && (
                                <Form layout="vertical">
                                    <Form.Item label="Straße und Hausnummer" required>
                                        <Input
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            placeholder="Musterstraße 123"
                                        />
                                    </Form.Item>
                                    <Form.Item label="PLZ" required>
                                        <Input
                                            value={formData.postalCode}
                                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                            placeholder="12345"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Stadt" required>
                                        <Input
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            placeholder="Berlin"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Land" required>
                                        <Select
                                            value={formData.country}
                                            onChange={(value) => handleInputChange('country', value)}
                                        >
                                            <Option value="Deutschland">Deutschland</Option>
                                            <Option value="Österreich">Österreich</Option>
                                            <Option value="Schweiz">Schweiz</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            )}

                            {currentStep === 2 && (
                                <Form layout="vertical">
                                    <Form.Item label="Zahlungsart" required>
                                        <Select
                                            value={formData.paymentMethod}
                                            onChange={(value) => handleInputChange('paymentMethod', value)}
                                        >
                                            <Option value="card">Kreditkarte</Option>
                                            <Option value="paypal">PayPal</Option>
                                            <Option value="sepa">SEPA Lastschrift</Option>
                                        </Select>
                                    </Form.Item>
                                    {formData.paymentMethod === 'card' && (
                                        <>
                                            <Form.Item label="Karteninhaber" required>
                                                <Input
                                                    value={formData.cardName}
                                                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                                                    placeholder="Max Mustermann"
                                                />
                                            </Form.Item>
                                            <Form.Item label="Kartennummer" required>
                                                <Input
                                                    value={formData.cardNumber}
                                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                                    placeholder="1234 5678 9012 3456"
                                                />
                                            </Form.Item>
                                            <Form.Item label="Ablaufdatum" required>
                                                <Input
                                                    value={formData.expiryDate}
                                                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                                    placeholder="MM/YY"
                                                />
                                            </Form.Item>
                                            <Form.Item label="CVV" required>
                                                <Input
                                                    value={formData.cvv}
                                                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                                                    placeholder="123"
                                                />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form>
                            )}
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={prevStep} disabled={currentStep === 0}>
                                Zurück
                            </Button>
                            <Button type="primary" onClick={nextStep}>
                                Weiter
                            </Button>
                        </div>
                    </Card>
                </Col>

                {/* Right Section: 1/3 */}
                <Col span={8}>
                    <Card title="Bestellübersicht" bordered>
                        <List
                            dataSource={cartItems}
                            renderItem={(item) => (
                                <List.Item>
                                    <div>
                                        <strong>{item.name}</strong> - {item.quantity} x €{Number(item.cartable.base_price).toFixed(2)}
                                    </div>
                                    <div>€{Number(item.cartable.base_price).toFixed(2)}</div>
                                </List.Item>
                            )}
                        />
                        <Divider />
                        <p>Zwischensumme: €{subtotal.toFixed(2)}</p>
                        <p>Versand: €{shipping.toFixed(2)}</p>
                        <p>Gesamt: €{total.toFixed(2)}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
