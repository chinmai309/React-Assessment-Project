import React, { useEffect } from 'react';
import { DashboardOutlined, RightCircleFilled, FormOutlined, CommentOutlined, TeamOutlined, ProductOutlined, CameraOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Card, Pagination, Row, Col, Typography, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { albumsState, usersState, currentPageState, totalAlbumsState, collapsedState, albumsWithDetailsSelector } from './state';

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const Albums = () => {
  // Use Recoil atoms instead of useState
  const albums = useRecoilValue(albumsWithDetailsSelector);
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const totalAlbums = useRecoilValue(totalAlbumsState);

  const albumsPerPage = 12; // Display 12 albums per page
  const albumsPerRow = 4; // Number of albums per row

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}
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
          <Title level={1} style={{ margin: 0, fontFamily: 'cursive', color:'#4f0d2b' }}>
            <ProductOutlined style={{ fontSize: 35 }} /> Albums
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
            {albums.map(album => (
              <Col span={24 / albumsPerRow} key={album.id}>
                <Card
                  cover={<img alt={album.title} src={album.photo ? album.photo.thumbnailUrl : 'https://via.placeholder.com/300'} style={{height: 250}}/>}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderWidth: 1, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px', // Optional: Add rounded corners
                  }}
                >
                  <Meta
                    description={
                      <div style={{
                        color: '#3d3b45',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        <div style={{fontSize: 18, fontWeight: 'bold'}}>{album.title} </div> <br />
                        {album.user ? (
                          <>
                            User: {album.user.name} <br />
                            Email: {album.user.email} <br />
                            Phone: {album.user.phone} <br />
                          </>
                        ) : (
                          <span>No user data available</span>
                        )}
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
            pageSize={albumsPerPage}
            total={totalAlbums}
            onChange={onPageChange}
            style={{ marginTop: 20, textAlign: 'center' }}
          />
        </div>
      </Content>
      </Layout>
    </Layout>
  );
};

export default Albums;
