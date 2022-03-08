import {
  useReducer,
  Reducer,
  ReducerState,
  ReducerAction,
  Dispatch,
} from "react";

const useAsyncReducer = <R extends Reducer<any, any>, I>(
  reducer: R,
  initialState: I & ReducerState<R>
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // receives either a thunk or an action
  const asyncDispatch = (action: any) => {
    if (typeof action === "function") return action(dispatch, () => state);
    dispatch(action);
  };

  return [state, asyncDispatch];
};

export default useAsyncReducer;
