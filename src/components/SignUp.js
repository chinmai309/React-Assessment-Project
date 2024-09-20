import React from 'react';
import { Form, Button, message, Col, Row } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usersState } from './state'; // Import Recoil state atom
import FormCard from '../assets/FormCard';

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
  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      rules: [{ required: true, type: 'email', message: 'Please enter a valid email!' }],
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      rules: [{ required: true, message: 'Please enter your name!' }],
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
        Sign Up
      </Button>
      <p>
        Already Registered? <br />
        Then you can <Link to="/login">Log In</Link> directly.
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
        <FormCard title="SIGN UP" form={form} onFinish={handleSubmit} fields={fields} buttons={buttons} />
      </Col>
    </Row>
  );
};

export default SignUp;
