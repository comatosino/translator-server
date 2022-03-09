import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface UserProfile {
  username?: string;
}

export interface UserState extends UserProfile {
  profile: UserProfile | null;
  error: string;
  fetching: boolean;
}

export const initialState: UserState = {
  profile: null,
  error: "",
  fetching: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
    },
    setFetchingStatus: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setFetchingStatus } = userSlice.actions;
export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
