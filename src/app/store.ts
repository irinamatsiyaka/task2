import { configureStore, type Tuple, type Middleware } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";

type GetDefaultMiddlewareFn = () => Tuple<Middleware[]>;

export const store = configureStore({
   reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
   },
   middleware(getDefaultMiddleware: GetDefaultMiddlewareFn) {
      return getDefaultMiddleware().concat(productsApi.middleware);
   },
});
