import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTTP } from "../api/http-common";
import Header from '../components/Header';

function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = (page) => {
    const token = localStorage.getItem('authToken');
    let url = `/api/my_app/image/?page=${page}`;

    HTTP.get(url, {
      headers: {
        'Authorization': `token ${token}`
      }
    })
    .then(function (response) {
      console.log('Items Fetched:', response.data);
      if (response.status === 200) {
        setItems(response.data.results);
        setTotalPages(response.data.total_page_count);
      }
    })
    .catch(function (error) {
      console.error('Failed fetching items:', error.response?.data);
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/');
      }
    });
  };

  const handleViewDetails = (id) => {
    navigate('/view-details', { state: { id } });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header /> {/* HEADER AT TOP */}
      <div className="container mt-4">
        <div className="row">
          {items.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.photo}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleViewDetails(item.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Home;
