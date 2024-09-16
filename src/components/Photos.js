import React, { useState, useEffect } from 'react';
import { Layout,Menu, Card, Pagination, Row, Col, Typography, theme } from 'antd';
import { DashboardOutlined, RightCircleFilled, FormOutlined, CommentOutlined, TeamOutlined, ProductOutlined, CameraOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const photosPerPage = 12; // Display 12 photos per page
  const photosPerRow = 4; // Number of photos per row

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchPhotosAndAlbums = async () => {
      try {
        // Fetch photos
        const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${photosPerPage}`);
        const photosData = await photosResponse.json();
        
        // Fetch albums
        const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albumsData = await albumsResponse.json();

        // Fetch total number of photos
        const totalResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
        const totalData = await totalResponse.json();
        
        // Create a map of albums for quick lookup
        const albumsMap = albumsData.reduce((acc, album) => {
          acc[album.id] = album;
          return acc;
        }, {});

        // Enhance photos with user data
        const photosWithAlbums = photosData.map(photo => ({
          ...photo,
          album: albumsMap[photo.albumId] || {}, // Attach album data based on albumId
        }));

        setPhotos(photosWithAlbums);
        setAlbums(albumsData); // Store albums for potential use
        setTotalPhotos(totalData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhotosAndAlbums();
  }, [currentPage]);

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
        <Menu theme="dark" mode="inline" 
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
          <Title level={1} style={{ margin: 0, fontFamily: 'cursive', color:'#0d4f4c' }}>
            <CameraOutlined style={{ fontSize: 35 }} /> Photos
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
          <Row gutter={[16, 16]}> {/* Add vertical and horizontal gutter spacing */}
            {photos.map(photo => (
              <Col span={24 / photosPerRow} key={photo.id}>
                <Card
                  cover={<img alt={photo.title} src={photo.thumbnailUrl} style={{height: 250}}/>}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderWidth: 1, 
                    borderColor: 'grey', 
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                >
                  <Meta
                    // title={photo.title}
                    description={
                      <div style={{
                        color: '#3d3b45',
                        // textAlign: 'justify',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: 'auto' // Adjust height to fit 4 lines approximately
                      }}>
                        <div style={{fontSize: 18, fontWeight: 'bold'}}>{photo.title} </div> <br />
                        Album Id: {photo.album.id || 'N/A'} <br />
                        Title: {photo.album.title || 'N/A'} <br />
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            align='end'
            current={currentPage}
            pageSize={photosPerPage}
            total={totalPhotos}
            onChange={onPageChange}
            style={{ marginTop: 20, textAlign: 'center' }}
          />
        </div>
      </Content>
      </Layout>
    </Layout>
  );
};

export default Photos;
