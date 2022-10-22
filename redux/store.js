import {configureStore} from '@reduxjs/toolkit';
import {logReducer} from './Login.reducers';

export const reducers = {
  login: logReducer,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
