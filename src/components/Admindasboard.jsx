import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './admin.css';
import adminimg from './images/admin.png';

const Admindashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    // Close sidebar if clicked outside of it
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.hamburger-menu')) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className={`admin-dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="logo-container">
          <img src={adminimg} alt="Logo" className="logo" />
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to='/admin/dasboard'><i className="icon-class-for-dashboard"></i> Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to='/login'><i className="icon-class-for-login"></i> Login</Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/category'><i className="icon-class-for-category"></i> Category</Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/manageuser'><i className="icon-class-for-manage-user"></i> Manage User</Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/add-news'><i className="icon-class-for-add-news"></i> Add News</Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/readnews'><i className="icon-class-for-add-news"></i> Read News</Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/add-category'><i className="icon-class-for-add-category"></i> Add Category</Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/report'><i className="icon-class-for-add-category"></i> Report</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admindashboard;
