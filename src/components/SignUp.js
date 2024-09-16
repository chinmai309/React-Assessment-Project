import React from 'react';
import { Form, Input, Button, message, Col, Row, Card, ConfigProvider } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usersState } from './state'; // Import Recoil state atom

const SignUp = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useRecoilState(usersState); // Use Recoil state
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email, name, password } = values;
    if (users.some(user => user.email === email)) {
      message.error('User with this email already exists!');
      return;
    }
    const newUser = { email, name, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    message.success('Registration successful!');
    navigate('/login');
  };

  return (
    <Row
      className="signup-container"
      align="middle"
      justify="center"
      style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', textAlign: 'center' }}
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
          <Card title="SIGN UP" hoverable={true} style={{ width: 400, borderWidth: 2, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="form-container">
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters long!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
              <p>
                Already Registered? <br />
                Then you can <Link to="/login">Log In</Link> directly.
              </p>
            </div>
          </Card>
        </ConfigProvider>
      </Col>
    </Row>
  );
};

export default SignUp;
