import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTTP } from "../api/http-common";
import Header from '../components/Header';


function AddItem() {
  const navigate = useNavigate();

  // State variables for form input
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!title || !image) {
      setError("Title and Image are required.");
      return;
    }

    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', image);

    let url = '/api/my_app/image/';

    setLoading(true)
    // Send API request to add item
    HTTP.post(url, formData, {
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage("Item added successfully!");
          let id = response.data.id
          setTimeout(() => {
            setSuccessMessage('');
            navigate('/view-details', { state: { id } });
          }, 3000);
        }
      })
      .catch((error) => {
        setLoading(false)
        console.error(error.response?.data);
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/');
        }
        if(error.response?.data?.errors)
          {
              alert(error.response.data.errors);
          }
      });
  };


  return (
    <>
      <Header />
        <div className="container mt-5">
          <h1>Add New Item</h1>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                id="photo"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            { loading ?
                <>
                <div className="text-center m-4">Uploading...</div>
                </>
                :
                <>
                <button type="submit" className="btn btn-primary">Add Item</button>
                </>
            }
          </form>
        </div>
    </>
  );
}

export default AddItem;
