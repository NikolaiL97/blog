import { combineReducers } from '@reduxjs/toolkit';

import { articlesReducer } from './articlesSlice/articlesSlice';
import { userReducer } from './userSlice/userSlice';
import { articleSlugReducer } from './articleSlugSlice/articleSlug';

const rootReducer = combineReducers({
  article: articlesReducer,
  user: userReducer,
  articleSlug: articleSlugReducer,
});

export default rootReducer;
