import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../features/Detailsdata';
import { useNavigate, useParams } from 'react-router-dom';

const Updatecategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const categories = useSelector(state => state.app.categories);
  const [categoryUpdate, setCategoryUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Extracted ID:', id);
    if (id && Array.isArray(categories)) {
      const selectedCategory = categories.find((ele) => ele._id === id);
      if (selectedCategory) {
        setCategoryUpdate({ ...selectedCategory });
        console.log('Selected Category:', selectedCategory);
      }
    }
  }, [id, categories]);

  const handleInputChange = (e) => {
    setCategoryUpdate({ ...categoryUpdate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryUpdate._id) {
      console.error('Category ID is missing');
      return;
    }

    if (!categoryUpdate.name) {
      console.error('Category name is missing');
      return;
    }

    dispatch(updateCategory({ id: categoryUpdate._id, name: categoryUpdate.name }));
    navigate('/admin/category');
  };

  return (
    <div className="update-category-container">
      <form onSubmit={handleSubmit} className="update-category-form">
        <h2>Update Category</h2>
        <hr />
        <div className='form-group'>
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            name="name"
            className="form-control"
            placeholder='Category Name'
            onChange={handleInputChange}
            value={categoryUpdate.name || ''}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Category</button>
      </form>
    </div>
  );
};

export default Updatecategory;