// import React from 'react';
// import { Card } from 'antd';

// const DashboardCard = ({ title, content, cover, style, onClick }) => {
//     const cardStyle = {
//         borderWidth: 2,
//         borderColor: 'grey',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//         marginBottom: 10,
//         ...style,
//     };

//     return (
//         <Card
//             title={title}
//             bordered={false}
//             style={cardStyle}
//             cover={cover}
//             onClick={onClick}
//         >
//             <div style={{
//                 display: '-webkit-box',
//                 WebkitBoxOrient: 'vertical',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 WebkitLineClamp: 3,
//             }}>
//                 {content}
//             </div>
//         </Card>
//     );
// };

// export default DashboardCard;

import React from 'react';
import { Card } from 'antd';

const DashboardCard = ({ title, content, cover, style, onClick, index, gradients }) => {
    // Calculate the background gradient based on index and whether gradients prop is passed
    const backgroundStyle = gradients && gradients.length > 0
        ? { background: gradients[index % gradients.length] }
        : {}; // Default to an empty object if no gradients provided

    const cardStyle = {
        ...backgroundStyle, // Apply the gradient background to the card style
        borderWidth: 2,
        borderColor: 'grey',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: 10,
        color: '#fff',
        ...style, // Merge with any additional styles passed as props
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
                minHeight: '70px',
                color: 'black',
            }}>
                {content}
            </div>
        </Card>
    );
};

export default DashboardCard;
