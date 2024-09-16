import { atom } from 'recoil';

// Atom to hold the list of users
export const usersState = atom({
  key: 'usersState',
  default: JSON.parse(localStorage.getItem('users')) || [],
});

// Atom to hold the currently logged-in user
export const loggedInUserState = atom({
  key: 'loggedInUserState',
  default: JSON.parse(localStorage.getItem('loggedInUser')) || null,
});

// Atom for managing posts
export const postsState = atom({
    key: 'postsState',
    default: [], // Initial state
  });
  
  // Atom for managing user information
  export const userState = atom({
    key: 'userState',
    default: null, // Initial state
  });

    // Atom for managing albums
    export const albumsState = atom({
      key: 'albumsState',
      default: [], // Initial state
    });


    // Atom for managing photos
    export const photosState = atom({
      key: 'photosState',
      default: [], // Initial state
    });

    // Define Recoil state for comments
    export const commentsState = atom({
      key: 'commentsState',
      default: [],
    });

    
