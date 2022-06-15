import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authRedux";
import newsLetterRedux from "./newsLetter/newsLetterRedux";
import productsRedux from "./product/productsRedux";
import productRedux from "./product/productRedux";
import userRedux from "./user/userRedux";
import cartRedux from "./cart/cartRedux";
import newOrderRedux from "./order/newOrderRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  newsLetter: newsLetterRedux,
  products: productsRedux,
  product: productRedux,
  user: userRedux,
  cart: cartRedux,
  newOrder: newOrderRedux
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default configureStore({
//   reducer: {
//     cart: cartReducer,
//     user: userReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
