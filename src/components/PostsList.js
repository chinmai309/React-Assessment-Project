import React, { useEffect, useState } from 'react';
import { Layout, Card, List, Spin } from 'antd';

const { Header, Content } = Layout;

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch posts from local storage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(storedPosts);
        setLoading(false);
    }, []);

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#001529'
                }}
            >
                <span style={{ color: 'whitesmoke', fontSize: 30, marginLeft: 10, fontFamily: 'cursive' }}>
                    Posts List
                </span>
            </Header>

            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                    {loading ? (
                        <Spin />
                    ) : (
                        <List
                            dataSource={posts}
                            renderItem={post => (
                                <List.Item key={post.id}>
                                    <Card title={post.title}>
                                        <p>{post.body}</p>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </Content>
        </Layout>
    );
};

export default PostsList;
