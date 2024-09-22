import React, { useContext } from 'react';
import { Form, Button, Input, message, Col, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usersState } from './state'; // Import Recoil state atom
import FormCard from '../assets/FormCard';
import './Login.css'; // Import the CSS file for the background and other styles
import logo from '../logo.svg';
import { ThemeContext } from './ThemeContext';

const SignUp = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useRecoilState(usersState); // Use Recoil state
  const navigate = useNavigate();
  const { backgroundImage } = useContext(ThemeContext); // Use background image from ThemeContext

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
      label: <span><MailOutlined /> Email</span>,
      type: 'email',
      rules: [{ required: true, type: 'email', message: 'Please enter a valid email!' }],
    },
    {
      name: 'name',
      label: <span><UserOutlined /> Name</span>,
      type: 'text',
      rules: [{ required: true, message: 'Please enter your name!' }],
    },
    {
      name: 'password',
      label: <span><LockOutlined /> Password</span>,
      type: 'password',
      rules: [{ required: true, min: 6, message: 'Password must be at least 6 characters long!' }],
      inputComponent: (
        <Input.Password
          placeholder="Password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      ),
    },
  ];

  const buttons = (
    <Form.Item>
      <Button type="primary" htmlType="submit">Sign Up</Button>
      <p>
        Already Registered? <br />
        Then you can <Link to="/login">Log In</Link> directly.
      </p>
    </Form.Item>
  );

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Logo Section on Top */}
      <div className="logo-container">
        <img src={logo} className="logo-small" alt="logo" />
        <span className="logo-text">React Application</span>
      </div>

      {/* Home Button in Top Right Corner */}
      <Link to="/" style={styles.homeButton}>
        <HomeOutlined style={styles.homeIcon} />
      </Link>

      <Row align="middle" justify="center">
        <Col>
          <div style={styles.formContainer}>
            <div style={styles.userIconContainer}>
              <UserOutlined style={styles.userIcon} />
            </div>
            <FormCard title="SIGN UP" form={form} onFinish={handleSubmit} fields={fields} buttons={buttons} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  formContainer: {
    position: 'relative',
    background: 'white',
    paddingTop: '50px',
    borderRadius: '10px',
    textAlign: 'center',
    zIndex: 1,
  },
  userIconContainer: {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
  },
  userIcon: {
    fontSize: '40px',
    color: '#1890ff',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1000,
    background: 'white',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  homeIcon: {
    fontSize: '24px',
    color: '#1890ff',
  },
};

export default SignUp;
