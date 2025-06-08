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
    }, []);

    useEffect(() => {
        fetchUsers(pagination.current, pagination.pageSize, role, search);
    }, [role, search]);

    const handleTableChange = (page, pageSize) => {
        fetchUsers(page, pageSize);
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
            <h1 style={{
                fontSize: "3rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, #2B93DD, #000066)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "left",
                marginBottom: "20px",
            }}>
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
                title="Benutzer bearbeiten"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={400}
            >
                <Form layout="vertical" form={form} onFinish={(values) => console.log("Saving user:", values)}>
                    <Form.Item name="first_name" label="Vorname">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="name" label="Nachname">
                        <AntInput />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <AntInput />
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
