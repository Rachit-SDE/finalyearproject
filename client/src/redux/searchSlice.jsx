// src/redux/searchSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  source: '',
  date: '',
  destination: '',
  searchResults: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDate : (state, action) => {
      state.date = action.payload;
    }, 
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSource,
  setDestination,
  setDate,
  setSearchResults,
  setLoading,
  setCategory,
  setError,
} = searchSlice.actions;

export const selectSearchState = (state) => state.search;

export default searchSlice.reducer;
