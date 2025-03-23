import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TUser = {
  id: string;
  password: string;
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
    setUser: (
      state,
      action: PayloadAction<{ user: Record<string, TUser>; token: string }>
    ) => {
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
export const useCurrentToken = () => (state: RootState) => state.auth.token;
export const selectCurrentUser = () => (state: RootState) => state.auth.user;
