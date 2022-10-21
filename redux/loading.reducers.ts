import {createReducer} from '@reduxjs/toolkit';
import {show, hide} from './loading.action';
export const loadingReducer = createReducer({}, builder => {
  builder.addCase(show, () => {
    return {show: true};
  });
  builder.addCase(hide, () => {
    return {};
  });
});
