import React, { useEffect } from 'react'
import './Dasboard.css'
import { useDispatch, useSelector } from 'react-redux'
 // Import your actions here
import { readcategory, readnews, readUsers,readreport } from '../features/Detailsdata';

const Dashboard = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.app.categories);
  const posts = useSelector((state) => state.app.news);
  const users = useSelector((state) => state.app.users);
  const reports = useSelector((state) => state.app.reports);


  useEffect(() => {
    // Dispatch actions to fetch the latest data when the component mounts
    dispatch(readcategory());
    dispatch(readUsers());
    dispatch(readnews());
    dispatch(readreport());

  }, [dispatch]);

  return (
    <div>
      <h2 className='zz'>Admin Dashboard</h2>
      <div className='main-div-card'>
        <div className='one-div-card'>
          <h2>Users</h2>
          <p>Total users </p>
          <h4>{users.length}</h4>
        </div>
        <div className='one-div-card'>
          <h2>Reports</h2>
          <p>Total Reports </p>
          <h4>{reports.length}</h4>
        </div>
        <div className='one-div-card'>
          <h2>Category</h2>
          <p>Total categories </p>
          <h4>{categories.length}</h4>
        </div>
        <div className='one-div-card'>
          <h2>Post</h2>
          <p>Total posts</p>
          <h4>{posts.length}</h4>
        </div>
        {/* <div className='one-div-card'>
          <h2>Transaction</h2>
          <p>Total Transactions in app</p>
          <h4>0</h4>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
