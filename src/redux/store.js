import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authRedux";
import newsLetterRedux from "./newsLetter/newsLetterRedux";
import productsRedux from "./product/productsRedux";

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
  products: productsRedux
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
