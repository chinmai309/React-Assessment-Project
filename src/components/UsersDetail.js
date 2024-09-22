import React, { useContext, useEffect } from 'react';
import { Layout, Row, Typography, Col, ConfigProvider } from 'antd';
import { useParams } from 'react-router-dom';
import {UserOutlined} from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { userState } from './state';
import CustomHeader from '../assets/CustomHeader';
import CustomCardOne from '../assets/CustomCardOne';
import { ThemeContext } from './ThemeContext';

const { Content } = Layout;

const UsersDetail = () => {
  const { backgroundImage, cardBgColor } = useContext(ThemeContext); // Use background image from ThemeContext

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
      <CustomHeader title="User Details" icon={<UserOutlined />} titleColor="whitesmoke" />
      <Content
        style={{
          padding: '4px 24px',
          backgroundColor: '#aab4bd',
          minHeight: '91vh',
          backgroundImage: `url(${backgroundImage})`, // Apply background image to Content as well
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          backdropFilter: 'blur(10px)',
          backgroundRepeat: 'no-repeat',
        }}
      >
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
      zIndex:-1,
    }}
  />
        <div
          style={{
            padding: 24,
            minHeight: 580,
          }}
        >
          <Row gutter={16}>
                <Col span={8}/>
                <Col span={8}>
                {user && ( 
                <CustomCardOne
                title={<Typography.Title level={3}>ID {user.id}: {user.name}</Typography.Title>}
                description={
                  <div style={{fontSize: 16}}>
                    <ConfigProvider
                      theme={{
                        token: {
                          fontSize: 16,
                        },
                      }}
                    >
            
                    <Typography.Text><strong>Email: </strong>{user.email}</Typography.Text><br />
                    <Typography.Text><strong>Phone: </strong>{user.phone}</Typography.Text><br />
                    <Typography.Text><strong>Username: </strong>{user.username}</Typography.Text><br />
                    {user.address ? (
                      <Typography.Text>
                        <strong>Address: </strong>{user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}
                      </Typography.Text>
                    ) : (
                      <span>No data available</span>
                    )}
                    <br/>
                    <Typography.Text><strong>Website: </strong>{user.website}</Typography.Text><br />
                    <Typography.Text><strong>Company Name: </strong>{user.company.name}</Typography.Text><br />
                    <Typography.Text><strong>Company Catchphrase: </strong>{user.company.catchPhrase}</Typography.Text><br />
                    <Typography.Text><strong>Company BS: </strong>{user.company.bs}</Typography.Text><br />
                    </ConfigProvider>
                  </div>
                }
                style={{ backgroundColor:cardBgColor }} // Add this line for the background color
              />
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
