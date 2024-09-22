import React, { useContext } from 'react';
import { Button } from 'antd';
import { SunFilled, MoonFilled } from '@ant-design/icons';
import { ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      type="primary"
      onClick={toggleTheme}
      shape="circle"
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        zIndex: 1000,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {theme === 'light' ? <SunFilled style={{ fontSize: 26 }} /> : <MoonFilled style={{ fontSize: 26 }} />}
    </Button>
  );
};

export default ThemeToggle;
