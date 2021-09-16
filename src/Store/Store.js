import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import accountSlice from './Slices/accountSlice';
import caseSlice from './Slices/caseSlice';
import patientSlice from './Slices/patientSlice';

const reducer = combineReducers({
  Account: accountSlice,
  Patient: patientSlice,
  Case: caseSlice,

})

const store = configureStore({
    reducer,
});

export default store;