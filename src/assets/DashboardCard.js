import React from 'react';
import { Card } from 'antd';

const DashboardCard = ({ title, content, cover, style, onClick }) => {
    const cardStyle = {
        borderWidth: 2,
        borderColor: 'grey',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: 10,
        ...style,
    };

    return (
        <Card
            title={title}
            bordered={false}
            style={cardStyle}
            cover={cover}
            onClick={onClick}
        >
            <div style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 3,
            }}>
                {content}
            </div>
        </Card>
    );
};

export default DashboardCard;
