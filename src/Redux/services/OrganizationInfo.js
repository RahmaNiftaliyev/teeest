import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../Config/config.constant";

export const getOrganizationInfo = createApi({
    reducerPath: "getOrganizationInfo",
    baseQuery: fetchBaseQuery({
      baseUrl: `${API_URL}/organizations/`
    }),
  
    tagTypes: ["OrganizationInfo"],
    endpoints: (builder) => ({
      getOrganizationInfo: builder.query({
        query: (slug) => ({
          url: `/${slug}/info`,
          method: "GET",
        }),
        providesTags: ["OrganizationInfo"],
      }),
    }),
  });
  
  export const { useGetOrganizationInfoQuery } = getOrganizationInfo;