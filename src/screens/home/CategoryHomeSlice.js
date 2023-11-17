import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../../services/api'; // Projeye özgü API servis fonksiyonları ile değiştirin

export const fetchCategories = createAsyncThunk('categoryhome/fetchCategories', async () => {
  const categories = await getCategories(); // Gerçek API isteği ile değiştirin
  return categories;
});

const categoryHomeSlice = createSlice({
  name: 'categoryhome',
  initialState: {
    categories: [],
  },
  reducers: {
    // İhtiyaca göre ekstra reducer'ları ekleyebilirsiniz
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error('Kategori getirme hatası:', action.error.message);
      });
  },
});

export default categoryHomeSlice.reducer;
