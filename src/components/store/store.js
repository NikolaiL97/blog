import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './articles/articles';

const store = configureStore({
  reducer,
});

export default store;
