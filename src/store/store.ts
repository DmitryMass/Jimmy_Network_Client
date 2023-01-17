import { configureStore } from '@reduxjs/toolkit';
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

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['posts'],
};
const persistedReducer = persistReducer(persistConfig, authSliceReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// {
//   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// },
export const persister = persistStore(store);
export default store;
export type TypeRootState = ReturnType<typeof store.getState>;
