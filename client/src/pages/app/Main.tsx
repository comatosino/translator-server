import { Box, Typography } from "@mui/material";
import { Microphone } from "../../hooks/useSpeechToText/types";
import { Speaker } from "../../hooks/useTextToSpeech/types";
import { MuiLists } from "./Translator";

const Main: React.FC<{
  microphone: Microphone;
  speaker: Speaker;
  src: MuiLists["srcCodeList"];
  trg: MuiLists["trgCodeList"];
}> = ({ microphone, speaker, src, trg }): JSX.Element => {
  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>MIC</Typography>
    </Box>
  );
};

export default Main;
