import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'http://localhost:3005';

export const addPostApi = createApi({
  reducerPath: 'addPostApi',
  tagTypes: ['AddPost'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    addPost: build.mutation({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body: body.data,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: ['AddPost'],
    }),
  }),
});

export const { useAddPostMutation } = addPostApi;
