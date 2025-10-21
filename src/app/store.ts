import { Middleware, configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";

export const store = configureStore({
   reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
   },

   middleware: (getDefaultMiddleware: () => MiddlewareArray<Middleware>) =>
      getDefaultMiddleware().concat(productsApi.middleware),
});
