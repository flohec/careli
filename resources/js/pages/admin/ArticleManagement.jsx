import { Card, Row, Col, Pagination, Spin, Button, Input as AntInput, Select, Modal, Form, Input, InputNumber, Upload, message, Drawer } from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import ArticleCard from "../../components/ArticleCard.jsx";

export default function ArticleManagement() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [editDrawerVisible, setEditDrawerVisible] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [editForm] = Form.useForm();

    const openEditDrawer = (article) => {
        setEditingArticle(article);
        editForm.setFieldsValue(article); // vorausgefüllte Daten
        setEditDrawerVisible(true);
    };

    const handleUpdateArticle = async () => {
        try {
            const values = await editForm.validateFields();
            await axios.put(`/api/admin/articles/${editingArticle.id}`, values);
            message.success("Artikel erfolgreich aktualisiert!");
            setEditDrawerVisible(false);
            fetchArticles(pagination.current, pagination.pageSize, category, search);
        } catch (err) {
            console.error(err);
            message.error("Fehler beim Aktualisieren!");
        }
    };


    const categories = [
        { value: "", label: "Alle Kategorien" },
        { value: "deluxe", label: "Deluxe Serverschränke" },
        { value: "standard", label: "Standard Serverschränke" },
        { value: "business_customer", label: "Kühlung" },
    ];

    const fetchArticles = async (page = 1, pageSize = 10, category = 'all', search = "") => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/get-all-articles', {
                params: { per_page: pageSize, page, category, search },
                withCredentials: true,
            });
            setArticles(response.data.data || []);
            setPagination({
                current: response.data.pagination.current_page,
                pageSize: response.data.pagination.per_page,
                total: response.data.pagination.total,
            });
        } catch (error) {
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(pagination.current, pagination.pageSize, category, search);
    }, [category, search]);

    const handleAddArticle = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            if (file) formData.append("file", file);

            await axios.post("/api/admin/articles", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            message.success("Artikel erfolgreich hinzugefügt!");
            form.resetFields();
            setModalOpen(false);
            fetchArticles(pagination.current, pagination.pageSize, category, search);
        } catch (err) {
            console.error(err);
            message.error("Fehler beim Hinzufügen!");
        }
    };

    console.log('Articles:', articles);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '5%', paddingRight: '5%' }}>
            <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2B93DD, #000066)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'left',
                marginBottom: '20px',
            }}>
                Artikel Verwaltung
            </h1>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
                <AntInput
                    placeholder="Suche..."
                    style={{ width: "500px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    defaultValue={categories[0].value}
                    options={categories}
                    style={{ width: "200px" }}
                    onChange={(value) => setCategory(value)}
                />
                <Button type="primary" style={{ marginLeft: "auto" }} onClick={() => setModalOpen(true)}>
                    <PlusCircleOutlined />
                    Artikel hinzufügen
                </Button>
            </div>

            <Modal
                title={<span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Artikel hinzufügen</span>}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                onOk={handleAddArticle}
                okText="Speichern"
                cancelText="Abbrechen"
                centered
                width={700}
            >
                <Form layout="vertical" form={form}>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <Form.Item name="name" label="Artikelname" rules={[{ required: true }]}>
                                <Input placeholder="z. B. 19-Zoll Schrank 42HE" />
                            </Form.Item>
                            <Form.Item name="description" label="Beschreibung" rules={[{ required: true }]}>
                                <Input.TextArea rows={4} placeholder="Kurze Beschreibung zum Artikel" />
                            </Form.Item>
                            <Form.Item name="base_price" label="Grundpreis (€)" rules={[{ required: true }]}>
                                <InputNumber style={{ width: '100%' }} placeholder="z. B. 499.99" />
                            </Form.Item>
                            <Form.Item name="quantity" label="Menge" initialValue={0}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Abmessungen & Gewicht</div>
                            <Form.Item name="height" label="Höhe (mm)">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item name="width" label="Breite (mm)">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item name="depth" label="Tiefe (mm)">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item name="weight" label="Gewicht (g)">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item name="category_id" label="Kategorie ID" rules={[{ required: true }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Bild hochladen">
                                <Upload
                                    beforeUpload={(file) => {
                                        setFile(file);
                                        return false;
                                    }}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Bild auswählen</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
            <Drawer
                title="Artikel bearbeiten"
                open={editDrawerVisible}
                onClose={() => setEditDrawerVisible(false)}
                width={600}
                extra={
                    <Button type="primary" onClick={handleUpdateArticle}>
                        Speichern
                    </Button>
                }
            >
                <Form layout="vertical" form={editForm}>
                    <Form.Item name="name" label="Artikelname" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Beschreibung" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="base_price" label="Preis (€)" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="quantity" label="Menge">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="height" label="Höhe (mm)">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="width" label="Breite (mm)">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="depth" label="Tiefe (mm)">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="weight" label="Gewicht (g)">
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="category_id" label="Kategorie-ID" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Drawer>

            {loading ? (
                <Spin tip="Lade Artikel..." style={{ textAlign: 'center', marginTop: 50 }} />
            ) : (
                <>
                    <Row gutter={[20, 20]}>
                        {articles.map((article) => (
                            <Col key={article.id} xs={24} sm={12} md={8}>
                                <ArticleCard article={article} onEdit={openEditDrawer} />
                            </Col>
                        ))}
                    </Row>

                    <Pagination
                        style={{ marginTop: 30, textAlign: 'center' }}
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={(page) => fetchArticles(page, pagination.pageSize, category, search)}
                        showSizeChanger={false}
                    />
                </>
            )}
        </div>
    );
}
