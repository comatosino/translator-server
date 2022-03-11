import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  fetching: true,
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
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setFetching, setError } = userSlice.actions;

export default userSlice.reducer;
