import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => "/user/showme",
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
