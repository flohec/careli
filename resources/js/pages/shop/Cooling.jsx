import {Col, Input, Pagination, Row, Spin, Button, Space} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import NavigationCard from "../../components/NavigationCard.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ArticleCard from "../../components/ArticleCard.jsx";

export default function Cooling() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 9,
        total: 0,
    });
    const [search, setSearch] = useState('');

    const fetchArticles = async (page = 1, pageSize = 9, category = 'cooling', search = "") => {
        setLoading(true);
        console.log('category', category);
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
        fetchArticles(1, pagination.pageSize, 'cooling', search); // reset to page 1 on filter change
    }, [search]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '20px'
        }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    marginBottom: '30px',
                }}
            >
                {/* Search Input */}
                <Input
                    placeholder="Suche nach Produkten..."
                    prefix={<SearchOutlined style={{color: '#1677FF'}}/>}
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        height: '50px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'box-shadow 0.3s ease-in-out',
                        flex: '1 1 auto',
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />
            </div>


            {/* Karten / Artikel */}
            {loading ? (
                <Spin tip="Lade Artikel..." style={{textAlign: 'center', marginTop: 50}}/>
            ) : (
                <>
                    <Row gutter={[20, 20]}>
                        {articles.map((article) => (
                            <Col key={article.id} xs={24} sm={12} md={8}>
                                <ArticleCard article={article} buyable={true} linkable={true}/>
                            </Col>
                        ))}
                    </Row>

                    <Pagination
                        style={{marginTop: 30, textAlign: 'center'}}
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={(page) =>
                            fetchArticles(page, pagination.pageSize, 'cooling', search)
                        }
                        showSizeChanger={false}
                    />
                </>
            )}
        </div>
    );
}
