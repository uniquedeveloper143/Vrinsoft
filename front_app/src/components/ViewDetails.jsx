import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HTTP } from "../api/http-common";
import Header from '../components/Header';


function ViewDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; // Get the id from navigation state
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    if (id) {
      fetchItemDetails(id);
    } else {
      navigate('/home'); // If no ID, go back to Home
    }
  }, [id]);

  const fetchItemDetails = (id) => {
    const token = localStorage.getItem('authToken');
    let url = `/api/my_app/image-details/${id}/`;

    HTTP.get(url, {
      headers: {
        'Authorization': `token ${token}`
      }
    })
    .then(function (response) {
      if (response.status === 200) {
        setItemDetails(response.data);
      }
    })
    .catch(function (error) {
      console.error(error.response?.data);
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/');
      }
    });
  };

  if (!itemDetails) {
    return <div className="text-center m-5">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <button className="btn btn-secondary mb-3" onClick={() => navigate('/home')}>
          Back to Home
        </button>

        <h3 className="card-title m-3">{itemDetails.title}</h3>
        <div className="card shadow">
          <img
            src={itemDetails.photo}
            className="card-img-top"
            alt={itemDetails.title}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <div className="card-body">
            {/* Show related objects, e.g., related items */}
            <div>
              <h4>Objects Items:</h4>
              <ul>
                {itemDetails.photo_detail && itemDetails.photo_detail.map((relatedItem, index) => (
                  <li key={index}>
                    {relatedItem.name} - {relatedItem.total_count}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDetails;
