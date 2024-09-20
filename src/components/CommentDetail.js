import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Col, Row, Layout } from 'antd';
import { filteredCommentsSelector } from './state'; 
import { CommentOutlined } from '@ant-design/icons';
import CustomHeader from '../assets/CustomHeader';
import CustomCardOne from '../assets/CustomCardOne';

const { Content } = Layout;

const CommentDetail = () => {
  const { postId } = useParams();
  const filteredComments = useRecoilValue(filteredCommentsSelector(postId));

  return (
    <Layout>
      <CustomHeader title="Comments" icon={<CommentOutlined />} titleColor="whitesmoke" background="#001529"/>
      <Content
        style={{
          padding: '0 48px',
          backgroundColor: '#aab4bd'
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            borderRadius: 8,
          }}
        >
          <h1 style={{ textAlign: 'center', color: '#001529'}}>Comments for Post ID: {postId}</h1>
          <Row gutter={[16, 16]}>
            {filteredComments.length > 0 ? (
              filteredComments.map(comment => (
                <Col span={8} key={comment.id}>
                  <CustomCardOne
                    title={`Comment: ${comment.id}`}
                    description={
                      <>
                        <p style={{fontSize: 16}}><strong>Name: </strong>{comment.name}</p>
                        <p style={{fontSize: 16}}><strong>Comment: </strong>{comment.body}</p>
                      </>
                    }
                    descriptionColor='black'
                  />
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
