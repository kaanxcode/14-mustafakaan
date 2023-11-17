// src/slices/homeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCampaings, getBanners } from '../../../services/api';

// Thunk ile kampanya verilerini getirme
export const fetchCampaigns = createAsyncThunk('home/fetchCampaigns', async () => {
  const campaigns = await getCampaings();
  return campaigns;
});

// Thunk ile banner verilerini getirme
export const fetchBanners = createAsyncThunk('home/fetchBanners', async () => {
  const banners = await getBanners();
  return banners;
});

const homeSlice = createSlice({
    name: 'home',
    initialState: {
      cards: [],
      banners: [],
      status: 'idle',
      error: null,
    },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCards = (state) => state.home.cards;
export const selectBanners = (state) => state.home.banners;
export const selectStatus = (state) => state.home.status;
export const selectError = (state) => state.home.error;

export default homeSlice.reducer;
