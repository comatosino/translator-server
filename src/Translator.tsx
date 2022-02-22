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
    <Container fixed maxWidth="sm">
      <Paper elevation={5}>
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
