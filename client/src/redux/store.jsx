import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertsSlice from './alertsSlice';
import usersSlice from './usersSlice';
import searhSlice from './searchSlice';

const rootReducer = combineReducers({
    alerts: alertsSlice,
    users: usersSlice,
    search: searhSlice,

});

const store = configureStore({
    reducer: rootReducer,
})

export default store;