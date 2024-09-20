import React, { useEffect, useState, startTransition } from 'react';
import { DashboardOutlined, RightCircleFilled, FormOutlined, UserOutlined, ProductOutlined, CameraOutlined } from '@ant-design/icons';
import { Layout, Col, Row, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postsState, collapsedState, filteredAlbumsSelector, filteredPhotosSelector, loggedInUserState } from './state';
import { createStyles } from 'antd-style';
import CustomSider from '../assets/CustomSider';
import DashboardCard from '../assets/DashboardCard';

const { Header, Content } = Layout;
const { Title } = Typography;

const useStyle = createStyles(({ prefixCls, css }) => ({
  gradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;
      > span {
        position: relative;
      }
      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }
      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const Dashboard = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const albums = useRecoilValue(filteredAlbumsSelector);
  const photos = useRecoilValue(filteredPhotosSelector);
  const [user, setUser] = useRecoilState(loggedInUserState); 
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { styles } = useStyle();
  

  useEffect(() => {
    const fetchAndCombinePosts = async () => {
      try {
        // Fetch posts from local storage
        const storedPosts = localStorage.getItem('posts');
        let localPosts = [];
        if (storedPosts) {
          try {
            localPosts = JSON.parse(storedPosts);
          } catch (error) {
            console.error('Error parsing posts from local storage:', error);
          }
        }

        // Fetch posts from API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
        const apiPosts = await response.json();

        // Combine posts (API posts first, to prioritize API data over local storage)
        const combinedPosts = [...localPosts, ...apiPosts];

        // Remove duplicates by filtering based on unique `id`
        const uniquePosts = combinedPosts.filter((post, index, self) =>
          index === self.findIndex(p => p.id === post.id)
        );

        // Sort the posts: place post with ID 1 last, and keep the rest in the same order
        // const sortedPosts = uniquePosts.sort((a, b) => {
        //   if (a.id === 1) return 1;
        //   if (b.id === 1) return 1;
        //   return 0;
        // });

        // Sort the posts in descending order by `id`
        const sortedPosts = uniquePosts.sort((a, b) => b.id - a.id);

        // Display only the first 4 posts
        setPosts(sortedPosts.slice(0, 4));

      } catch (error) {
        console.error('Error fetching or combining posts:', error);
      }
      finally {
        setLoading(false); // Set loading to false after data is processed
      }
    };

    fetchAndCombinePosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loader or placeholder while loading
  }
  

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null); // Clear the user state
    navigate('/login', { replace: true });
};


  const handleClickPosts = () => {
    startTransition(() => {
      navigate("/posts");
    });
  };

  const handleClickAlbums = () => {
    startTransition(() => {
      navigate("/albums");
    });
  };

  const handleClickPhotos = () => {
    startTransition(() => {
      navigate("/photos");
    });
  };


  
  return (
    <Layout style={{ minHeight: '100vh'}}>
      <CustomSider collapsed={collapsed} onCollapse={setCollapsed} defaultSelectedKey="1" />
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            background: '#fff',
            minHeight: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 20px',
          }}
        >
          <Title level={1} style={{ margin: 0, fontFamily: 'cursive' }}>
            <DashboardOutlined style={{ fontSize: 35 }} /> Dashboard
          </Title>
          {user && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -20, marginRight: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: -10 }}>
                <UserOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
                <span style={{ fontSize: '16px' }}>{user.name}</span>
              </div>
              <Button
                type="primary"
                onClick={handleLogout}
                className={styles.gradientButton}  // Apply the gradient style here
              >
                Logout
              </Button>
            </div>
          )}
        </Header>
        
        <Content style={{ margin: '14px 16px', minHeight: 360, borderRadius: '8px', fontFamily: 'cursive' }}>
          <h1 style={{ color: '#0d374f' }}><FormOutlined /> Posts</h1>
          <div style={{ minHeight: 260, borderRadius: '8px' }}>
            <Row gutter={16}>
              {posts.map((post) => (
                <Col span={6} key={post.id}>
                  <DashboardCard 
                      title={post.title}
                      content={post.body}
                      onClick={() => navigate(`/posts/${post.id}`)}
                      style={{ backgroundColor: '#c5dbf0' }}
                  />
                </Col>
              ))}
              <Col span={6} />
              <Col span={6} />
              <Col span={6} />
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px', color: '#0d4463' }}>
                  <span style={{ marginRight: '8px' }}>View All <FormOutlined /></span>
                  <Button type="primary" shape="circle" onClick={handleClickPosts} icon={<RightCircleFilled style={{ fontSize: 30 }} />} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}><h1 style={{ color: '#4f0d2b', fontFamily: 'cursive' }}><ProductOutlined /> Albums</h1></Col>
              <Col span={12}><h1 style={{ color: '#0d4f4c', fontFamily: 'cursive' }}><CameraOutlined /> Photos</h1></Col>
            </Row>
            {/* Albums */}
            <Row gutter={16} style={{ marginTop: 4 }}>
              <Col span={12} style={{ paddingRight: '8px', paddingLeft: '10px' }}>
                <Row gutter={16}>
                  {albums.map((album, index) => (
                    <Col span={12} key={album.id + index} style={{ paddingLeft: '5px' }}>
                      <DashboardCard 
                          title={`Album Id: ${album.id}`}
                          content={album.title}
                          style={{ height: 215, backgroundColor: '#edd3df', color: 'black' }}
                      />
                    </Col>
                  ))}
                  <Col span={12} />
                  <Col span={12}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px', color: '#0d4463' }}>
                      <span style={{ marginRight: '8px' }}>View All <ProductOutlined /></span>
                      <Button type="primary" shape="circle" onClick={handleClickAlbums} icon={<RightCircleFilled style={{ fontSize: 30 }} />} />
                    </div>
                  </Col>
                </Row>
              </Col>
              {/* Photos */}
              <Col span={12} style={{ paddingLeft: '10px' }}>
                <Row gutter={12}>
                  {photos.map((photo, index) => (
                    <Col span={12} key={photo.id + index}>
                      <DashboardCard 
                          cover={<img alt={photo.title} src={photo.url} style={{ height: 120 }} />}
                          content={photo.title}
                          style={{ height: 215 }}
                      />
                    </Col>
                  ))}
                  <Col span={12} />
                  <Col span={12}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px', color: '#0d4463' }}>
                      <span style={{ marginRight: '8px' }}>View All <CameraOutlined /></span>
                      <Button type="primary" shape="circle" onClick={handleClickPhotos} icon={<RightCircleFilled style={{ fontSize: 30 }} />} />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>

  );
};

export default Dashboard;
