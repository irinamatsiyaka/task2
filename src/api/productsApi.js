import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, PRODUCTS_ENDPOINT } from "../config/apiConfig";

export const productsApi = createApi({
   reducerPath: "productsApi",
   baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
   endpoints: (build) => ({
      getProducts: build.query({
         query: () => PRODUCTS_ENDPOINT,
      }),
      getProductById: build.query({
         query: (id) => `${PRODUCTS_ENDPOINT}/${id}`,
      }),
   }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
