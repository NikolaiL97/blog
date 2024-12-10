/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

let initialStateStorage = {};

user
  ? (initialStateStorage = {
      username: user.username,
      email: user.email,
      token: user.token,
      password: null,
      image: user.image,
    })
  : null;
const initialStateNull = {
  username: null,
  email: null,
  token: null,
  password: null,
  image: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: user ? initialStateStorage : initialStateNull,
  reducers: {
    addToUser: (state, { payload }) => {
      const { username, email, token, password, image } = payload;
      return {
        ...state,
        username,
        email,
        token: JSON.stringify(token),
        password,
        image,
      };
    },
    logOutUser: (state) => ({
      ...state,
      username: null,
      email: null,
      token: null,
      password: null,
      image: null,
    }),
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
