// HomeScreenSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCampaings, getBanners } from '../../services/api'; // Projeye özgü API servis fonksiyonları ile değiştirin

export const fetchCampaigns = createAsyncThunk('homescreen/fetchCampaigns', async () => {
  const campaigns = await getCampaings(); // Gerçek API isteği ile değiştirin
  return campaigns;
});

export const fetchBanners = createAsyncThunk('homescreen/fetchBanners', async () => {
  const banners = await getBanners(); // Gerçek API isteği ile değiştirin
  return banners;
});

const homeScreenSlice = createSlice({
  name: 'homescreen',
  initialState: {
    cards: [],
    banners: [],
  },
  reducers: {
    // İhtiyaca göre ekstra reducer'ları ekleyebilirsiniz
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        console.error('Kampanya getirme hatası:', action.error.message);
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        console.error('Banner getirme hatası:', action.error.message);
      });
  },
});

export default homeScreenSlice.reducer;
