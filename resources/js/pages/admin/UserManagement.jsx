import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Pagination, Select, Drawer, Form, Input as AntInput, Button } from "antd";

export default function UserManagement() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("all");
    const [search, setSearch] = useState("");

    const roles = [
        { value: "", label: "Alle Rollen" },
        { value: "admin", label: "admin" },
        { value: "customer", label: "customer" },
        { value: "business_customer", label: "business_customer" },
    ];

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (page = 1, pageSize = 10, role = 'all', search = "") => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/get-all-users', {
                params: { per_page: pageSize, page, role, search },
                withCredentials: true,
            });
            setUsers(response.data.data || []);
            setPagination({
                current: response.data.pagination.current_page,
                pageSize: response.data.pagination.per_page,
                total: response.data.pagination.total,
            });
        } catch (error) {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(pagination.current, pagination.pageSize, role, search);
    }, [role, search]);

    const handleTableChange = (page, pageSize) => {
        fetchUsers(page, pageSize);
    };

    const handleSave = async (values) => {
        if (!selectedCompany) return;

        try {
            await axios.put(`/api/admin/update-user/${selectedUser.id}`, values, {
                withCredentials: true,
            });

            setDrawerVisible(false);
            fetchUsers(pagination.current, pagination.pageSize, role, search);
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
        }
    };

    const columns = [
        {
            title: "Vorame",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Company",
            render: (record) => record.company?.name || "-",
            key: "company",
        },
        {
            title: "Rolle",
            render: (record) => record.role?.name || "-",
            key: "role",
        },
    ];

    return (
        <div style={{ paddingLeft: '5%',
            paddingRight: '5%', }}>
            <h1 className="page-title">
                User Verwaltung
            </h1>
            <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
                <AntInput
                    placeholder="Suche..."
                    style={{width: "500px"}}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    defaultValue={roles[0].value}
                    options={roles}
                    style={{width: "200px"}}
                    onChange={(value) => setRole(value)}
                />
            </div>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={false}
                loading={loading}
                onRow={(record) => ({
                    onClick: () => {
                        setSelectedUser(record);
                        form.setFieldsValue(record);
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
                title="User bearbeiten"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={450}
            >
                <Form layout="vertical" form={form} onFinish={handleSave}>
                    <h3 style={{ marginTop: 0, marginBottom: '10px', fontWeight: 'bold', color: '#2B93DD' }}>
                        Allgemeine Informationen
                    </h3>
                    <Form.Item name="first_name" label="Vorname">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="name" label="Nachname">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <AntInput />
                    </Form.Item>

                    <hr style={{ margin: '20px 0', borderTop: '1px solid #e8e8e8' }} />

                    <h3 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#2B93DD' }}>
                        Adressinformationen
                    </h3>
                    <Form.Item name="country" label="Land">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="city" label="Stadt">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="postal_code" label="Postleitzahl">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="street" label="Straße">
                        <AntInput />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 30 }}>
                        <Button type="primary" htmlType="submit" block>
                            Speichern
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>


        </div>
    );
}
