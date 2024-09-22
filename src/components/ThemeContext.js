import React, { createContext, useState } from 'react';

// Create ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initial state for theme, background image, and header background color
  const [theme, setTheme] = useState('light');
  const [backgroundImage, setBackgroundImage] = useState(
    'https://i.pinimg.com/564x/c7/e7/1b/c7e71bc6610ee119f7c2b05cc775c483.jpg'
  );
  const [headerBgColor, setHeaderBgColor] = useState('#414a4c'); // Default to light theme color
  const [headerFontColor, setHeaderFontColor] = useState('white'); // Light theme font color
  const [homeBackground, setHomeBackground] = useState('https://i.pinimg.com/236x/09/d6/98/09d698111801da52a5afc340abbbfd39.jpg'); // Light theme font color
  const [postsHeadingColor, setPostsHeadingColor] = useState('white'); // Light theme post heading color
  const [postsButtonBg, setPostsButtonBg] = useState('#d4eded'); // Light theme post heading color
  const [postsButtonText, setPostsButtonText] = useState('black'); // Light theme post heading color
  const [albumsHeadingColor, setAlbumsHeadingColor] = useState('white'); // Light theme album heading color
  const [photosHeadingColor, setPhotosHeadingColor] = useState('white'); // Light theme photo heading color
  const [cardBgColor, setCardBgColor] = useState('#c5dbf0'); // Light theme photo heading color


  // Toggle function for switching theme, background image, and header background color
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setBackgroundImage('https://i.pinimg.com/564x/7e/d4/27/7ed42704d7801076055abcc709fd7c23.jpg');
      setHeaderBgColor('#aeb5b6'); // Light theme header color
      setHeaderFontColor('black'); // Light theme font color

      setPostsHeadingColor('#0d374f');
      setAlbumsHeadingColor('#4f0d2b');
      setPhotosHeadingColor('#0d4f4c');
      setPostsButtonBg('#0d374f');
      setPostsButtonText('white');
      setCardBgColor('#ffffff');
      setHomeBackground('https://i.pinimg.com/564x/4d/f6/f3/4df6f31447429f36e5593df24b192bc5.jpg');


    } else {
      setTheme('light');
      setBackgroundImage('https://i.pinimg.com/564x/c7/e7/1b/c7e71bc6610ee119f7c2b05cc775c483.jpg');
      setHeaderBgColor('#414a4c'); // Dark theme header color
      setHeaderFontColor('white'); // Dark theme font color

      setPostsHeadingColor('white');
      setAlbumsHeadingColor('white');
      setPhotosHeadingColor('white');
      setPostsButtonBg('#d4eded');
      setPostsButtonText('black');
      setCardBgColor('#c5dbf0');
      setHomeBackground('https://i.pinimg.com/236x/09/d6/98/09d698111801da52a5afc340abbbfd39.jpg');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        backgroundImage,
        headerBgColor,
        headerFontColor,
        postsHeadingColor,
        albumsHeadingColor,
        photosHeadingColor,
        postsButtonBg,
        postsButtonText,
        cardBgColor,
        homeBackground,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
