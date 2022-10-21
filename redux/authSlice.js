import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {},
    tabHostProperty: {
      enableTabHost: false,
    },
    errors: [],
    loading: false,
  },

  reducers: {
    logOut: (state, action) => {
      console.log('logout from auth slice');
      state.auth = {};
      state.tabHostProperty = {enableTabHost: false};
      state.errors = [];
    },
    resetErrors: (state, action) => {
      state.errors = [];
    },
    setTabHostProperty: (state, action) => {
      const {enableTabHost} = action.payload;
      state.tabHostProperty = {enableTabHost};
    },
  },
  extraReducers: {},
});

export const {resetErrors, setTabHostProperty, logOut} = authSlice.actions;

export const authSelector = state => state.auth;
