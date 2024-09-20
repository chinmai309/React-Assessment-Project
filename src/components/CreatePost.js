import React from 'react';
import { Layout, Row, Col, Button, Form, message, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FileAddOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { isFormValidState, isSubmittingState } from './state';
import CustomHeader from '../assets/CustomHeader';
import FormCard from '../assets/FormCard';

const { Content } = Layout;

const CreatePost = () => {
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
            <CustomHeader title="Create Post" icon={<FileAddOutlined />} titleColor="whitesmoke" background="#001529" />
            <Content style={{ padding: '0 48px', backgroundColor: '#aab4bd' }}>
                <div style={{ padding: 26, borderRadius: borderRadiusLG, backgroundColor: '#aab4bd' }}>
                    <Row
                        align="middle"
                        justify="center"
                        style={{ backgroundColor: '#aab4bd', minHeight: '82vh', textAlign: 'center' }}
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
