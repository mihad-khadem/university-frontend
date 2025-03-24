import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { useAppSelector } from "../../redux.hooks";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
type TAuthState = {
  user: Record<string, TUser> | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
// export action
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = () =>
  useAppSelector((state: RootState) => state.auth.token);
export const useCurrentUser = () =>
  useAppSelector((state: RootState) => state.auth.user);
