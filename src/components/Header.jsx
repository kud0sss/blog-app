import React, { useState, useEffect } from 'react';

const Header = ({ onAuthorSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки пользователей');
        return response.json();
      })
      .then(data => {
        console.log('Users loaded:', data);
        setUsers(data);
      })
      .catch(error => console.error('Ошибка:', error));
  }, []);

  return (
    <header>
      <h1>Блог</h1>
      <nav>
        <ul>
          <li onClick={() => onAuthorSelect(null)}>Все</li>
          {users.map(user => (
            <li key={user.id} onClick={() => onAuthorSelect(user.id)}>
              {user.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;