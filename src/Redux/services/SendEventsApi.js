import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../Config/config.constant";


export const sendEventsApi = createApi({
    reducerPath: "sendEventsApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${API_URL}/events`,
    }),
    tagTypes: ["sendEventsApi"],
    endpoints: (builder) => ({
      sendEvent: builder.mutation({
        query: ({data, header}) => ({
          method: "POST",
          body: data,
          headers: header
        })
      })
    })
  });

  export const { useSendEventMutation } = sendEventsApi;
