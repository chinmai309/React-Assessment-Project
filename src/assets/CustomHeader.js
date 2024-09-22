import React, { useContext } from 'react';
import { Layout, Typography } from 'antd';
import { ThemeContext } from '../components/ThemeContext';

const { Header } = Layout;
const { Title } = Typography;

const CustomHeader = ({ title, icon }) => {
  const {
    headerBgColor,
    postsHeadingColor,
  } = useContext(ThemeContext);
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        width: '100%',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        background: headerBgColor, // Default to white if no background is provided
      }}
    >
      <Title level={2} style={{ margin: 0, fontFamily: 'cursive', color: postsHeadingColor, fontSize: 38 }}>
        {React.cloneElement(icon, { style: { fontSize: 36 } })} {title}
      </Title>
    </Header>
  );
};

export default CustomHeader;
