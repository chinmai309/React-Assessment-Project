import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Pagination, Row, Col, Button, theme, ConfigProvider, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { DashboardOutlined, RightCircleFilled, CommentOutlined, TeamOutlined, ProductOutlined, CameraOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const newPost = location.state?.newPost;

  const postsPerPage = 12; // Display 12 posts per page
  const postsPerRow = 4; // Number of posts per row

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchPostsAndPhotos = async () => {
      try {
        // Retrieve posts from local storage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

        // Fetch posts for the current page
        const apiPostsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`);
        const apiPosts = await apiPostsResponse.json();

        // Combine local posts and API posts, ensuring no duplicates
        const combinedPosts = [
          ...storedPosts.filter(storedPost => !apiPosts.some(apiPost => apiPost.id === storedPost.id)),
          ...apiPosts
        ];

        setPosts(combinedPosts);

        // Fetch photos and albums
        const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
        const photosData = await photosResponse.json();
        setPhotos(photosData);

        const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData);

        // Fetch total number of posts from the API
        const totalResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const totalData = await totalResponse.json();
        setTotalPosts(totalData.length);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndPhotos();
  }, [currentPage, newPost]);

  const getPhotoForPost = (userId) => {
    // Find albums of the user
    const userAlbums = albums.filter(album => album.userId === userId);
    if (userAlbums.length === 0) return 'https://via.placeholder.com/300'; // Default image if no album found

    // Pick a random album
    const randomAlbum = userAlbums[Math.floor(Math.random() * userAlbums.length)];
    
    // Find photos in the selected album
    const albumPhotos = photos.filter(photo => photo.albumId === randomAlbum.id);
    if (albumPhotos.length === 0) return 'https://via.placeholder.com/300'; // Default image if no photo found

    // Pick a random photo from the selected album
    const randomPhoto = albumPhotos[Math.floor(Math.random() * albumPhotos.length)];
    return randomPhoto.url;
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ position: 'fixed', left: 0, top: 0, height: '100%', zIndex: 1 }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}
          style={{fontSize: 16}}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined style={{fontSize: 18}}/>,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <FormOutlined style={{fontSize: 18}}/>,
              label: <Link to="/posts">Posts</Link>,
            },
            {
              key: '3',
              icon: <ProductOutlined style={{fontSize: 18}}/>,
              label: <Link to="/albums">Albums</Link>,
            },
            {
              key: '4',
              icon: <CommentOutlined style={{fontSize: 18}}/>,
              label: <Link to="/comments">Comments</Link>,
            },
            {
              key: '5',
              icon: <TeamOutlined style={{fontSize: 18}}/>,
              label: <Link to="/users">Users</Link>,
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
      <Header
          style={{
            padding: 0,
            background: '#fff',
            minHeight: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 20px',
          }}
        >
          <Title level={1} style={{ margin: 0, fontFamily: 'cursive', color:'#0d374f' }}>
            <FormOutlined style={{ fontSize: 35 }} /> Posts
          </Title>
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
            borderRadius: borderRadiusLG,
          }}
        >
          <Row>
            <Col span={24} style={{ marginInlineStart: 860, marginBlockEnd: 10 }}>
              <Button type="primary" style={{ backgroundColor: '#0d374f' }} onClick={() => navigate(`/posts/create`)}>
                CREATE POST <PlusCircleOutlined style={{ fontSize: 15 }} />
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map(post => (
              <Col span={24 / postsPerRow} key={`post-${post.id}-${post.title}`}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextDescription: '#1d455c'
                    }
                  }}
                >
                  <Card
                    onClick={() => navigate(`/posts/${post.id}`)}
                    hoverable
                    cover={<img alt={post.title} src={getPhotoForPost(post.userId)} style={{ height: 250 }} />}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      borderWidth: 1, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',
                    }}
                  >
                    <Meta
                      style={{fontSize: 20, marginBottom: 10}}
                      title={post.title}
                    />
                    <Meta
                      style={{ 
                        textAlign: 'justify',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 4,
                        lineClamp: 4,
                        height: '4.8em' // Adjust according to font-size and line-height
                      }}
                      description={post.body}
                    />
                  </Card>
                </ConfigProvider>
              </Col>
            ))}
          </Row>
          <Row>
            <Col span={24} style={{ marginTop: 20 }}>
              <Pagination
                current={currentPage}
                pageSize={postsPerPage}
                total={totalPosts}
                onChange={onPageChange}
                style={{ display: 'flex', justifyContent: 'center' }}
              />
            </Col>
          </Row>
        </div>
      </Content>
      </Layout>
    </Layout>
  );
};

export default Posts;
