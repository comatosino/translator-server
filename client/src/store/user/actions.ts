import { User } from "../../types/User";
import { USER_STATE_DEFAULTS } from "../../utils/DEFAULTS";

export type Action = {
  type: string;
  payload: unknown;
};

// ACTION TYPES

export const SET_USER = "GET_USER";
export const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";
export const CLEAR_USER = "CLEAR_USER";

// ACTION CREATORS

export const set_User = (user: User): Action => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const set_Fetching_Status = (isFetching: boolean): Action => {
  return {
    type: SET_FETCHING_STATUS,
    payload: isFetching,
  };
};

export const clear_User = (): Action => {
  return {
    type: CLEAR_USER,
    payload: USER_STATE_DEFAULTS,
  };
};
