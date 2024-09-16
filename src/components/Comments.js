import React, {useState} from 'react';
import { Table, Layout, ConfigProvider, Menu } from 'antd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate, Link } from 'react-router-dom';
import { commentsState } from './state'; // Import from state file
import { DashboardOutlined, RightCircleFilled, FormOutlined, CommentOutlined, UserOutlined, ProductOutlined, CameraOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const Comments = () => {
  const setComments = useSetRecoilState(commentsState);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetch comments using Fetch API
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => {
        setComments(data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [setComments]);

  const comments = useRecoilValue(commentsState);

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
    background: 'white',
    padding: '20px 28px',
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}
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
              icon: <UserOutlined style={{fontSize: 18}}/>,
              label: <Link to="/users">Users</Link>,
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
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
        <CommentOutlined style={{ color: 'whitesmoke', fontSize: 30 }} />
        <span style={{ color: 'whitesmoke', fontSize: 30, marginLeft: 10, fontFamily: 'cursive' }}>
          Comments
        </span>
      </Header>

      <Content
        style={{
          padding: '40px 48px',
          backgroundColor: '#aab4bd',
        }}
      >
        <div style={tableStyle}>
          <ConfigProvider
          theme={{
            components: {
              Table: {
                borderColor: 'black',
                headerBg: '#4c759c', 
                headerColor: 'azure',
                rowHoverBg: '#c5dbf0',
                headerSortHoverBg: '#4c759c',
                cellFontSize: 16,
              }
            },
            token: {
              fontSize: 15,
            }
          }}>
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
