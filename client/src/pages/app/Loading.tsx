import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = (): JSX.Element => {
  return (
    <Box
      sx={{
        height: 1,
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
