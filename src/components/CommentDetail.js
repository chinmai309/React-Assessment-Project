import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Card, Col, Row, Layout } from 'antd';
import { commentsState } from './state'; // Import from state file
import { CommentOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const CommentDetail = () => {
  const { postId } = useParams();
  const [comments, setComments] = useRecoilState(commentsState);
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    // Fetch comments if not already available
    if (comments.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(data => {
          setComments(data);
          setFilteredComments(data.filter(comment => comment.postId === parseInt(postId, 10)));
        })
        .catch(error => console.error('Error fetching comments:', error));
    } else {
      // Filter comments based on the postId
      setFilteredComments(comments.filter(comment => comment.postId === parseInt(postId, 10)));
    }
  }, [postId, comments, setComments]);

  return (
    <Layout>
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
          <h1 style={{ textAlign: 'center', color: '#001529' }}>Comments for Post ID: {postId}</h1>
          <Row gutter={[16, 16]}>
            {filteredComments.length > 0 ? (
              filteredComments.map(comment => (
                <Col span={8} key={comment.id}>
                  <Card
                    title={`Comment: ${comment.id}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      borderWidth: 1,
                      borderColor: 'grey',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',
                      color: '#243442',
                    }}
                  >
                    <p><strong>Name: </strong> {comment.name}</p>
                    <p><strong>Comment: </strong> {comment.body}</p>
                  </Card>
                </Col>
              ))
            ) : (
              <p></p>
            )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default CommentDetail;
