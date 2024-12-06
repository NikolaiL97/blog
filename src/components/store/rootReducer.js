import { combineReducers } from '@reduxjs/toolkit';

import { articlesReducer } from './articlesSlice/articlesSlice';
import { userReducer } from './userSlice/userSlice';

const rootReducer = combineReducers({
  article: articlesReducer,
  user: userReducer,
});

export default rootReducer;
