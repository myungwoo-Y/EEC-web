import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store';
import { User } from '@/model/user';

type AuthState = {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null
};


const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<AuthState>
    ) => {
      if (token) {
        localStorage.setItem('token', token);
      }

      return {
        user,
        token
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
      state.token = null;
      localStorage.removeItem('token');
    }
  },
})

export const { setCredentials, removeCredentials, setUser } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user