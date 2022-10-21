import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import initialState from './initialState';
import {config} from 'process';
import {configureStore} from '@reduxjs/toolkit';
import {logReducer} from './Login.reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, initialState);

// export type RootState = ReturnType<typeof store.getState>;
// export const persistor = persistStore(store);

export const reducers = {
  login: logReducer,
};

export const store = configureStore({
  reducer: reducers,
});

export default store;
