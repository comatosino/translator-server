import { useState } from "react";
import { UserProfile } from "../../store/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/userSlice/thunks";
import useSpeechToText from "../../hooks/useSpeechToText";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import useMuiLangLists from "../../hooks/userMuiLangLists";

import { Main, Options, Record } from ".";
import { Box, Container, Fab, Typography } from "@mui/material";

import Nav from "../../components/Nav";
import LogoutIcon from "@mui/icons-material/Logout";

export enum Page {
  HISTORY,
  MAIN,
  OPTIONS,
}

const Translator: React.FC<{ user: UserProfile }> = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const [page, setPage] = useState(Page.MAIN);

  const {
    speechToTextAvailable,
    microphone,
    options: micOptions,
  } = useSpeechToText();

  const {
    textToSpeechAvailable,
    speaker,
    options: speakOptions,
  } = useTextToSpeech();

  const [langCodes] = useMuiLangLists(speaker);

  if (!speechToTextAvailable || !textToSpeechAvailable) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!speechToTextAvailable && (
          <Typography>Speech to Text not supported on this browser</Typography>
        )}
        {!textToSpeechAvailable && (
          <Typography>Text to Speech not supported on this browser</Typography>
        )}
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fab
          onClick={() => userDispatch(logout())}
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
          }}
          color="primary"
          aria-label="add"
        >
          <LogoutIcon />
        </Fab>

        <Nav page={page} setPage={setPage} />
        {page === Page.MAIN && (
          <Main
            speaker={speaker}
            microphone={microphone}
            langCodes={langCodes}
          />
        )}
        {page === Page.OPTIONS && (
          <Options
            micOptions={micOptions}
            speakOptions={speakOptions}
            getVoices={speaker.getVoiceMap}
          />
        )}
        {page === Page.HISTORY && <Record />}
      </Box>
    </Container>
  );
};

export default Translator;
