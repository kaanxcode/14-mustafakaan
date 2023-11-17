// slices/PasswordScreenSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

// Firebase'ten kullanıcıya giriş yapacak async thunk
export const signInUser = createAsyncThunk('passwordScreen/signInUser', async ({ email, password }) => {
  let signInMethods = await fetchSignInMethodsForEmail(auth, email);

  if (signInMethods.length > 0) {
    await signInWithEmailAndPassword(auth, email, password);
  } else {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
  }
});

const passwordScreenSlice = createSlice({
  name: 'passwordScreen',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectStatus = (state) => state.passwordScreen.status;
export const selectError = (state) => state.passwordScreen.error;

export default passwordScreenSlice.reducer;
