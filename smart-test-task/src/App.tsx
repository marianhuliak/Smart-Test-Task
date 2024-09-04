import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, User } from './features/user/userSlice';
import { RootState, AppDispatch } from './store';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [searchTerm, setSearchTerm] = useState({
    name: '',
    username: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm({
      ...searchTerm,
      [e.target.name]: e.target.value
    });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
    user.username.toLowerCase().includes(searchTerm.username.toLowerCase()) &&
    user.email.toLowerCase().includes(searchTerm.email.toLowerCase()) &&
    user.phone.toLowerCase().includes(searchTerm.phone.toLowerCase())
  );

  return (
    <div>
      <h1>Управління користувачами</h1>
      <input
        type="text"
        name="name"
        placeholder="Пошук за ім'ям"
        value={searchTerm.name}
        onChange={handleSearch}
      />
      <input
        type="text"
        name="username"
        placeholder="Пошук за логіном"
        value={searchTerm.username}
        onChange={handleSearch}
      />
      <input
        type="text"
        name="email"
        placeholder="Пошук за електронною поштою"
        value={searchTerm.email}
        onChange={handleSearch}
      />
      <input
        type="text"
        name="phone"
        placeholder="Пошук за телефоном"
        value={searchTerm.phone}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Логін</th>
            <th>Електронна пошта</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
