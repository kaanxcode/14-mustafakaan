import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getShoppingData } from '../../services/api'; // Projeye özgü API servis fonksiyonları ile değiştirin

export const fetchShoppingData = createAsyncThunk('shopping/fetchShoppingData', async () => {
  const shoppingData = await getShoppingData(); // Gerçek API isteği ile değiştirin
  return shoppingData;
});

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    paginatedCarouselData: [], // İhtiyaca göre diğer verileri ekleyin
    shoppingCarouselData: [],
    phonesData: [],
    androidPhonesData: [],
    applePhonesData: [],
  },
  reducers: {
    // İhtiyaca göre ekstra reducer'ları ekleyebilirsiniz
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingData.fulfilled, (state, action) => {
        // Verileri ilgili reducer'lara yerleştirin
        state.paginatedCarouselData = action.payload.paginatedCarouselData;
        state.shoppingCarouselData = action.payload.shoppingCarouselData;
        state.phonesData = action.payload.phonesData;
        state.androidPhonesData = action.payload.androidPhonesData;
        state.applePhonesData = action.payload.applePhonesData;
      })
      .addCase(fetchShoppingData.rejected, (state, action) => {
        console.error('Alışveriş verilerini getirme hatası:', action.error.message);
      });
  },
});

export default shoppingSlice.reducer;
