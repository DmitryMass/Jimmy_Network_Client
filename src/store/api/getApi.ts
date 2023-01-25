import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const URL = 'http://localhost:3005';
const URL = 'https://jimmy-network-server.onrender.com';

export const getUserApi = createApi({
  reducerPath: 'getUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    getUser: build.query({
      query: (body) => ({
        url: `/users/${body.userId}`,
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
        url: `/users/${body.userId}/friends`,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
  }),
});

export const getPostsApi = createApi({
  reducerPath: 'getPostsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: (body) => ({
        url: '/posts',
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
    getUserPosts: build.query({
      query: (body) => ({
        url: `/posts/${body.userId}/posts`,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetUserPostsQuery } = getPostsApi;
export const { useGetUserQuery, useLazyGetUserQuery } = getUserApi;
export const { useGetFriendsQuery } = getFriendsApi;
