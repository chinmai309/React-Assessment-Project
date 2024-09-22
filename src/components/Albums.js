import React, { useContext } from 'react';
import { ProductOutlined } from '@ant-design/icons';
import { Layout, Row, Col, theme } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collapsedState, albumsWithDetailsSelector, totalAlbumsSelector, currentPageAlbumsState } from './state';
import CustomHeader from '../assets/CustomHeader';
import CustomSider from '../assets/CustomSider';
import PaginationComponent from '../assets/PaginationComponent';
import CustomCardOne from '../assets/CustomCardOne';
import { ThemeContext } from './ThemeContext';

const { Content } = Layout;

const Albums = () => {
  const {
    backgroundImage,
  } = useContext(ThemeContext); // Use background image and heading colors from context

  const albums = useRecoilValue(albumsWithDetailsSelector);
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);
  const totalAlbums = useRecoilValue(totalAlbumsSelector);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAlbumsState);

  const albumsPerPage = 12; // Display 12 albums per page
  const albumsPerRow = 4; // Number of albums per row

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <CustomSider collapsed={collapsed} onCollapse={setCollapsed} defaultSelectedKey="3" />
      <Layout
  style={{
    marginLeft: collapsed ? 80 : 200,
    minHeight: '100vh',
    backgroundColor: '#414a4c',
    position: 'relative',
    overflow: 'hidden', // Ensure content doesn't overflow past blurred background
  }}
>
  {/* Pseudo-element for background image */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'blur(8px)', // Apply the blur here
    }}
  />      <CustomHeader title="Albums" icon={<ProductOutlined />} titleColor='#4f0d2b' />
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
            position: 'relative',
          }}
        >
          <Row gutter={[16, 16]}> {/* Add vertical and horizontal gutter spacing */}
            {albums.map(album => (
              <Col span={24 / albumsPerRow} key={album.id}>
                <CustomCardOne
                  title={album.title}
                  description={
                    <div>
                      {album.user ? (
                        <>
                          <span>User: {album.user.name}</span><br />
                          <span>Email: {album.user.email}</span><br />
                          <span>Phone: {album.user.phone}</span><br />
                        </>
                      ) : (
                        <span>No user data available</span>
                      )}
                    </div>
                  }
                  coverSrc={album.photo ? album.photo.url : 'https://via.placeholder.com/300'}
                  descriptionColor='#1d455c'
                />
              </Col>
            ))}
          </Row>
          <PaginationComponent
            pageSize={albumsPerPage}
            total={totalAlbums}
            current={currentPage}
            onChange={(page) => setCurrentPage(page)} // Update the current page state
          />
        </div>
      </Content>
      </Layout>
    </Layout>
  );
};

export default Albums;
