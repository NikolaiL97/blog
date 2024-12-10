import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchArticleSlug } from '../../../service/fetchApi';

const initialState = {
  articles: null,
  status: null,
  loading: false,
  error: null,
};

export const fetchASlug = createAsyncThunk(
  'addToArticleSlug/fetchASlug',
  async (slug) => fetchArticleSlug(slug)
);

export const articleSlugSlice = createSlice({
  name: 'articleSlug',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchASlug.pending, (state) => {
        state.status = 'loading';
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchASlug.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.articles = action.payload.article;
        state.loading = false;
      })
      .addCase(fetchASlug.rejected, (state) => {
        state.status = 'error';
        state.error = true;
        state.loading = false;
      })
      .addDefaultCase(() => {});
  },
});

export const articleSlugReducer = articleSlugSlice.reducer;
export const articleSlugAction = articleSlugSlice.actions;
