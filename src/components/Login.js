// import React from 'react';
// import { Form, Button, message, Col, Row} from 'antd';
// import { useNavigate, Link } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import { usersState, loggedInUserState } from './state'; // Import Recoil state atoms
// import FormCard from '../assets/FormCard';

// const Login = () => {
//   const [form] = Form.useForm();
//   const [users] = useRecoilState(usersState); // Use Recoil state
//   const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
//   const navigate = useNavigate();

//   const handleSubmit = (values) => {
//     const { email, password } = values;
//     const user = users.find(user => user.email === email && user.password === password);
//     if (user) {
//       setLoggedInUser(user);
//       localStorage.setItem('loggedInUser', JSON.stringify(user));
//       navigate('/dashboard');
//     } else {
//       message.error('Invalid email or password!');
//     }
//   };
//   const fields = [
//     {
//       name: 'email',
//       label: 'Email',
//       type: 'email',
//       rules: [{ required: true, type: 'email', message: 'Please enter a valid email!' }],
//     },
//     {
//       name: 'password',
//       label: 'Password',
//       type: 'password',
//       rules: [{ required: true, min: 6, message: 'Password must be at least 6 characters long!' }],
//     },
//   ];

//   const buttons = (
//     <Form.Item>
//       <Button type="primary" htmlType="submit">
//         Login
//       </Button>
//       <p>
//         Don't have an account? <br />
//         <Link to="/signup">Register</Link> here.
//       </p>
//     </Form.Item>
//   );


//   return (
//     <Row
//       align="middle"
//       justify="center"
//       style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', textAlign: 'center' }}
//     >
//       <Col>
//         <FormCard title="SIGN IN" form={form} onFinish={handleSubmit} fields={fields} buttons={buttons} />
//       </Col>
//     </Row>
//   );
// };

// export default Login;
import React, { useContext } from 'react';
import { Form, Button, Input, message, Col, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { usersState, loggedInUserState } from './state';
import FormCard from '../assets/FormCard';
import './Login.css';
import logo from '../logo.svg';
import { ThemeContext } from './ThemeContext';

const Login = () => {
  const [form] = Form.useForm();
  const [users] = useRecoilState(usersState);
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const navigate = useNavigate();
  const { backgroundImage } = useContext(ThemeContext);

  const handleSubmit = (values) => {
    const { email, password } = values;
    const user = users.find((user) => user.email === email && user.password === password);
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
      label: <span><MailOutlined /> Email</span>,
      type: 'email',
      rules: [{ required: true, type: 'email', message: 'Please enter a valid email!' }],
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
      <Button type="primary" htmlType="submit">Login</Button>
      <p>
        Don't have an account? <br />
        <Link to="/signup">Register</Link> here.
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
            <FormCard title="SIGN IN" form={form} onFinish={handleSubmit} fields={fields} buttons={buttons} />
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

export default Login;
