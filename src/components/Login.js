import React from 'react';
import { Form, Input, Button, message, Col, Row, Card, ConfigProvider } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usersState, loggedInUserState } from './state'; // Import Recoil state atoms

const Login = () => {
  const [form] = Form.useForm();
  const [users] = useRecoilState(usersState); // Use Recoil state
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { email, password } = values;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setLoggedInUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      message.error('Invalid email or password!');
    }
  };

  return (
    <Row
      className="login-container"
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
          <Card title="SIGN IN" hoverable={true} style={{ width: 400, borderWidth: 2, borderColor: 'grey', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
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
                  name="password"
                  label="Password"
                  rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters long!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
              <p>
                Don't have an account? <br />
                <Link to="/signup">Register</Link> here.
              </p>
            </div>
          </Card>
        </ConfigProvider>
      </Col>
    </Row>
  );
};

export default Login;
