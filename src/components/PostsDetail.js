import React, { useEffect, useContext } from 'react';
import { Layout, Card, Descriptions, List, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { FormOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons';
import { commentsState, photoState, postState, userState } from './state';
import { useRecoilState } from 'recoil';
import CustomHeader from '../assets/CustomHeader';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const { Content } = Layout;
const { Title } = Typography;

const PostsDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useRecoilState(postState);
  const [comments, setComments] = useRecoilState(commentsState);
  const [user, setUser] = useRecoilState(userState);
  const [photo, setPhoto] = useRecoilState(photoState);

  const { backgroundImage, headerFontColor } = useContext(ThemeContext); // Use background image from ThemeContext

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Retrieve posts from local storage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const localPost = storedPosts.find(post => post.id === Number(id));

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
      <CustomHeader title="Post Details" icon={<FormOutlined />} titleColor="whitesmoke" />
      <Content
        style={{
          padding: '0 48px',
          backgroundColor: '#aab4bd',
          backgroundImage: `url(${backgroundImage})`, // Apply background image to Content as well
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          backdropFilter: 'blur(10px)',
          backgroundRepeat: 'no-repeat',
          minHeight: '91vh'
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
            zIndex: 2,
          }}
        >
          {post && (
            <Card
              title={<span style={{ fontSize: 18 }}>{post.title}</span>}
              style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}
            >
              <p style={{ fontSize: 16, marginTop: -4 }}>{post.body}</p>
            </Card>
          )}
          <Title level={3} style={{ color: headerFontColor, fontFamily: 'cursive' }}>
            <UserOutlined style={{ fontSize: 30 }} /> User Info
          </Title>
          <Card style={{ borderWidth: 1, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <Descriptions style={{ marginTop: 0 }}>
              {user && (
                <>
                  <Descriptions.Item label={<span style={{ color: '#000000e0', fontWeight: 'bold', fontSize: 16 }}>Name</span>}>
                    <span style={{ fontSize: 16 }}>{user.name}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label={<span style={{ color: '#000000e0', fontWeight: 'bold', fontSize: 16 }}>Email</span>}>
                    <span style={{ fontSize: 16 }}>{user.email}</span>
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          </Card>
          <Title level={3} style={{ color: headerFontColor, fontFamily: 'cursive' }}>
            <CommentOutlined style={{ fontSize: 30 }} /> Comments
          </Title>
          <List
            dataSource={comments}
            renderItem={comment => (
              <List.Item key={comment.id}>
                <Card
                  title={<span style={{ fontSize: 18 }}>{comment.name}</span>}
                  style={{ width: '100%' }}
                >
                  <p style={{ fontSize: 16, marginTop: -4 }}>{comment.body}</p>
                  <p style={{ fontSize: 16 }}><strong>Email:</strong> {comment.email}</p>
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
