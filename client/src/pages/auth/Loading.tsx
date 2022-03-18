import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
