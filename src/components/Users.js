import React from 'react';
import { Layout, Row, Col, Typography, theme, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collapsedState, currentPageState, usersSelector } from './state'; // Import from state file
import { TeamOutlined } from '@ant-design/icons';
import CustomHeader from '../assets/CustomHeader';
import CustomSider from '../assets/CustomSider';
import CustomCardOne from '../assets/CustomCardOne';

const { Content } = Layout;

const Users = () => {
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
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
      <CustomHeader title="Users" icon={<TeamOutlined />} titleColor="#001529"/>
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
                  style={{ cursor: 'pointer', backgroundColor: '#c5d5e3' }}
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
