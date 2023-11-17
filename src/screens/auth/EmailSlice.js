// slices/EmailSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';

// Firebase'ten kullanıcıya e-posta gönderecek async thunk
export const sendEmail = createAsyncThunk('email/sendEmail', async (email) => {
  // Firebase işlemleri burada yapılacak
  // Örneğin, Firebase Auth kullanarak e-posta gönderme işlemi:
  // await auth.sendSignInLinkToEmail(email, actionCodeSettings);
});

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Action creators'ları export etmek istiyorsanız:
// export const { } = emailSlice.actions;

export const selectStatus = (state) => state.email.status;
export const selectError = (state) => state.email.error;

export default emailSlice.reducer;
