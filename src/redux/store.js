import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import newsLetterRedux from "./newsLetterRedux";
import cartRedux from "./cartRedux";

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
  user: userReducer,
  newsLetter: newsLetterRedux,
  cart: cartRedux
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
