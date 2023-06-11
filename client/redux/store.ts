import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/auth';
import authReducer from '../features/auth/authSlice'
import { userApi } from '@/services/user';
import { emptySplitApi } from '@/services/base';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch