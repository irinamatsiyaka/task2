import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
   reducerPath: "productsApi",
   baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
   endpoints: (build) => ({
      getProducts: build.query({
         query: () => "products",
      }),
      getProductById: build.query({
         query: (id) => `products/${id}`,
      }),
   }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
