import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../Config/config.constant";
import { logout, setCredentials } from "../features/loginSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/`,
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().login.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const newToken = await baseQuery("", api, extraOptions);
    if (newToken?.data) {
      const user = api.getState().login.user;
      // store the new token
      api.dispatch(setCredentials({ ...newToken.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const loginSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getClient: builder.query({
      query: () => ({
        url: `clients/info`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
  }),
});
