import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, PRODUCTS_ENDPOINT } from "../config/apiConfig";
import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { Product } from "../types/product";

export const productsApi = createApi({
   reducerPath: "productsApi",
   baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
   endpoints: (build: EndpointBuilder<BaseQueryFn, string, "productsApi">) => ({
      getProducts: build.query<{ products: Product[] }, void>({
         query: () => PRODUCTS_ENDPOINT,
      }),
      getProductById: build.query<Product, string | number>({
         query: (id: string | number) => `${PRODUCTS_ENDPOINT}/${id}`,
      }),
   }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
