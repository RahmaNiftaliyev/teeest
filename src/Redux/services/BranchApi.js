import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, API_URL } from "../../Config/config.constant";

export const branchesApi = createApi({
  reducerPath: "branchesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/organizations`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
  }),
  tagTypes: ["Branches"],
  endpoints: (builder) => ({
    getBranchesByOrg: builder.query({
        query: ({ slug }) => ({
            url: `/${slug}/branches`,
            method: 'GET'
        }),
        providesTags: ['Branches']
    }),
    getBranchesByEmp: builder.query({
        query: ({ slug }) => ({
            url: `/employee/${slug}/branches`,
            method: 'GET'
        }),
      providesTags: ["Branches"],
    }),
  }),
});

export const { useGetBranchesByEmpQuery, useGetBranchesByOrgQuery } = branchesApi;