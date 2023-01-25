import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const URL = 'http://localhost:3005/auth';
const URL = 'https://jimmy-network-server.onrender.com';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  tagTypes: ['Login'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    loginApi: build.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Login'],
    }),
  }),
});

export const registerApi = createApi({
  reducerPath: 'registerApi',
  tagTypes: ['Register'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    registerApi: build.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Register'],
    }),
  }),
});

export const { useLoginApiMutation } = loginApi;
export const { useRegisterApiMutation } = registerApi;
