import axios from "axios";
import {useEffect, useState} from "react";
import {Pagination, Drawer, Form, Input as AntInput, Button , Table} from "antd";

export default function CompanyManagement() {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [companies, setCompanies] = useState([]);
    const fetchCompanies = async (page = 1, pageSize = 10, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/get-all-companies', {
                params: { per_page: pageSize, page, search },
                withCredentials: true,
            });
            setCompanies(response.data.data || []);
            setPagination({
                current: response.data.pagination.current_page,
                pageSize: response.data.pagination.per_page,
                total: response.data.pagination.total,
            });
        } catch (error) {
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies(pagination.current, pagination.pageSize, search);
    }, []);

    useEffect(() => {
        fetchCompanies(pagination.current, pagination.pageSize, search);
    }, [search]);

    const handleTableChange = (page, pageSize) => {
        fetchCompanies(page, pageSize);
    };

    const columns = [
        {
            title: "Firma",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
        },
    ];

    return (
        <div style={{ paddingLeft: '5%',
            paddingRight: '5%', }}>
            <h1 style={{
                fontSize: "3rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, #2B93DD, #000066)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "left",
                marginBottom: "20px",
            }}>
                Company Verwaltung
            </h1>
            <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
                <AntInput
                    placeholder="Suche..."
                    style={{width: "500px"}}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Table
                columns={columns}
                dataSource={companies}
                rowKey="id"
                pagination={false}
                loading={loading}
                onRow={(record) => ({
                    onClick: () => {
                        setSelectedCompany(record);
                        form.setFieldsValue(record); // füllt das Formular
                        setDrawerVisible(true);
                    },
                })}
                rowClassName={() => 'clickable-row'}
            />
            <Pagination
                style={{marginTop: "20px", textAlign: "center"}}
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handleTableChange}
            />
            <Drawer
                title="Firma bearbeiten"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={400}
            >
                <Form layout="vertical" form={form} onFinish={(values) => console.log("Saving", values)}>
                    <Form.Item name="name" label="Firmenname">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="discount" label="Rabatt">
                        <AntInput type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Speichern
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}
