import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Category.css';
import { useDispatch, useSelector } from 'react-redux';
import { deletecategoryfun, readcategory } from '../features/Detailsdata';

function Category() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.app);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(readcategory());
  }, [dispatch]);

  const navigate = useNavigate();

  const addCategoryHandle = () => {
    navigate('/admin/add-category');
  }

  const handleDeleteCategory = (id) => {
    dispatch(deletecategoryfun(id));
  }

  return (
    <div className='categorynn'>
      <h2 className='zz'> Admin DashBoard</h2>
      <div className="app">
        <div className="header">
          <h2>All Categories</h2>
          <div className="search-add">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add-category" onClick={addCategoryHandle}>+ Add Category</button>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div>
          <table className="category-table cate">
            <thead>
              <tr>
                <th>Title</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
              {
                categories && categories.map(category => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>
                      <div className='view-button-class'>
                        <Link to={`/admin/categories/update/${category._id}`}>
                          <button className="view-button">Edit</button>
                        </Link>
                        <button
                          className="view-button" id='btn-delete'
                          onClick={() => handleDeleteCategory(category._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;