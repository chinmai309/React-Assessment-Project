import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Pagination, Row, Col, Typography, theme, ConfigProvider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collapsedState, currentPageState, totalPostsState, totalUsersSelector, usersSelector, usersState } from './state'; // Import from state file
import { DashboardOutlined, TeamOutlined, FormOutlined, CommentOutlined, ProductOutlined, CameraOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const Users = () => {
  const users = useRecoilValue(usersSelector);
  const totalUsers = useRecoilValue(totalUsersSelector);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);

  const usersPerPage = 12; // Display 12 users per page
  const usersPerRow = 4; // Number of users per row

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();


  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ position: 'fixed', left: 0, top: 0, height: '100%', zIndex: 1 }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}
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
          <Title level={1} style={{ margin: 0, fontFamily: 'cursive', color:'#001529' }}>
            <TeamOutlined style={{ fontSize: 35 }} /> Users
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
            // background: colorBgContainer,
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
                <Card
                  hoverable='true'
                  onClick={() => navigate(`/users/${user.id}`)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderWidth: 1, borderColor: 'grey',
                    borderRadius: '8px',
                    padding: 16,
                    backgroundColor: '#c5d5e3'
                    
                  }}
                >
                  <Meta
                    title={<Typography.Title level={4}>{user.name}</Typography.Title>}
                    description={
                      <div>
                        <Typography.Text><strong>Email:</strong> {user.email}</Typography.Text><br/>
                        <Typography.Text><strong>Phone:</strong> {user.phone}</Typography.Text>
                      </div>
                    }
                  />
                </Card>
                </ConfigProvider>
              </Col>
            ))}
          </Row>
          <Pagination
            align='end'
            current={currentPage}
            pageSize={usersPerPage}
            total={totalUsers}
            onChange={onPageChange}
            style={{ marginTop: 20, textAlign: 'center' }}
          />
        </div>
      </Content>
      </Layout>
    </Layout>
  );
};

export default Users;
