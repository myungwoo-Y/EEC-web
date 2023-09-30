import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store';
import { User } from '@/model/user';
import { deleteCookie } from 'cookies-next';

type AuthState = {
  user: User | null
}

const initialState: AuthState = {
  user: null,
};


const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user } }: PayloadAction<AuthState>
    ) => {
      return {
        user,
      }
    },
    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: User }>
    ) => {
      return {
        ...state,
        user,
      }
    },
    removeCredentials: (state) => {
      state.user = null;
      alert('로그아웃 되었습니다.');
      window.location.href = '/';
    }
  },
})

export const { setCredentials, removeCredentials, setUser } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user