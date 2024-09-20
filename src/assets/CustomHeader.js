import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const CustomHeader = ({ title, icon, titleColor, background }) => {
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: background || '#fff', // Default to white if no background is provided
      }}
    >
      <Title level={2} style={{ margin: 0, fontFamily: 'cursive', color: titleColor, fontSize: 32 }}>
        {React.cloneElement(icon, { style: { fontSize: 32 } })} {title}
      </Title>
    </Header>
  );
};

export default CustomHeader;
