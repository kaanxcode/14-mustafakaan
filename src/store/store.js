// store.js

import { configureStore } from '@reduxjs/toolkit';
import welcomeScreenReducer from '../screens/auth/WelcomeScreenSlice';
import emailReducer from '../screens/auth/EmailSlice';
import passwordScreenReducer from '../screens/auth/PasswordScreenSlice';
import homeScreenReducer from '../screens/home/HomeScreenSlice';
import categoryHomeReducer from '../screens/home/CategoryHomeSlice';
import shoppingReducer from '../screens/home/ShoppingSlice';
import MyWalletHopiPay from '../screens/home/MyWalletHopiPaySlice';

const rootReducer = {
  welcomescreen: welcomeScreenReducer,
  email: emailReducer,
  passwordScreen: passwordScreenReducer,
  homescreen: homeScreenReducer,
  categoryhome: categoryHomeReducer,
  shopping: shoppingReducer,
  mywallethopipay: MyWalletHopiPay,
};

const store = configureStore({
  reducer: rootReducer,
  // middleware, devTools ve diğer konfigürasyon seçeneklerini ekleyebilirsiniz
});

export default store;
