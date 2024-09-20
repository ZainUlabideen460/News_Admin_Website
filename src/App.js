import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admindasboard from './components/Admindasboard';
import Login from './components/Login';
import Category from './components/Categry';
import AddCategory from './components/Addcategory';
import Dasboard from './components/Dasboard';
import Addnews from './components/Addnews';
import Readnews from './components/Readnews';
import Updatecategory from './components/Updatecategory';
import Updatenews from './components/Updatenews';
import Manageuser from './components/Manageuser';
import Report from './components/Report';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admindasboard />}>
          <Route path="dasboard" element={<Dasboard />} />
          <Route path="category" element={<Category />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-news" element={<Addnews />} />
          <Route path="readnews" element={<Readnews />} />
          <Route path="categories/update/:id" element={<Updatecategory />} />
          <Route path="news/update/:id" element={<Updatenews />} />
          <Route path="manageuser" element={<Manageuser />} />
          <Route path="report" element={<Report/>} />

        </Route>
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;