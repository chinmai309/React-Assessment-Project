import React, { useContext, useEffect } from 'react';
import { Layout, Row, Col, Button, theme, ConfigProvider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { collapsedState, currentPagePostsState, currentPageState, fetchAlbumsSelector, fetchPhotosSelector, postsState, totalPostsState } from './state';
import { useRecoilState, useRecoilValue } from 'recoil';
import CustomHeader from '../assets/CustomHeader';
import CustomSider from '../assets/CustomSider';
import CustomCardOne from '../assets/CustomCardOne';
import PaginationComponent from '../assets/PaginationComponent';
import { ThemeContext } from './ThemeContext';

const { Content } = Layout;

const Posts = () => {
  const {
    backgroundImage,
    postsButtonBg,
    postsButtonText,
  } = useContext(ThemeContext); // Use background image and heading colors from context

  const [posts, setPosts] = useRecoilState(postsState);
  const [totalPosts, setTotalPosts] = useRecoilState(totalPostsState);
  const albums = useRecoilValue(fetchAlbumsSelector);
  const photos = useRecoilValue(fetchPhotosSelector);
  const [currentPage, setCurrentPage] = useRecoilState(currentPagePostsState);
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);
  const navigate = useNavigate();
  const location = useLocation();

  const newPost = location.state?.newPost;

  const postsPerPage = 12; // Display 12 posts per page
  const postsPerRow = 4; // Number of posts per row

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchPostsAndPhotos = async () => {
      try {
        // Fetch posts from local storage
        const storedPosts = localStorage.getItem('posts');
        let localPosts = [];
        if (storedPosts) {
          try {
            localPosts = JSON.parse(storedPosts);
          } catch (error) {
            console.error('Error parsing posts from local storage:', error);
          }
        }

        // Fetch API posts 
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const apiPosts = await response.json();

        // Combine new API posts with existing local posts
        const combinedPosts = [...localPosts, ...apiPosts];

        // Remove duplicates by filtering based on unique `id`
        const uniquePosts = combinedPosts.filter((post, index, self) =>
          index === self.findIndex(p => p.id === post.id)
        );

        // Sort the posts in descending order by `id`
        const sortedPosts = uniquePosts.sort((a, b) => b.id - a.id);

        // Set the posts to state
        setPosts(sortedPosts);
        setTotalPosts(uniquePosts.length); // Set total posts count

        // Store the combined unique posts in local storage
        localStorage.setItem('posts', JSON.stringify(uniquePosts));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndPhotos();
  }, [newPost]);  

  const getPhotoForPost = (userId) => {
    // Find albums of the user
    const userAlbums = albums.filter(album => album.userId === userId);
    if (userAlbums.length === 0) return 'https://via.placeholder.com/300'; // Default image if no album found

    // Pick a random album
    const randomAlbum = userAlbums[Math.floor(Math.random() * userAlbums.length)];
    
    // Find photos in the selected album
    const albumPhotos = photos.filter(photo => photo.albumId === randomAlbum.id);
    if (albumPhotos.length === 0) return 'https://via.placeholder.com/300'; // Default image if no photo found

    // Pick a random photo from the selected album
    const randomPhoto = albumPhotos[Math.floor(Math.random() * albumPhotos.length)];
    return randomPhoto.url;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CustomSider collapsed={collapsed} onCollapse={setCollapsed} defaultSelectedKey="2" />
      <Layout
  style={{
    marginLeft: collapsed ? 80 : 200,
    minHeight: '100vh',
    backgroundColor: '#414a4c',
    position: 'relative',
    overflow: 'hidden', // Ensure content doesn't overflow past blurred background
  }}
>
  {/* Pseudo-element for background image */}
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
    }}
  />
        <CustomHeader title="Posts" icon={<FormOutlined />}/>
        <Content
          style={{
            padding: '0 48px',
          }}
        >
          <div
            style={{
              padding: '24px 24px 0', // Adjust the padding to create space for the button
              minHeight: 450,
              borderRadius: borderRadiusLG,
              position: 'relative', // Ensure the button is positioned correctly
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: postsButtonBg,
                position: 'absolute',
                top: 20,
                right: 10,
                color:postsButtonText,
                fontSize:18,
                fontFamily:'cursive',
                fontWeight: 'bold',
              }}
              onClick={() => navigate(`/posts/create`)}
            >
              CREATE POST <PlusCircleOutlined style={{ fontSize: 18 }} />
            </Button>
            
            <Row gutter={[16, 16]} style={{ marginTop: '50px', marginBottom: '30px' }}>
              {posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map(post => (
                <Col span={24 / postsPerRow} key={`post-${post.id}-${post.title}`}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorTextDescription: '#1d455c',
                      },
                    }}
                  >
                    <CustomCardOne
                      title={post.title}
                      description={
                        <div style={{
                          textAlign: 'justify',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          WebkitLineClamp: 4,
                          lineClamp: 4,
                          height: '4.8em',
                        }}>
                          {post.body}
                        </div>
                      }
                      coverSrc={getPhotoForPost(post.userId)}
                      onClick={() => navigate(`/posts/${post.id}`)}
                      descriptionColor='#1d455c'
                    />
                  </ConfigProvider>
                </Col>
              ))}
            </Row>
            <PaginationComponent
              pageSize={postsPerPage}
              total={totalPosts}
              current={currentPage}
              onChange={(page) => setCurrentPage(page)} // Update the current page state
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Posts;
