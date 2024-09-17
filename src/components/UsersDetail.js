import React, { useState, useEffect } from 'react';
import { Layout, Card, Descriptions, Row, Typography, Col } from 'antd';
import { useParams } from 'react-router-dom';
import {UserOutlined} from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { userState } from './state';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const UsersDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const userDetails = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    userDetails();
  }, [id]);

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
        <UserOutlined style={{ color: 'whitesmoke', fontSize: 30 }} />
        <span style={{ color: 'whitesmoke', fontSize: 30, marginLeft: 10, fontFamily: 'cursive' }}>
          User Details
        </span>
      </Header>

      <Content
        style={{
          padding: '4px 24px',
          backgroundColor: '#aab4bd'
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 580,
          }}
        >
          {/* <Title level={3}>User Info</Title> */}
          <Row gutter={16}>
                <Col span={8}/>
                <Col span={8}>
                {user && ( 
                <Card
                  hoverable='true'
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderWidth: 1, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: 16,
                    backgroundColor: '#dcebfa'
                    
                  }}
                >
                  <Meta
                    title={<Typography.Title level={3}>ID {user.id}: {user.name}</Typography.Title>}
                    description={
                      <div>
                        <Typography.Text><strong>Email: </strong>{user.email}</Typography.Text><br/>
                        <Typography.Text><strong>Phone: </strong>{user.phone}</Typography.Text><br/>
                        <Typography.Text><strong>Username: </strong>{user.username}</Typography.Text><br/>
                        <Typography.Text><strong>Email: </strong>{user.email}</Typography.Text><br/>
                        {user.address ? (
                          <>
                        <Typography.Text><strong>Address: </strong>{user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}</Typography.Text><br/>
                        </>
                        ):(
                          <span>No data available</span>
                        )}
                        <Typography.Text><strong>Phone: </strong>{user.phone}</Typography.Text><br/>
                        <Typography.Text><strong>Website: </strong>{user.website}</Typography.Text><br/>
                        <Typography.Text><strong>Company Name: </strong>{user.company.name}</Typography.Text><br/>
                        <Typography.Text><strong>Company Catch phrase: </strong>{user.company.catchPhrase}</Typography.Text><br/>
                        <Typography.Text><strong>Company BS: </strong>{user.company.bs}</Typography.Text><br/>
                      </div>
                    }
                  />
                </Card>
                )}
                </Col>
                <Col span={8}/>
          </Row>
          
                    

        </div>
      </Content>
    </Layout>
  );
};

export default UsersDetail;
