import React from 'react';
import { Form, Button, message, Col, Row} from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usersState, loggedInUserState } from './state'; // Import Recoil state atoms
import FormCard from '../assets/FormCard';

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
  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      rules: [{ required: true, type: 'email', message: 'Please enter a valid email!' }],
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      rules: [{ required: true, min: 6, message: 'Password must be at least 6 characters long!' }],
    },
  ];

  const buttons = (
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
      <p>
        Don't have an account? <br />
        <Link to="/signup">Register</Link> here.
      </p>
    </Form.Item>
  );


  return (
    <Row
      align="middle"
      justify="center"
      style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', textAlign: 'center' }}
    >
      <Col>
        <FormCard title="SIGN IN" form={form} onFinish={handleSubmit} fields={fields} buttons={buttons} />
      </Col>
    </Row>
  );
};

export default Login;
