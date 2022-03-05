import { Box, Button } from "@mui/material";

type MainProps = {
  startListening: () => void;
};

const Main = (props: MainProps): JSX.Element => {
  const { startListening } = props;

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={startListening}>Start Listening</Button>
    </Box>
  );
};

export default Main;
