import React, { useState, useEffect } from 'react';
import { Layout, Card, Descriptions, List, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { FormOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const PostsDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Retrieve posts from local storage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const localPost = storedPosts.find(post => post.id === id);

        let postData;
        if (localPost) {
          postData = localPost;
        } else {
          const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
          postData = await postResponse.json();
        }

        setPost(postData);

        // Fetch the user details
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch the photo
        const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
        const photosData = await photosResponse.json();
        const photo = photosData.find(photo => photo.albumId === parseInt(postData.userId));
        setPhoto(photo ? photo.url : 'https://via.placeholder.com/300');

        // Fetch comments for the post
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

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
        <FormOutlined style={{ color: 'whitesmoke', fontSize: 30 }} />
        <span style={{ color: 'whitesmoke', fontSize: 30, marginLeft: 10, fontFamily: 'cursive' }}>
          Post Details
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
          }}
        >
          {post && (
            <Card
              title={post.title}
              // cover={<img alt={post.title} src={photo} style={{ height: 250 }} />}
              style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px', }}
            >
              <p>{post.body}</p>
            </Card>
          )}
          <Title level={3} style={{color: '#001529', fontFamily: 'cursive'}}><UserOutlined style={{fontSize: 30}}/> User Info</Title>
          <Card style={{borderWidth: 1, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',}}>
            <Descriptions style={{ marginTop: 10, fontSize: 20 }}>
              {user && (
                <>
                  <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                </>
              )}
            </Descriptions>
          </Card>

          <Title level={3} style={{color: '#001529', fontFamily: 'cursive'}}><CommentOutlined style={{fontSize: 30}}/> Comments</Title>
          <List
            dataSource={comments}
            renderItem={comment => (
              <List.Item key={comment.id}>
                <Card
                  title={comment.name}
                  style={{ width: '100%' }}
                >
                  <p>{comment.body}</p>
                  <p><strong>Email:</strong> {comment.email}</p>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default PostsDetail;
