import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, API_URL } from "../../Config/config.constant";

export const salonsApi = createApi({
  reducerPath: "salonsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Salons"],
  endpoints: (builder) => ({
    getSalons: builder.query({
      query: () => ({
        url: `report/landing-page/organizations`,
        method: "GET",
      }),
      providesTags: ["Salons"],
    }),
    addFavoriteSalons: builder.mutation({
      query: ({ id, type }) => ({
        method: "POST",
        url: `clients/favorite/${id}/${type}`,
      }),
      invalidatesTags: ["Salons"],
    }),
    removeFavoriteSalons: builder.mutation({
      query: ({ id, type }) => ({
        method: "DELETE",
        url: `clients/favorite/${id}/${type}`,
      }),
      invalidatesTags: ["Salons"],
    }),
  }),
});

export const {
  useGetSalonsQuery,
  useAddFavoriteSalonsMutation,
  useRemoveFavoriteSalonsMutation,
} = salonsApi;
