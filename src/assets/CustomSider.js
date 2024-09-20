import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, FormOutlined, ProductOutlined, CommentOutlined, TeamOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const CustomSider = ({ collapsed, onCollapse, defaultSelectedKey }) => {
  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined style={{ fontSize: 18 }} />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '2',
      icon: <FormOutlined style={{ fontSize: 18 }} />,
      label: <Link to="/posts">Posts</Link>,
    },
    {
      key: '3',
      icon: <ProductOutlined style={{ fontSize: 18 }} />,
      label: <Link to="/albums">Albums</Link>,
    },
    {
      key: '4',
      icon: <CommentOutlined style={{ fontSize: 18 }} />,
      label: <Link to="/comments">Comments</Link>,
    },
    {
      key: '5',
      icon: <TeamOutlined style={{ fontSize: 18 }} />,
      label: <Link to="/users">Users</Link>,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{ position: 'fixed', left: 0, top: 0, height: '100%', zIndex: 3 }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelectedKey]} style={{ fontSize: 16 }}>
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default CustomSider;
