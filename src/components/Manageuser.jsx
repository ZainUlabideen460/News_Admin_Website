import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readUsers, toggleUserStatus } from '../features/Detailsdata';
import './Managuser.css'

const Manageuser = () => {
    const users = useSelector(state => state.app.users);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const error = useSelector(state => state.app.error);

    useEffect(() => {
        dispatch(readUsers());
    }, [dispatch]);

    const handleToggleStatus = (id) => {
        dispatch(toggleUserStatus(id));
    };

    return (
        <div>
       <h2 className='zz azi'> Admin DashBoard</h2>

       
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <table className="category-table new">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <button onClick={() => handleToggleStatus(user._id)}>
                                        {user.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Manageuser;
