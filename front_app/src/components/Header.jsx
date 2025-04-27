import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleAddItem = () => {
    navigate('/add-item');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
          My App
        </span>

        <div className="d-flex">
          <button className="btn btn-success me-2" onClick={handleAddItem}>
            Add Item
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
