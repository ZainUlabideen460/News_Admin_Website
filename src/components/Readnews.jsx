import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Category.css';
import { useDispatch, useSelector } from 'react-redux';
import { deletenewsfun, readnews } from '../features/Detailsdata';
import { readcategory } from '../features/Detailsdata';

const Readnews = () => {
  const dispatch = useDispatch();
  const { news, categories, loading, error } = useSelector(state => state.app);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(readnews());
    dispatch(readcategory());
  }, [dispatch]);

  const navigate = useNavigate();

  const addCategoryHandle = () => {
    navigate('/addcategory');
  };

  const handleDeletenews = (id) => {
    dispatch(deletenewsfun(id));
  };

  const addCategoryHandlee = () => {
    navigate('/admin/add-news');
  };

  return (
    <div className='main-read-news'>
      <h2 className='zz'>Admin DashBoard</h2>

      <div className="app">
        <div className="header">
          <h2>All News</h2>
          <div className="search-add">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add-category" onClick={addCategoryHandlee}>+ Add News</button>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div>
          <table className="category-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
            {news.map(newsItem => {
  const category = categories.find(c => c._id === newsItem.categoryId);
  
  return (
    <tr key={newsItem._id}>
      <td>{newsItem.title}</td>
      <td>{newsItem.content}</td>
      <td>{category ? category.name : 'Unknown'}</td>
      <td>
        <div className='view-button-class'>
          <Link to={`/admin/news/update/${newsItem._id}`}>
            <button className="view-button">Edit</button>
          </Link>
          <button className="view-button" id='btn-delete' onClick={() => handleDeletenews(newsItem._id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
})}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Readnews;
