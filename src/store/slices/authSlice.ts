import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RoleType, User } from '../../types/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const getInitialState = (): AuthState => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const role = localStorage.getItem('userRole') as RoleType | null;
  const username = localStorage.getItem('username') || '';

  if (isAuth && role) {
    return {
      isAuthenticated: true,
      user: { username, role },
    };
  }

  return {
    isAuthenticated: false,
    user: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', action.payload.role);
      localStorage.setItem('username', action.payload.username);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
