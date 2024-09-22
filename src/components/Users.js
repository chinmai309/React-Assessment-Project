import React, { useContext } from 'react';
import { Layout, Row, Col, Typography, theme, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collapsedState, currentPageState, usersSelector } from './state'; // Import from state file
import { TeamOutlined } from '@ant-design/icons';
import CustomHeader from '../assets/CustomHeader';
import CustomSider from '../assets/CustomSider';
import CustomCardOne from '../assets/CustomCardOne';
import { ThemeContext } from './ThemeContext';

const { Content } = Layout;

const Users = () => {
  const {
    backgroundImage, cardBgColor
  } = useContext(ThemeContext); // Use background image and heading colors from context

  const users = useRecoilValue(usersSelector);
  const currentPage = useRecoilValue(currentPageState);
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);

  const usersPerPage = 12; // Display 12 users per page
  const usersPerRow = 3; // Number of users per row

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const paginatedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <CustomSider collapsed={collapsed} onCollapse={setCollapsed} defaultSelectedKey="5" />
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
  />      <CustomHeader title="Users" icon={<TeamOutlined />} titleColor="#001529"/>
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
          <Row gutter={[16, 16]}>
            {paginatedUsers.map(user => (
              <Col span={24 / usersPerRow} key={user.id}>
                <ConfigProvider
                theme={{
                    components: {
                      Card: {
                        actionsBg: '#c5dbf0',
                      }
                    }
                  }}>
                <CustomCardOne
                  title={<Typography.Title level={3}>{user.name}</Typography.Title>}
                  description={
                    <div>
                      <ConfigProvider
                      theme={{
                        token: {
                          fontSize: 16,
                        },
                      }}
                    >
                      <Typography.Text><strong>Email:</strong> {user.email}</Typography.Text><br />
                      <Typography.Text><strong>Phone:</strong> {user.phone}</Typography.Text>
                      </ConfigProvider>
                    </div>
                    
                  }
                  onClick={() => navigate(`/users/${user.id}`)}
                  style={{ cursor: 'pointer', backgroundColor: cardBgColor }}
                />
                </ConfigProvider>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      </Layout>
    </Layout>
  );
};

export default Users;
