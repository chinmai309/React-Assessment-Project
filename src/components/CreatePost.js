import React, { useContext } from 'react';
import { Layout, Row, Col, Button, Form, message, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FileAddOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { isFormValidState, isSubmittingState } from './state';
import CustomHeader from '../assets/CustomHeader';
import FormCard from '../assets/FormCard';
import { ThemeContext } from './ThemeContext';

const { Content } = Layout;

const CreatePost = () => {
    const { backgroundImage } = useContext(ThemeContext); // Use background image from ThemeContext

    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useRecoilState(isSubmittingState);
    const [isFormValid, setIsFormValid] = useRecoilState(isFormValidState);
    const navigate = useNavigate();

    const handleSave = async (values) => {
        setIsSubmitting(true);
        try {
            const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];

            // Find the highest existing post ID
            const maxId = existingPosts.reduce((max, post) => Math.max(max, post.id), 0);

            const newPost = {
                userId: Number(values.userId),
                id: maxId + 1,
                title: values.title,
                body: values.body,
            };

            const updatedPosts = [newPost, ...existingPosts];
            localStorage.setItem('posts', JSON.stringify(updatedPosts));

            message.success('Post created successfully!');
            navigate('/posts');
        } catch (error) {
            console.error('Error creating post:', error);
            message.error('Failed to create post.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleValuesChange = () => {
        // Check if all fields are valid
        const fieldsError = form.getFieldsError();
        const allFieldsTouched = form.getFieldsValue().userId && form.getFieldsValue().title && form.getFieldsValue().body;
        const noErrors = fieldsError.every(({ errors }) => errors.length === 0);

        // Update the form validity state
        setIsFormValid(allFieldsTouched && noErrors);
    };

    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const fields = [
        {
            name: 'userId',
            label: 'User ID',
            type: 'number',
            rules: [{ required: true, type: 'number', message: 'Please enter a valid user ID!' }],
        },
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            rules: [{ required: true, message: 'Please enter post title!' }],
        },
        {
            name: 'body',
            label: 'Description',
            type: 'textarea',
            rules: [{ required: true, message: 'Please enter post description!' }],
        },
    ];

    const buttons = (
        <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    disabled={!isFormValid}
                >
                    Save
                </Button>
                <Button danger type="default" onClick={() => navigate('/posts')}>
                    Cancel
                </Button>
            </div>
        </Form.Item>
    );

    return (
        <Layout>
            <CustomHeader title="Create Post" icon={<FileAddOutlined />} titleColor="whitesmoke" />
            <Content style={{ padding: '0 48px', backgroundColor: '#aab4bd', 
            minHeight:'91vh',          
            backgroundImage: `url(${backgroundImage})`, // Apply background image to Content as well
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            backdropFilter: 'blur(10px)',
            backgroundRepeat: 'no-repeat',
            }}>
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
      filter: 'blur(5px)', // Apply the blur here
      zIndex:-1,
    }}
  />
                <div style={{ padding: 26, borderRadius: borderRadiusLG }}>
                    <Row
                        align="middle"
                        justify="center"
                        style={{ minHeight: '82vh', textAlign: 'center' }}
                    >
                        <Col>
                            <FormCard 
                                title="Create Post" 
                                form={form} 
                                onFinish={handleSave} 
                                fields={fields} 
                                buttons={buttons} 
                                onValuesChange={handleValuesChange} 
                            />
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default CreatePost;
