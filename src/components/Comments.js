import React, { useContext } from 'react';
import { Table, Layout, ConfigProvider } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { collapsedState, commentsSelector } from './state'; // Import from state file
import { CommentOutlined } from '@ant-design/icons';
import CustomHeader from '../assets/CustomHeader';
import CustomSider from '../assets/CustomSider';
import { ThemeContext } from './ThemeContext';

const { Content } = Layout;

const Comments = () => {
  const { backgroundImage } = useContext(ThemeContext); // Use background image from context

  const comments = useRecoilValue(commentsSelector);
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Post ID',
      dataIndex: 'postId',
      key: 'postId',
      sorter: (a, b) => a.postId - b.postId,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      sorter: (a, b) => a.body.localeCompare(b.body),
    },
  ];

  const tableStyle = {
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: 'grey',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    background: 'linear-gradient(135deg, white, #768491)',
    padding: '15px',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CustomSider collapsed={collapsed} onCollapse={setCollapsed} defaultSelectedKey="4" />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          backgroundImage: `url(${backgroundImage})`,  // Use dynamic backgroundImage from context
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          backdropFilter: 'blur(8px)',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <CustomHeader title="Comments" icon={<CommentOutlined />} titleColor="whitesmoke" />
        <Content
          style={{
            padding: '40px 48px',
            backgroundColor: '#aab4bd',
            backgroundImage: `url(${backgroundImage})`,  // Use dynamic backgroundImage here as well
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            backdropFilter: 'blur(8px)',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div style={tableStyle}>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    borderColor: 'black',
                    headerBg: '#768491',
                    headerColor: 'white',
                    rowHoverBg: '#c5dbf0',
                    headerSortHoverBg: '#768491',
                    cellFontSize: 16,
                    cellBg: '#c5d5e3', // Set the background color for table cells
                    cellColor: 'black', // Set the text color for table cells
                    paddingContentHorizontal: 15,
                  },
                },
                token: {
                  fontSize: 15,
                  padding: 15,
                },
              }}
            >
              <Table
                dataSource={comments}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                onRow={(record) => ({
                  onClick: () => {
                    navigate(`/comments/${record.postId}`);
                  },
                })}
              />
            </ConfigProvider>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Comments;
