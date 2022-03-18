import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getUser } from "./store/userSlice/thunks";
import { setFetching } from "./store/userSlice";

import { Profile } from "./pages/auth/";
import { Container, Box, CircularProgress } from "@mui/material";

const App: React.FC = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const fetchingUser = useAppSelector((state) => state.user.fetching);

  useEffect(() => {
    const token = localStorage.getItem("translator-token");
    if (token) userDispatch(getUser());
    else userDispatch(setFetching(false));
  }, [userDispatch]);

  return (
    <Container sx={{height: '100%'}} maxWidth="sm">
      <Box sx={{height: '100%', position: 'relative'}}>{fetchingUser ? <CircularProgress /> : <Profile />}</Box>
    </Container>
  );
};

export default App;
