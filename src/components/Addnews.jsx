import React, { useEffect, useState } from 'react';
import './Addcategroy.css';
import { useDispatch, useSelector } from 'react-redux';
import { addnewsfun, readcategory } from '../features/Detailsdata';
import { useNavigate } from 'react-router-dom';

const Addnews = () => {
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');
    const [category, setcategory] = useState('');
    const [newsImage, setimage] = useState(null);

    const { categories } = useSelector(state => state.app); // Adjust selector to match your slice
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(readcategory());
    // }, [dispatch]);



    const handleCategory = (e) => {
        e.preventDefault();
        
        if (!title || !content || !category) {
            alert('Please fill all required fields, including selecting a category');
            return;
        }
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category); // This should now be the ObjectId string
        if (newsImage) {
            formData.append('newsImage', newsImage);
        }
    
        // Log FormData contents (for debugging)
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        dispatch(addnewsfun(formData))
            .unwrap()
            .then(() => {
                navigate('/admin/readnews');
                settitle('');
                setcontent('');
                setcategory('');
                setimage(null);
            })
            .catch((error) => {
                console.error('Failed to add news:', error);
                alert('Failed to add news. Please try again.');
            });
    };
   
  

    const handleImageChange = (e) => {
        setimage(e.target.files[0]);
    };

    return (
       <div>
       <h2 className='zz'> Admin DashBoard</h2>

        <div className='category-container'>
            <form onSubmit={handleCategory}>
                <h2>Add a New News</h2>
                <hr />
                <div className='form-group'>
                    <label htmlFor="newsTitle">Title</label>
                    <input
                        type="text"
                        id="newsTitle"
                        placeholder='News Title'
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                    />
                </div>
                <div className='form-group '>
                    <label htmlFor="newsContent">Content</label>
                    <textarea className='content-div'
                        id="newsContent"
                        placeholder='Content ...'
                        value={content}
                        onChange={(e) => setcontent(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="newsCategory">Category</label>
                    <select
    id="newsCategory"
    value={category}
    onChange={(e) => setcategory(e.target.value)}
>
    <option value="">Select Category</option>
    {categories && categories.map((category) => (
        <option key={category._id} value={category._id}>
            {category.name}
        </option>
    ))}
</select>
                </div>
                <div className='form-group'>
                    <label htmlFor="newsImage">Upload Image</label>
                    <input
                        type="file"
                        id="newsImage"
                        onChange={handleImageChange}
                    />
                </div>
                <div className='btn-category'>
                    <button type="submit" className='add-button'>Add</button>
                    <button type="button" className='add-button' onClick={() => navigate('/admin/readnews')}>Close</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Addnews;
