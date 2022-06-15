import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userRedux from "./user/userRedux";
import newsLetterRedux from "./newsLetter/newsLetterRedux";
import productsRedux from "./product/productsRedux";
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
  user: userRedux,
  newsLetter: newsLetterRedux,
  products: productsRedux,
  cart: cartRedux,
  newOrder: newOrderRedux
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
