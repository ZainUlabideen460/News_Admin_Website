import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createuser } from '../features/Detailsdata';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, value, error: loginError } = useSelector((state) => state.app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    const resultAction = await dispatch(createuser(userData));

    
    if (createuser.fulfilled.match(resultAction)) {
      navigate('/admin/dasboard');  // Changed from '/dasboard' to '/admin/dasboard'
    } else {
      setError(resultAction.payload || 'Failed to sign in');
    } 

    setEmail('');
    setPassword('');
  };

  return (
    <div className="sign-in-form-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        {loginError && <p className="error">{loginError}</p>}
        {loading && <p>Loading...</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
