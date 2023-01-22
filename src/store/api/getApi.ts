import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'http://localhost:3005/users';

export const getUserApi = createApi({
  reducerPath: 'getUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    getUser: build.query({
      query: (body) => ({
        url: `/${body.userId}`,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
  }),
});

export const getFriendsApi = createApi({
  reducerPath: 'getFriendsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    getFriends: build.query({
      query: (body) => ({
        url: `/${body.userId}/friends`,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery } = getUserApi;
export const { useGetFriendsQuery } = getFriendsApi;
