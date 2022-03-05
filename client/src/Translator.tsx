import React, { useCallback, useEffect, useState } from "react";

import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from "@mui/material";

import useSpeechToText from "./hooks/useSpeechToText";
import useTextToSpeech from "./hooks/useTextToSpeech";

import { Auth, Main, Options } from "./pages";
import API from "./utils/API";

const Translator: React.FC = (): JSX.Element => {
  const { speechToTextAvailable, useSpeechToTextOptions, microphone } =
    useSpeechToText();
  const { textToSpeechAvailable, useTextToSpeechOptions, speaker, muiLists } =
    useTextToSpeech();

  const [pageIdx, setPageIdx] = useState<number>(9);
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
        const response = await API.translate(srcLang, trgLang, text);
        console.log(response);
        // const result = response.data.data.translations[0].translatedText;
        // setTranslation(result);
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

      <Paper sx={{ width: "auto" }} elevation={3}>
        <BottomNavigation
          showLabels
          value={pageIdx}
          onChange={(
            _e: React.SyntheticEvent<Element, Event>,
            value: number
          ) => {
            setPageIdx(value);
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
