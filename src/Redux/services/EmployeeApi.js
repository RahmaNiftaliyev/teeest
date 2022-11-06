import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, API_URL } from "../../Config/config.constant";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => ({
        url: `report/landing-page/employees`,
        method: "GET",
      }),
      providesTags: ["Employees"],
    }),
    addFavoriteEmployee: builder.mutation({
      query: ({ id, type }) => ({
        method: "POST",
        url: `clients/favorite/${id}/${type}`,
      }),
      invalidatesTags: ["Employees"],
    }),
    removeFavoriteEmployee: builder.mutation({
      query: ({ id, type }) => ({
        method: "DELETE",
        url: `clients/favorite/${id}/${type}`,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddFavoriteEmployeeMutation,
  useRemoveFavoriteEmployeeMutation,
} = employeeApi;
