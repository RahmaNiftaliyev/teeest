import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, API_URL } from "../../Config/config.constant";

export const statisticApi = createApi({
  reducerPath: "statisticApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/report/landing-page/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Statistics"],
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => ({
        url: `statistics`,
        method: "GET",
      }),
      providesTags: ["Statistic"],
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticApi;
