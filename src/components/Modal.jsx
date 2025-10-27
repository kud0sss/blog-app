import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && postId) {
      console.log(`Fetching data for postId: ${postId}`);
      const fetchData = async () => {
        try {
          const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
          console.log('Post response status:', postResponse.status);
          if (!postResponse.ok) throw new Error(`Ошибка загрузки поста: ${postResponse.status}`);
          const postData = await postResponse.json();
          console.log('Post data:', postData);
          setPost(postData);

          const commentsResponse = await fetch(`http://localhost:3000/comments?postId=${postId}`);
          console.log('Comments response status:', commentsResponse.status);
          if (!commentsResponse.ok) throw new Error(`Ошибка загрузки комментариев: ${commentsResponse.status}`);
          const commentsData = await commentsResponse.json();
          console.log('Comments data:', commentsData);
          setComments(commentsData);
        } catch (error) {
          console.error('Ошибка в Modal:', error.message);
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [isOpen, postId]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        {error ? (
          <p style={{ color: 'red' }}>Ошибка: {error}</p>
        ) : post ? (
          <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>Комментарии:</h3>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="comment">
                  <strong>{comment.name} ({comment.email})</strong>
                  <p>{comment.body}</p>
                </div>
              ))
            ) : (
              <p>Комментариев нет</p>
            )}
          </>
        ) : (
          <p>Загрузка...</p>
        )}
      </div>
    </div>
  );
};

export default Modal;