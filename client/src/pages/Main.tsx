import { Box, Button } from "@mui/material";

// type MainProps = {
//   startListening: () => void;
// };

const Main: React.FC = (): JSX.Element => {
  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button>Start Listening</Button>
    </Box>
  );
};

export default Main;
