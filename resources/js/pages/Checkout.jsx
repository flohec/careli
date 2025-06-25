import React, { useState, useEffect } from 'react';
import {
    Steps,
    Input,
    Button,
    Select,
    Form,
    Divider,
    Card,
    List,
    Row,
    Col,
    Typography,
    message,
} from 'antd';
import {
    CheckOutlined,
    CreditCardOutlined,
    TruckOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { useUser } from '../context/UserContext.jsx';

const { Step } = Steps;
const { Option } = Select;
const { Title, Text } = Typography;

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
                const total = data.items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
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
        message.success('Bestellung erfolgreich aufgegeben! 🎉');
        // ... send data to backend here
    };

    const StepContent = () => {
        switch (currentStep) {
            case 0:
                return (
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
                );
            case 1:
                return (
                    <Form layout="vertical">
                        <Form.Item label="Straße & Hausnummer" required>
                            <Input
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Postleitzahl" required>
                            <Input
                                value={formData.postalCode}
                                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Stadt" required>
                            <Input
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
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
                );
            case 2:
                return (
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
                );
            case 3:
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Title level={3}>Alles bereit!</Title>
                        <Text>Bitte überprüfe deine Angaben und schließe die Bestellung ab.</Text>
                        <Divider />
                        <Button type="primary" size="large" onClick={handleSubmit}>
                            Bestellung abschließen
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="checkout-container" style={{ padding: '2rem' }}>
            <Row gutter={24}>
                <Col span={16}>
                    <Card style={{ borderRadius: 12, padding: '1.5rem' }}>
                        <Steps
                            current={currentStep}
                            size="small"
                            responsive
                            style={{ marginBottom: '2rem' }}
                        >
                            <Step title="Kundendaten" icon={<UserOutlined />} />
                            <Step title="Lieferadresse" icon={<TruckOutlined />} />
                            <Step title="Zahlung" icon={<CreditCardOutlined />} />
                            <Step title="Bestätigung" icon={<CheckOutlined />} />
                        </Steps>

                        <div>{StepContent()}</div>

                        <div
                            style={{
                                marginTop: '2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button onClick={prevStep} disabled={currentStep === 0}>
                                Zurück
                            </Button>
                            {currentStep < 3 && (
                                <Button type="primary" onClick={nextStep}>
                                    Weiter
                                </Button>
                            )}
                        </div>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card
                        title={<span><ShoppingCartOutlined /> Bestellübersicht</span>}
                        bordered
                        style={{ borderRadius: 12 }}
                    >
                        <List
                            dataSource={cartItems}
                            renderItem={(item) => (
                                <List.Item>
                                    <div style={{ width: '70%' }}>
                                        <strong>{item.name}</strong>
                                        <br />
                                        <Text type="secondary">
                                            {item.quantity} × €{Number(item.cartable.base_price).toFixed(2)}
                                        </Text>
                                    </div>
                                    <Text>€{(item.quantity * item.cartable.base_price).toFixed(2)}</Text>
                                </List.Item>
                            )}
                        />
                        <Divider />
                        <div style={{ fontSize: 16 }}>
                            <p>Zwischensumme: <strong>€{subtotal.toFixed(2)}</strong></p>
                            <p>Versand: <strong>€{shipping.toFixed(2)}</strong></p>
                            <p>Steuer (19%): <strong>€{tax.toFixed(2)}</strong></p>
                            <Divider />
                            <p style={{ fontSize: 18 }}>
                                Gesamt: <strong>€{total.toFixed(2)}</strong>
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
