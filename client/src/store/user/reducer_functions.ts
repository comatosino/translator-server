import { User, UserState } from "../../types/User";

export const setUser = (state: UserState, payload: User) => {
  const user = payload;
  return { ...state, ...user };
};

export const setFetchingStatus = (state: UserState, payload: boolean) => {
  const status = payload;
  return { ...state, fetching: status };
};
