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

// Atom for managing comments
export const commentsState = atom({
  key: 'commentsState',
  default: [],
});

// Atom for managing collapsed State
export const collapsedState = atom({
  key: 'collapsedState',
  default: false,
});

// Atom for managing display posts State
export const displayPostsState = atom({
  key: 'displayPostsState',
  default: [],
});

// Atom for managing current page State
export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

// Atom for managing current page State of posts
export const currentPagePostsState = atom({
  key: 'currentPagePostsState',
  default: 1,
});

// Atom for managing current page State of albums
export const currentPageAlbumsState = atom({
  key: 'currentPageAlbumsState',
  default: 1,
});

// Atom for managing current page State of photos
export const currentPagePhotosState = atom({
  key: 'currentPagePhotosState',
  default: 1,
});

// Atom for managing current page State of comments
export const currentPageCommentsState = atom({
  key: 'currentPageCommentsState',
  default: 1,
});

// Atom for managing total posts State
export const totalPostsState = atom({
  key: 'totalPostsState',
  default: 0,
});

// Atom for managing total albums State
export const totalAlbumsState = atom({
  key: 'totalAlbumsState',
  default: 0,
});

// Atom for managing total photos State
export const totalPhotosState = atom({
  key: 'totalPhotosState',
  default: 0,
});

// Atom for managing post State
export const postState = atom({
  key: 'postState',
  default: null,
});

// Atom for managing albumsUsers State
export const albumsUsersState = atom({
  key: 'albumsUsersState',
  default: [], // Initial state
});

// Atom for managing photo State
export const photoState = atom({
  key: 'photoState',
  default: null,
});

// Atom for managing submitting status State
export const isSubmittingState = atom({
  key: 'isSubmittingState',
  default: false,
});

// Atom for managing formValid State
export const isFormValidState = atom({
  key: 'isFormValidState',
  default: false,
});

// Atom for managing loading State
export const loadingState = atom({
  key: 'loadingState',
  default: true,
});

// Atom for managing filtered comments State
export const filteredCommentsState = atom({
  key: 'filteredCommentsState',
  default: [],
});

// Selector to get latest posts
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
    const sortedAlbums = albums.sort((a, b) => b.id - a.id);
    return sortedAlbums.slice(0,4);
  },
});

// Selector to get filtered photos
export const filteredPhotosSelector = selector({
  key: 'filteredPhotosSelector',
  get:  async ({ get }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const photos = await response.json();
    const sortedPhotos = photos.sort((a, b) => b.id - a.id);
    return sortedPhotos.slice(0,4);
  },
});

//Selector to fetch posts
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

// Selector to fetch total number of albums
export const totalAlbumsSelector = selector({
  key: 'totalAlbumsSelector',
  get: async () => {
    try {
      // Fetch total number of albums
      const totalResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
      const totalData = await totalResponse.json();
      return totalData.length;
    } catch (error) {
      console.error('Error fetching total albums:', error);
      return 0;
    }
  },
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

// Selector to fetch total number of photos
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

// Selector to fetch users from api server
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

// Selector to fetch users from local storage
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

// Selector to get photos with albums data
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
  
// Selector to get albums along with its user details  
export const albumsWithDetailsSelector = selector({
  key: 'albumsWithDetailsSelector',
  get: async ({ get }) => {
    const currentPage = get(currentPageAlbumsState);
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



