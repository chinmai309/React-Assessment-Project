import React from 'react';
import { Button } from 'antd';

const DeletePostsButton = () => {
  const handleDelete = () => {
    const deletePostsByTitle = (titlesToDelete) => {
      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedPosts = existingPosts.filter(post => !titlesToDelete.includes(post.body));
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    deletePostsByTitle(['post2','bbb','aaa']);
    alert('Posts deleted!');
  };

  return (
    <Button type="danger" onClick={handleDelete}>
      Delete Specified Posts
    </Button>
  );
};

export default DeletePostsButton;
