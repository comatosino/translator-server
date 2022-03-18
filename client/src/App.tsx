import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getUser } from "./store/userSlice/thunks";
import { setFetching } from "./store/userSlice";

import { Profile } from "./pages/auth/";
import { Container } from "@mui/material";
import Loading from "./pages/auth/Loading";

const App: React.FC = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const fetchingUser = useAppSelector((state) => state.user.fetching);

  useEffect(() => {
    const token = localStorage.getItem("translator-token");
    if (token) userDispatch(getUser());
    else userDispatch(setFetching(false));
  }, [userDispatch]);

  return (
    <Container maxWidth="sm">{fetchingUser ? <Loading /> : <Profile />}</Container>
  );
};

export default App;
