import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;
      position: relative;

      > span {
        position: relative;
        color: black;
        transition: color 0.3s;
        z-index: 1;
      }

      &::before {
        content: '';
        background: linear-gradient(13deg, #44e3d6, #3c88a3);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
        z-index: 0;
      }

      &:hover::before {
        opacity: 1;
        background: linear-gradient(13deg, #6653e1, #d93d80);
      }

      &:hover > span {
        color: white;
      }
    }
  `,
}));

const Home = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{textAlign: 'center', fontFamily: 'cursive'}}>Welcome to Your Daily Dose of Blog Content!</h1>
        <h3 style={{textAlign: 'center', fontFamily: 'cursive', fontStyle: 'italic', color:'#0d374f'}}>"Discover Your Next Favorite Post"</h3>
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        >
          <Button type="primary" size="large" onClick={handleClick} style={{ fontSize: 20 }}>
            Log In <LoginOutlined />
          </Button>
        </ConfigProvider>
      </header>
    </div>
  );
};

export default Home;

