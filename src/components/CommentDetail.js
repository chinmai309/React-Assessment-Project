import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Col, Row, Layout, ConfigProvider } from 'antd';
import { filteredCommentsSelector } from './state'; 
import { CommentOutlined } from '@ant-design/icons';
import CustomHeader from '../assets/CustomHeader';
import CustomCardOne from '../assets/CustomCardOne';
import { ThemeContext } from './ThemeContext';

const { Content } = Layout;

const CommentDetail = () => {
  const { postId } = useParams();
  const filteredComments = useRecoilValue(filteredCommentsSelector(postId));

  const { backgroundImage, postsHeadingColor, cardBgColor } = useContext(ThemeContext); // Use background image from ThemeContext

  return (
    <Layout>
      <CustomHeader title="Comments" icon={<CommentOutlined />} titleColor="whitesmoke"/>
      <Content
        style={{
          padding: '0 48px',
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
            minHeight: 380,
            borderRadius: 8,
          }}
        >
          <h1 style={{ textAlign: 'center', color: postsHeadingColor, fontFamily: 'cursive'}}>Comments for Post ID: {postId}</h1>
          <Row gutter={[16, 16]}>
            {filteredComments.length > 0 ? (
              filteredComments.map(comment => (
                <Col span={8} key={comment.id}>
                  <ConfigProvider
                theme={{
                    components: {
                      Card: {
                        actionsBg: '#c5dbf0',
                      }
                    }
                  }}>
                  <CustomCardOne
                    title={`Comment: ${comment.id}`}
                    description={
                      <>
                        <p style={{fontSize: 16}}>Name: {comment.name}</p>
                        <p style={{fontSize: 16}}>Comment: {comment.body}</p>
                      </>
                    }
                    descriptionColor='black'
                    style={{backgroundColor: cardBgColor}}
                  />
                  </ConfigProvider>
                </Col>
              ))
            ) : (
              <p>Problem in fetching data!</p>
            )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default CommentDetail;
