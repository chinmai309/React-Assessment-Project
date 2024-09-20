// CustomCard.js
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CustomCard = ({ 
  title, 
  description, 
  coverSrc, 
  onClick, 
  style, 
  actions, 
  children,
  descriptionColor, 
}) => {
  return (
    <Card
      hoverable={!!onClick}
      onClick={onClick}
      cover={coverSrc ? <img alt={title} src={coverSrc} style={{ height: 250 }} /> : null}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderWidth: 1,
        borderColor: 'grey',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        ...style,
      }}
      actions={actions}
    >
      <Meta 
        title={<span style={{ color: 'black', fontSize: 18 }}>{title}</span>} 
        description={<span style={{ color: descriptionColor }}>{description}</span>}
      />
      {children}
    </Card>
  );
};

export default CustomCard;
