import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [usersRes, filesRes] = await Promise.all([
          axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/admin/files', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setUsers(usersRes.data || []);
        setFiles(filesRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin data.');
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {error && <p className="error">{error}</p>}

      <section>
        <h3>Registered Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Uploaded Files</h3>
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.filename}
              </a> by {file.uploadedBy}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;