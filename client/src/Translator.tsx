import React, { useCallback, useEffect, useState } from "react";

import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import useSpeechToText from "./hooks/useSpeechToText";
import useTextToSpeech from "./hooks/useTextToSpeech";
import { useAppDispatch } from "./store/hooks";

import { Auth, Main, Options } from "./pages";

import { getUser, logout } from "./store/userSlice/thunks";

const Translator: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("translator-token");
    if (token) {
      console.log("TOKEN FOUND: AUTHORIZING...");
      dispatch(getUser());
    } else {
      console.log("NO TOKEN");
    }
  }, [dispatch]);

  const { speechToTextAvailable, useSpeechToTextOptions, microphone } =
    useSpeechToText();
  const { textToSpeechAvailable, useTextToSpeechOptions, speaker, muiLists } =
    useTextToSpeech();

  const [pageIdx, setPage] = useState<number>(9);
  const [translation, setTranslation] = useState<string>("");

  const srcLang = useSpeechToTextOptions[0].lang;
  const trgLang = useTextToSpeechOptions[0].voice.substring(0, 5);

  const startListening = (): void => {
    setTranslation("");
    microphone.listen();
  };

  const translate = useCallback(
    async (text: string) => {
      try {
        console.log("TRANSLATE");
        console.log(text);
        console.log(`FROM ${srcLang} TO ${trgLang}`);
      } catch (error) {
        console.log(error);
      }
    },
    [srcLang, trgLang]
  );

  useEffect(() => {
    if (microphone.transcript) {
      translate(microphone.transcript);
    }
  }, [microphone.transcript, translate]);

  useEffect(() => {
    if (translation) {
      const options = useTextToSpeechOptions[0];
      speaker.speak(translation, options);
      setTranslation("");
    }
  }, [speaker, translation, useTextToSpeechOptions]);

  if (!speechToTextAvailable || !textToSpeechAvailable) {
    return (
      <>
        {!speechToTextAvailable && (
          <Typography> Speech Recognition not available</Typography>
        )}
        {!textToSpeechAvailable && (
          <Typography>Speech Synthesis not available</Typography>
        )}
      </>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const getPage = () => {
    switch (pageIdx) {
      case 0:
        return <Main startListening={startListening} />;
      case 1:
        return (
          <Options
            voicesReady={speaker.voicesReady}
            useSpeechToTextOptions={useSpeechToTextOptions}
            useTextToSpeechOptions={useTextToSpeechOptions}
            muiLists={muiLists}
          />
        );
      case 9:
        return <Auth />;
      default:
        return <Typography>Something went wrong...</Typography>;
    }
  };

  return (
    <Container fixed maxWidth="sm">
      {getPage()}

      <Button onClick={handleLogout}>logout</Button>

      <Paper sx={{ width: "auto" }} elevation={3}>
        <BottomNavigation
          showLabels
          value={pageIdx}
          onChange={(
            _e: React.SyntheticEvent<Element, Event>,
            value: number
          ) => {
            setPage(value);
          }}
        >
          <BottomNavigationAction label="Main" />
          <BottomNavigationAction label="Options" />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default Translator;
