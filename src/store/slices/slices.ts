import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  mode: string;
  user: null | any;
  token: string | null;
  posts: any[];
}

const initialState: IInitialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    login: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, { payload }) => {
      if (state.user) {
        state.user.friends = payload.friends;
      } else {
        console.error('User friends not-exist');
      }
    },
    setPosts: (state, { payload }) => {
      state.posts = payload.posts;
    },
    setOnePost: (state, { payload }) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === payload.post._id) {
          return payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload._id);
    },
  },
});

export const authSliceAction = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
