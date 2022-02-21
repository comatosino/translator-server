import React, { useState } from "react";

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

const Translator: React.FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);

  const [speechToTextAvailable, speechToText, useSttOptions] =
    useSpeechToText();

  const [
    textToSpeechAvailable,
    textToSpeech,
    useTtsOptions,
    voicesReady,
    langCodeList,
    MUIvoiceDisplayList,
  ] = useTextToSpeech();

  const srcLang = useSttOptions[0].lang;
  const trgLang = useTtsOptions[0].voice.substring(0, 5);

  return speechToTextAvailable && textToSpeechAvailable ? (
    <Container>
      {page === 0 ? (
        <Main
          textToSpeech={textToSpeech}
          speechToText={speechToText}
          src={srcLang}
          trg={trgLang}
        />
      ) : (
        <Options
          voicesReady={voicesReady}
          langCodeList={langCodeList}
          MUIvoiceDisplayList={MUIvoiceDisplayList}
          useSttOptions={useSttOptions}
          useTtsOptions={useTtsOptions}
        />
      )}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={page}
          onChange={(_, newValue) => {
            setPage(newValue);
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
