import { atom,selector, selectorFamily } from 'recoil';

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

  export const albumsUsersState = atom({
    key: 'albumsUsersState',
    default: [], // Initial state
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

    export const collapsedState = atom({
      key: 'collapsedState',
      default: false,
    });

    export const displayPostsState = atom({
      key: 'displayPostsState',
      default: [],
    });

    export const currentPageState = atom({
      key: 'currentPageState',
      default: 1,
    });

    export const totalPostsState = atom({
      key: 'totalPostsState',
      default: 0,
    });

    export const totalAlbumsState = atom({
      key: 'totalAlbumsState',
      default: 0,
    });

    export const totalPhotosState = atom({
      key: 'totalPhotosState',
      default: 0,
    });

    export const postState = atom({
      key: 'postState',
      default: null,
    });

    export const photoState = atom({
      key: 'photoState',
      default: null,
    });

    export const isSubmittingState = atom({
      key: 'isSubmittingState',
      default: false,
    });

    export const isFormValidState = atom({
      key: 'isFormValidState',
      default: false,
    });

    export const loadingState = atom({
      key: 'loadingState',
      default: true,
    });

    export const filteredCommentsState = atom({
      key: 'filteredCommentsState',
      default: [],
    });

// Selector to fetch users
export const usersSelector = selector({
  key: 'usersSelector',
  get: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },
});

// Selector to fetch total number of users
export const totalUsersSelector = selector({
  key: 'totalUsersSelector',
  get: async ({ get }) => {
    const users = get(usersSelector);
    return users.length;
  },
});

    // Selector to fetch comments
    export const commentsSelector = selector({
      key: 'commentsSelector',
      get: async ({ get }) => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/comments');
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching comments:', error);
          return [];
        }
      },
    });


// SelectorFamily to get filtered comments based on postId
export const filteredCommentsSelector = selectorFamily({
  key: 'filteredCommentsSelector',
  get: (postId) => async ({ get }) => {
    const comments = get(commentsSelector);
    return comments.filter(comment => comment.postId === parseInt(postId, 10));
  },
});
    

// Selectors
export const photosWithAlbumsSelector = selector({
  key: 'photosWithAlbumsSelector',
  get: async ({ get }) => {
    const currentPage = get(currentPageState);
    const photosPerPage = 12;

    try {
      // Fetch photos
      const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${photosPerPage}`);
      const photosData = await photosResponse.json();

      // Fetch albums
      const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
      const albumsData = await albumsResponse.json();

      // Create a map of albums for quick lookup
      const albumsMap = albumsData.reduce((acc, album) => {
        acc[album.id] = album;
        return acc;
      }, {});

      // Enhance photos with album data
      return photosData.map(photo => ({
        ...photo,
        album: albumsMap[photo.albumId] || {},
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
});

export const totalPhotosSelector = selector({
  key: 'totalPhotosSelector',
  get: async () => {
    try {
      // Fetch total number of photos
      const totalResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
      const totalData = await totalResponse.json();
      return totalData.length;
    } catch (error) {
      console.error('Error fetching total photos:', error);
      return 0;
    }
  },
});

  
    // Selectors
    export const albumsWithDetailsSelector = selector({
      key: 'albumsWithDetailsSelector',
      get: async ({ get }) => {
        const currentPage = get(currentPageState);
        const albumsPerPage = 12;
    
        try {
          // Fetch albums
          const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?_page=${currentPage}&_limit=${albumsPerPage}`);
          const albumsData = await albumsResponse.json();
    
          // Fetch users
          const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
          const usersData = await usersResponse.json();
    
          // Map users to a dictionary for quick lookup
          const usersMap = usersData.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {});
    
          // Fetch photos
          const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
          const photosData = await photosResponse.json();
    
          // Link albums to photos and users
          return albumsData.map(album => ({
            ...album,
            photo: photosData.find(photo => photo.albumId === album.id),
            user: usersMap[album.userId]
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
          return [];
        }
      }
    });

export const latestPostsSelector = selector({
  key: 'latestPostsSelector',
  get: async ({ get }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    return posts.slice(0, 4);  // Example to get the latest 10 posts
  },
});


// Selector to get filtered albums
export const filteredAlbumsSelector = selector({
  key: 'filteredAlbumsSelector',
  get: async ({ get }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const albums = await response.json();
    return albums.slice(0, 4);
  },
});

// Selector to get filtered photos
export const filteredPhotosSelector = selector({
  key: 'filteredPhotosSelector',
  get:  async ({ get }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const photos = await response.json();
    return photos.slice(0, 4);
  },
});

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  },
  set: ({ set }, newValue) => {
    if (newValue === null) {
      localStorage.removeItem('loggedInUser');
    } else {
      localStorage.setItem('loggedInUser', JSON.stringify(newValue));
    }
    set(userState, newValue);
  },
});

// Selector to fetch posts and manage pagination
export const paginatedPostsSelector = selector({
  key: 'paginatedPostsSelector',
  get: async ({ get }) => {
    const currentPage = get(currentPageState);
    const postsPerPage = 12;
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`);
    return response.json();
  },
});

export const fetchPostsSelector = selector({
  key: 'fetchPostsSelector',
  get: async ({ get }) => {
    const currentPage = get(currentPageState);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=12`);
    const posts = await response.json();
    return posts;
  }
});

// Selector for fetching total number of posts
export const totalPostsSelector = selector({
  key: 'totalPostsSelector',
  get: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    return posts.length;
  }
});

// Selector for fetching albums
export const fetchAlbumsSelector = selector({
  key: 'fetchAlbumsSelector',
  get: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const albums = await response.json();
    return albums;
  }
});

// Selector for fetching photos
export const fetchPhotosSelector = selector({
  key: 'fetchPhotosSelector',
  get: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const photos = await response.json();
    return photos;
  }
});

const photoForPostSelector = selectorFamily({
  key: 'photoForPostSelector',
  get: (userId) => ({ get }) => {
    const albums = get(albumsState);
    const photos = get(photosState);

    const userAlbums = albums.filter(album => album.userId === userId);
    if (userAlbums.length === 0) return 'https://via.placeholder.com/300';

    const randomAlbum = userAlbums[Math.floor(Math.random() * userAlbums.length)];
    const albumPhotos = photos.filter(photo => photo.albumId === randomAlbum.id);
    if (albumPhotos.length === 0) return 'https://via.placeholder.com/300';

    return albumPhotos[Math.floor(Math.random() * albumPhotos.length)].url;
  },
});
