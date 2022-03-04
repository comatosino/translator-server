import React, { useCallback, useEffect, useState } from "react";

import useSpeechToText from "./hooks/useSpeechToText";
import useTextToSpeech from "./hooks/useTextToSpeech";

import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import Main from "./pages/Main";
import Options from "./pages/Options";

import API from "./utils/API";

const Translator: React.FC = (): JSX.Element => {
  const { speechToTextAvailable, useSpeechToTextOptions, microphone } =
    useSpeechToText();
  const { textToSpeechAvailable, useTextToSpeechOptions, speaker, muiLists } =
    useTextToSpeech();

  const [page, setPage] = useState<number>(0);
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

  return speechToTextAvailable && textToSpeechAvailable ? (
    <Container fixed maxWidth="sm">
      {page === 0 ? (
        <Main startListening={startListening} />
      ) : (
        <Options
          voicesReady={speaker.voicesReady}
          useSpeechToTextOptions={useSpeechToTextOptions}
          useTextToSpeechOptions={useTextToSpeechOptions}
          muiLists={muiLists}
        />
      )}
      <Paper sx={{ width: "auto" }} elevation={3}>
        <BottomNavigation
          showLabels
          value={page}
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
  ) : (
    <>
      {!speechToTextAvailable && <h1> Speech Recognition not available</h1>}
      {!textToSpeechAvailable && <h1>Speech Synthesis not available</h1>}
    </>
  );
};

export default Translator;
