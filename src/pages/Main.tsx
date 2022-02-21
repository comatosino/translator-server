import { Box, Button, Stack } from "@mui/material";

const Main = (props) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => {
          alert("clicked");
        }}
      >
        Start Listening
      </Button>
    </Box>
  );
};

export default Main;
