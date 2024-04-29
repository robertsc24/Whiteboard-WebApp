import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const sessionsResponse = await axios.get('/admin/sessions');
      const usersResponse = await axios.get('/admin/users');
      setSessions(sessionsResponse.data);
      setUsers(usersResponse.data);
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Sessions</h2>
      {sessions.map(session => (
        <div key={session.id}>{session.info}</div>
      ))}
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default AdminPanel;
