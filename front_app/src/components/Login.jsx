import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HTTP } from "../api/http-common";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
        "username": username,
        "password": password,
      }
    let url = '/api/custom_auth/auth/login/'
    HTTP.post(url, data)
    .then(function (response) {
        console.log(response);
        if(response.status === 200)
        {
          console.log(response.data)
//           setAlert("success");
//           setTimeout( () => {
//            setAlert("")
//          }, 5000);

          const token = response.data.token;
          localStorage.setItem('authToken', token);

          // Navigate to Home page after login
          navigate('/home');

        }
    })
    .catch(function (error) {
      console.log('Login failed:', error.response.data.errors);
      if(error.response?.data?.errors)
      {
          alert(error.response.data.errors);
      }

    });



  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-5">

        <div className="col-md-4 mt-5">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
