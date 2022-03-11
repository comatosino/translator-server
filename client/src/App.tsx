import {  useEffect } from "react";
import { Loading, Profile } from "./pages";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setFetching } from "./store/userSlice";
import { getUser } from "./store/userSlice/thunks";

const App: React.FC = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const fetching = useAppSelector((state) => state.user.fetching);

  useEffect(() => {
    const token = localStorage.getItem("translator-token");
    if (token) userDispatch(getUser());
    else userDispatch(setFetching(false));
  }, [userDispatch]);

  return fetching ? <Loading /> : <Profile />;
};

export default App;
