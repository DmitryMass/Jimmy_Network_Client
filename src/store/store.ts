import { loginApi, registerApi } from './api/authApi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSliceReducer } from './slices/slices';

const userPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['posts'],
};

const reducers = combineReducers({
  authSlice: persistReducer(userPersistConfig, authSliceReducer),
  [loginApi.reducerPath]: loginApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loginApi.middleware, registerApi.middleware),
});

export const persister = persistStore(store);
export default store;
export type TypeRootState = ReturnType<typeof store.getState>;
