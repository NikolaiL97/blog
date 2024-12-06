import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: null,
  articlesCount: 0,
  loader: true,
  page: 1,
  articleSlug: null,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addToArticles: (state, { payload }) => {
      const { articles, articlesCount } = payload;
      return {
        ...state,
        articles,
        articlesCount,
        loader: false,
      };
    },
    getPage(state, { payload }) {
      return {
        ...state,
        page: payload,
      };
    },
    getArticleSlug(state, { payload }) {
      return {
        ...state,
        articleSlug: payload,
      };
    },
  },
});

export const articlesReducer = articlesSlice.reducer;
export const { addToArticles, getPage, getArticleSlug } = articlesSlice.actions;
