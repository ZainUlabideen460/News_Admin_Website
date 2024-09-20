import { configureStore } from '@reduxjs/toolkit';
import details from '../features/Detailsdata';
// Import your reducers here
// import userReducer from './features/user/userSlice';

const Store = configureStore({
  reducer: {
    app:details,
  },
});

export default Store;
