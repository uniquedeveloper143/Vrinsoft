import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import Login from './components/Login';
import Home from './components/Home';
import ViewDetails from './components/ViewDetails';
import AddItem from './components/AddItem';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/view-details" element={<ViewDetails />} />
      </Routes>
    </Router>
  );
}


function LoginWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return <Login />;
}

// ✅ ProtectedRoute to check token before loading Home
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return children;
}

export default App;
