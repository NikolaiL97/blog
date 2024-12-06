import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emailAddress: null,
  username: null,
  password: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToUser: (state, { payload }) => {
      const { emailAddress, username, password } = payload;
      return {
        ...state,
        emailAddress,
        username,
        password,
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
