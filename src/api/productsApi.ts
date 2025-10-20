import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, PRODUCTS_ENDPOINT } from "../config/apiConfig";
import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

export const productsApi = createApi({
   reducerPath: "productsApi",
   baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
   endpoints: (
      build: EndpointBuilder<BaseQueryFn, unknown, "productsApi">
   ) => ({
      getProducts: build.query({
         query: () => PRODUCTS_ENDPOINT,
      }),
      getProductById: build.query({
         query: (id: string | number) => `${PRODUCTS_ENDPOINT}/${id}`,
      }),
   }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
