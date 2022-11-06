import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, API_URL } from "../../Config/config.constant";


export const treatmentsApi = createApi({
    reducerPath: 'treatmentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/treatments/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN);

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["TreatmentsApi"],
    endpoints: (builder) => ({
        getTreatmentsByBranch: builder.query({
            query: ({ branchId }) => ({
                url: `branch/${branchId}`,
                method: 'GET'
            }),
            providesTags: ['TreatmentsApi']
        }),
        getTreatmentsByEmployee: builder.query({
            query: ({ selectedBranch }) => ({
                url: `branch/${selectedBranch?.id}/employee/${selectedBranch?.employeeId}`,
                method: 'GET'
            }),
            providesTags: ['TreatmentsApi']
        }),
        
    })
})

export const {
    useGetTreatmentsByBranchQuery, 
    useGetTreatmentsByEmployeeQuery
} = treatmentsApi;