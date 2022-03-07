import { User, UserState } from "../../types/User";
import { USER_STATE_DEFAULTS } from "../../utils/defaultOptions";
import { Action, CLEAR_USER, SET_FETCHING_STATUS, SET_USER } from "./actions";
import { setFetchingStatus, setUser } from "./reducer_functions";

const userReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action.payload as User);

    case SET_FETCHING_STATUS:
      return setFetchingStatus(state, action.payload as boolean);

    case CLEAR_USER:
      return USER_STATE_DEFAULTS;

    default:
      return state;
  }
};
export default userReducer;
