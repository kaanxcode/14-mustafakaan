import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHopiPayImage, getHopiPayButtonImage } from '../../services/firebase'; // Firebase servis fonksiyonları ile değiştirin
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';

export const fetchHopiPayImage = createAsyncThunk('mywallethopipay/fetchHopiPayImage', async () => {
  const storageRef = ref(storage, 'screen/HopipayCard.png');
  try {
    const hopiPayImageURL = await getDownloadURL(storageRef);
    return hopiPayImageURL;
  } catch (error) {
    console.error('HopiPay resmini alma hatası:', error);
    throw error;
  }
});

export const fetchHopiPayButtonImage = createAsyncThunk('mywallethopipay/fetchHopiPayButtonImage', async () => {
  const storageRefButton = ref(storage, 'screen/button.jpg');
  try {
    const hopiPayButtonImageURL = await getDownloadURL(storageRefButton);
    return hopiPayButtonImageURL;
  } catch (error) {
    console.error('HopiPay Button resmini alma hatası:', error);
    throw error;
  }
});
const myWalletHopiPaySlice = createSlice({
  name: 'mywallethopipay',
  initialState: {
    hopiPayImageUrl: '',
    hopiPayButtonImageUrl: '',
  },
  reducers: {
    // İhtiyaca göre ekstra reducer'ları ekleyebilirsiniz
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHopiPayImage.fulfilled, (state, action) => {
        state.hopiPayImageUrl = action.payload;
      })
      .addCase(fetchHopiPayImage.rejected, (state, action) => {
        console.error('HopiPay resmi alma hatası:', action.error.message);
      })
      .addCase(fetchHopiPayButtonImage.fulfilled, (state, action) => {
        state.hopiPayButtonImageUrl = action.payload;
      })
      .addCase(fetchHopiPayButtonImage.rejected, (state, action) => {
        console.error('HopiPayButton resmi alma hatası:', action.error.message);
      });
  },
});

export default myWalletHopiPaySlice.reducer;
