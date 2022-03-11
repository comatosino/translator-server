import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import useSpeechToText from "../hooks/useSpeechToText";
import useTextToSpeech from "../hooks/useTextToSpeech";
import { useAppDispatch } from "../store/hooks";
import { UserProfile } from "../store/userSlice";
import { logout } from "../store/userSlice/thunks";

import MicNoneIcon from "@mui/icons-material/MicNone";
type TranslatorProps = { user: UserProfile };

const Translator: React.FC<TranslatorProps> = ({ user }): JSX.Element => {
  const userDispatch = useAppDispatch();

  const {
    speechToTextAvailable,
    microphone,
    transcript,
    options: micOptions,
  } = useSpeechToText();

  const {
    textToSpeechAvailable,
    speaker,
    options: speakOptions,
  } = useTextToSpeech();

  const handleLogout = () => {
    userDispatch(logout());
  };

  if (!speechToTextAvailable || !textToSpeechAvailable) {
    return (
      <>
        {!speechToTextAvailable && (
          <Typography>Speech Recognition Not Available</Typography>
        )}
        {!textToSpeechAvailable && (
          <Typography>Speech Synthesis Not Available</Typography>
        )}
      </>
    );
  }

  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Button onClick={handleLogout}>logout</Button> */}

      <IconButton aria-label="delete">
        <MicNoneIcon />
      </IconButton>
    </Box>
  );
};

export default Translator;
