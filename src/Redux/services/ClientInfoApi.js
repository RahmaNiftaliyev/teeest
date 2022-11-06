import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, API_URL } from "../../Config/config.constant";

export const getClientApi = createApi({
  reducerPath: "getClientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/clients/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getClient: builder.query({
      query: () => ({
        url: `info`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
  }),
});

export const { useGetClientQuery } = getClientApi;