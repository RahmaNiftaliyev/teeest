import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, API_URL } from "../../Config/config.constant";

export const salonBranchesApi = createApi({
    reducerPath: 'salonBranchesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN);

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["SalonBranches"],
    endpoints: (builder) => ({
        getSalonBranches: builder.query({
            query: ({ slug }) => ({
                url: `organizations/${slug}/branches`,
                method: 'GET'
            }),
            providesTags: ['SalonBranches']
        }),
    })
})

export const {
    useGetSalonBranchesQuery
} = salonBranchesApi;