import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface UserProfile {
  username?: string;
}

export interface UserState {
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

// ACTIONS
export const { setUser, clearUser, setFetchingStatus } = userSlice.actions;

// SELECTORS
export const selectUserProfile = (state: RootState) => state.user.profile;

export default userSlice.reducer;
