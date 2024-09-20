import React, { useState } from 'react';
import './Addcategroy.css';
import { useDispatch } from 'react-redux';
import { addcatagoryfun } from '../features/Detailsdata';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [name, setcategoryname] = useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handdlecatogry = (e) => {
        e.preventDefault();
        const categoryData = { name };
        dispatch(addcatagoryfun(categoryData));
        navigate('/admin/category')
        setcategoryname('');
    }

    return (
        <div className='add-category-main'>
             <h2 className='zz'> Admin DashBoard</h2>
    
        <div className='category-container new-categoryy'>
            <form onSubmit={handdlecatogry}>
                <h2>Add a New Category</h2>
                <hr />
                <div className='form-group'>
                    <label htmlFor="categoryName">Category</label>
                    <input
                        type="text"
                        id="categoryName"
                        placeholder='Category Name'
                        value={name}
                        onChange={(e) => setcategoryname(e.target.value)}
                    />
                </div>
                <div className='btn-category'>
                    <button type="submit" className='add-button'>Add</button>
                    <button type="button" className='add-button'>Close</button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default AddCategory;
