import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userRedux from "./user/userRedux";
import newsLetterRedux from "./newsLetter/newsLetterRedux";
import productsRedux from "./product/productsRedux";
import cartRedux from "./cart/cartRedux";
import newOrderRedux from "./order/newOrderRedux";
import myOrderRedux from "./order/myOrderRedux";
import reviewRedux from "./product/reviewRedux";

const reducer = combineReducers({
  user: userRedux,
  newsLetter: newsLetterRedux,
  products: productsRedux,
  cart: cartRedux,
  newOrder: newOrderRedux,
  myOrders: myOrderRedux,
  review: reviewRedux
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// Redux Persist  --- redux-persist --- use local storage === redux-thunk use state memory
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userRedux from "./user/userRedux";
// import newsLetterRedux from "./newsLetter/newsLetterRedux";
// import productsRedux from "./product/productsRedux";
// import cartRedux from "./cart/cartRedux";
// import newOrderRedux from "./order/newOrderRedux";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   user: userRedux,
//   newsLetter: newsLetterRedux,
//   products: productsRedux,
//   cart: cartRedux,
//   newOrder: newOrderRedux
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export let persistor = persistStore(store);
