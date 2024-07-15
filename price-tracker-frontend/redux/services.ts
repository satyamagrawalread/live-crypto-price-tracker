// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICoinData } from "../type";

// Define a service using a base URL and expected endpoints
export const cryptoDataApi = createApi({
  reducerPath: "cryptoDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getRecentInfoByName: builder.query<{ data: ICoinData[] }, string>({
      query: (name) => `getRecentInfo?name=${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRecentInfoByNameQuery } = cryptoDataApi;
