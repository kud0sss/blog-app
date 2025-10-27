import React from 'react';

const PostList = ({ posts, onOpenModal }) => {
  return (
    <main>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => onOpenModal(post.id)}>Подробнее</button>
        </div>
      ))}
    </main>
  );
};

export default PostList;