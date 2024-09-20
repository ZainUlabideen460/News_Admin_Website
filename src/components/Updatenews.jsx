    import React, { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { useNavigate, useParams } from 'react-router-dom';
    import { updatenews } from '../features/Detailsdata';

    const Updatenews = () => {
        const dispatch = useDispatch();
        const { id } = useParams();
        const { news, categories } = useSelector(state => state.app);
        const [updatenew, setnews] = useState({});
        const navigate = useNavigate();
        const [newsImage, setimage] = useState(null);

        useEffect(() => {
            if (id && Array.isArray(news)) {
                const findNews = news.find(n => n._id === id);
                if (findNews) {
                    setnews(findNews);
                }
            }
        }, [id, news]);

        const handleInputChange = (e) => {
            setnews({ ...updatenew, [e.target.name]: e.target.value });
        };

        const handleCategory = async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
           
            if (!token) {
              console.error('User is not authenticated');
              return; // Redirect to login or show a message
            }
           
            try {
              await dispatch(updatenews({ 
                id: updatenew._id, 
                title: updatenew.title, 
                content: updatenew.content,
                token
              })).unwrap();
              navigate('/admin/readnews');
            } catch (error) {
              if (error && error.message && error.message.includes('401')) {
                console.error('Unauthorized: You need to log in again');
              } else if (error) {
                console.error('Error updating news:', error.message); // Log the actual error message
              } else {
                console.error('Unknown error occurred');
              }
            }
          };
        

        const handleImageChange = (e) => {
            setimage(e.target.files[0]);
        };

        return (
            <div>
                <form onSubmit={handleCategory}>
                    <h2>Update News</h2>
                    <hr />
                    <div className='form-group'>
                        <label htmlFor="newsTitle">Title</label>
                        <input
                            type="text"
                            id="newsTitle"
                            name="title"
                            placeholder='News Title'
                            onChange={handleInputChange}
                            value={updatenew.title || ''}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="newsContent">Content</label>
                        <textarea
                            id="newsContent"
                            name="content"
                            placeholder='Content ...'
                            onChange={handleInputChange}
                            value={updatenew.content || ''}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="newsCategory">Category</label>
                        <select
                            id="newsCategory"
                            name="category"
                            onChange={handleInputChange}
                            value={updatenew.category || ''}
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
                        <button type="submit" className='add-button'>Update</button>
                        <button type="button" className='add-button' onClick={() => navigate('/readnews')}>Close</button>
                    </div>
                </form>
            </div>
        );
    };

    export default Updatenews;
