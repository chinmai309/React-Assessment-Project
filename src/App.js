import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Posts from './components/Posts';
import PostDetail from './components/PostsDetail';
import Albums from './components/Albums';
import Photos from './components/Photos';
import Comments from './components/Comments';
import CommentDetail from './components/CommentDetail';
import Users from './components/Users';
import UsersDetail from './components/UsersDetail';
import CreatePost from './components/CreatePost';
import DeletePostsButton from './components/DeletePostsButton';
import { Suspense } from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/posts" element={<ProtectedRoute element={Posts}/>} />        
        <Route path="/posts/create" element={<ProtectedRoute element={CreatePost}/>} />
        <Route path="/posts/:id" element={<ProtectedRoute element={PostDetail}/>} />
        <Route path="/albums" element={<ProtectedRoute element={Albums}/>} />
        <Route path="/photos" element={<ProtectedRoute element={Photos}/>} />
        <Route path="/comments" element={<ProtectedRoute element={Comments}/>} />
        <Route path="/comments/:postId" element={<ProtectedRoute element={CommentDetail}/>} />
        <Route path="/users" element={<ProtectedRoute element={Users}/>} />
        <Route path="/users/:id" element={<ProtectedRoute element={UsersDetail}/>} />
        {/* <Route path="/delete" element={<DeletePostsButton />} /> */}
        
      </Routes>
      </Suspense>
    </BrowserRouter>
    </div>
  );
}

export default App;
