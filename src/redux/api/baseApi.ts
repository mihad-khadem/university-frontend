import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../feature/auth/authSlice";
// base query
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("authorization", `${token}`);
    return headers;
  },
});

// Custom base query with token refresh
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log("Access token expired. Trying to refresh...");

    const refreshResult = await fetch(
      "http://localhost:5000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const refreshData = await refreshResult.json();

    if (refreshData?.data.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: refreshData.data.accessToken }));
      console.log("Refresh token successful. Got new token");
      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh token failed. Logging out...");
      api.dispatch(logout());
    }
  }

  return result;
};

// base API
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithRefreshToken,

  endpoints: () => ({}),
});
