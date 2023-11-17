// WelcomeScreenSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';

export const fetchImageUrl = createAsyncThunk('welcomescreen/fetchImageUrl', async () => {
  const storageRef = ref(storage, 'screen/HosgeldinEkrani.png');
  const url = await getDownloadURL(storageRef);
  return url;
});

const welcomeScreenSlice = createSlice({
  name: 'welcomescreen',
  initialState: {
    imageUrl: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Eğer başka reducer'lar eklemek isterseniz buraya ekleyebilirsiniz
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageUrl.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImageUrl.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrl = action.payload;
      })
      .addCase(fetchImageUrl.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { } = welcomeScreenSlice.actions;
export const selectImageUrl = (state) => state.welcomescreen.imageUrl;
export const selectStatus = (state) => state.welcomescreen.status;
export const selectError = (state) => state.welcomescreen.error;

export default welcomeScreenSlice.reducer;
