import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../Config/config.constant";

export const blockTimesApi = createApi({
  reducerPath: 'blockTimesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  tagTypes: ['BlockTimesApi'],
  endpoints: (builder) => ({
    getBlockTimes: builder.mutation({
      query: (payload) => ({
        url: `block-times/employee`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['BlockTimesApi']
    }),
  })
})

export const { useGetBlockTimesMutation } = blockTimesApi;