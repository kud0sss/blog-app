import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import Modal from './components/Modal';
import Footer from './components/Footer';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки постов');
        return response.json();
      })
      .then(data => {
        console.log('Posts loaded:', data);
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch(error => console.error('Ошибка:', error));
  }, []);

  const handleAuthorSelect = (userId) => {
    console.log('Selected userId:', userId, 'Type:', typeof userId);
    if (userId === null) {
      console.log('Showing all posts:', posts);
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => {
        console.log(`Checking post userId: ${post.userId} (type: ${typeof post.userId}) against selected userId: ${userId} (type: ${typeof userId})`);
        return post.userId == userId; 
      });
      console.log('Filtered posts:', filtered);
      setFilteredPosts(filtered);
    }
  };

  const handleOpenModal = (postId) => {
    console.log('Opening modal for postId:', postId);
    setSelectedPostId(postId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPostId(null);
  };

  return (
  <>
    <Header onAuthorSelect={handleAuthorSelect} />
    <PostList posts={filteredPosts} onOpenModal={handleOpenModal} />
    <Modal isOpen={modalOpen} onClose={handleCloseModal} postId={selectedPostId} />
    <Footer />
  </>
  );
};

export default App;