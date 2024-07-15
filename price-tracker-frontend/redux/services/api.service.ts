// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICoinData } from "../../types/coin.type";

// Define a service using a base URL and expected endpoints
export const coinDataApi = createApi({
  reducerPath: "coinDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getRecentInfoByName: builder.query<{ data: ICoinData[] }, string>({
      query: (name) => `getRecentInfo?name=${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRecentInfoByNameQuery } = coinDataApi;
