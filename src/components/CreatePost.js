import React, { useState } from 'react';
import { Layout, Card, ConfigProvider, Input, Row, Col, Button, Form, message, theme, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FileAddOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { isFormValidState, isSubmittingState } from './state';

const { Header, Content } = Layout;

const CreatePost = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useRecoilState(isSubmittingState);
    const [isFormValid, setIsFormValid] = useRecoilState(isFormValidState);
    const navigate = useNavigate();

    const handleSave = async (values) => {
        setIsSubmitting(true);
        try {
            // Structure new post correctly
            const newPost = {
                userId: Number(values.userId), // Ensure userId is a number
                id: Date.now().toString(), // Ensure id is a number in string format
                title: values.title,
                body: values.body,
            };

            // Get existing posts or initialize empty array
            const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
            // Add new post to the beginning of the posts array
            const updatedPosts = [newPost, ...existingPosts];
            // Save updated posts array to local storage
            localStorage.setItem('posts', JSON.stringify(updatedPosts));

            // Notify user and redirect to posts page
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

        setIsFormValid(allFieldsTouched);
    };

    const {
        token: { borderRadiusLG },
    } = theme.useToken();

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
                    background: '#001529',
                }}
            >
                <span style={{ color: 'whitesmoke', fontSize: 30, marginLeft: 10, fontFamily: 'cursive' }}>
                <FileAddOutlined /> Create Post
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
                        padding: 26,
                        borderRadius: borderRadiusLG,
                        backgroundColor: '#aab4bd'
                    }}
                >
                    <Row
                        className="signup-container"
                        align="middle"
                        justify="center"
                        style={{ backgroundColor: '#aab4bd', minHeight: '82vh', textAlign: 'center' }}
                    >
                        <Col>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Card: {
                                            headerFontSize: 20,
                                        },
                                    },
                                }}
                            >
                                <Card hoverable style={{ width: 400, borderWidth: 2, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', fontSize: 30 }}>
                                    <div className="form-container">
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    fontSize: 16,
                                                    fontFamily: 'cursive'
                                                }
                                            }}>
                                            <Form
                                                form={form}
                                                layout="vertical"
                                                onFinish={handleSave}
                                                onValuesChange={handleValuesChange}
                                            >
                                                <Form.Item
                                                    name="userId"
                                                    label={<span style={{ fontWeight: 'bold', fontSize: 18 }}>User ID</span>}
                                                    style={{ fontSize: 20 }}
                                                    rules={[{ required: true, type: 'number', message: 'Please enter a valid user ID!' }]}
                                                >
                                                    <InputNumber style={{ width: 350 }} />
                                                </Form.Item>
                                                <Form.Item
                                                    name="title"
                                                    label={<span style={{ fontWeight: 'bold', fontSize: 18 }}>Title</span>}
                                                    rules={[{ required: true, message: 'Please enter post title!' }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="body"
                                                    label={<span style={{ fontWeight: 'bold', fontSize: 18 }}>Description</span>}
                                                    rules={[{ required: true, message: 'Please enter post description!' }]}
                                                >
                                                    <Input.TextArea />
                                                </Form.Item>
                                                <Form.Item>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Button
                                                            type="primary"
                                                            htmlType="submit"
                                                            loading={isSubmitting}
                                                            disabled={!isFormValid} // Disable Save button based on form validity
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button
                                                            danger
                                                            type="default"
                                                            onClick={() => navigate('/posts')}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </Form.Item>
                                            </Form>
                                        </ConfigProvider>
                                    </div>
                                </Card>
                            </ConfigProvider>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default CreatePost;
