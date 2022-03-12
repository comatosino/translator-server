import { useMemo, useState } from "react";
import { UserProfile } from "../../store/userSlice";
import useSpeechToText from "../../hooks/useSpeechToText";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import { Main, Options, Record } from ".";
import { Box, Fab, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import Nav from "../../components/Nav";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/userSlice/thunks";

export enum Page {
  HISTORY,
  MAIN,
  OPTIONS,
}

export type MuiLists = {
  srcCodeList: string[];
  trgCodeList: { type: string; content: string; lang: string }[];
};

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

  const srcCodeList = useMemo<string[]>(() => {
    const voices = speaker.getVoiceArray();

    let result: string[] = [];
    if (voices.length) {
      const langCodes = voices.map((voice) => voice.lang);
      result = [...new Set(langCodes)];
    }
    return result;
  }, [speaker]);

  const trgCodeList = useMemo<MuiLists["trgCodeList"]>(() => {
    const voiceArr = speaker.getVoiceArray();

    let result: MuiLists["trgCodeList"] = [];
    if (voiceArr.length) {
      const voiceMap = speaker.getVoiceMap();
      const langList = Object.keys(voiceMap);

      for (let i = 0; i < langList.length; i++) {
        const langCode = langList[i];
        const langVoices = voiceMap[langCode];
        result.push({ type: "subheader", content: langCode, lang: langCode });

        for (let j = 0; j < langVoices.length; j++) {
          const voice = langVoices[j];
          result.push({ type: "item", content: voice.name, lang: voice.lang });
        }
      }
    }
    return result;
  }, [speaker]);

  if (!speechToTextAvailable || !textToSpeechAvailable) {
    return (
      <Box
        sx={{
          height: 1,
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
    <Box
      sx={{
        height: 1,
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
          microphone={microphone}
          speaker={speaker}
          src={srcCodeList}
          trg={trgCodeList}
        />
      )}
      {page === Page.OPTIONS && (
        <Options micOptions={micOptions} speakOptions={speakOptions} />
      )}
      {page === Page.HISTORY && <Record />}
    </Box>
  );
};

export default Translator;

{
  /* <FormControl fullWidth>
  <InputLabel id="tgt-lang">Target Language</InputLabel>
  <Select
    label="Target Language"
    id="tgt-lang"
    name="target"
    value={voicesReady ? ttsOpts.voice : ""}
    onChange={handleSetTargetLang}
  >
    <MenuItem value="">
      <em>Select a language and voice!</em>
    </MenuItem>

    {voicesReady &&
      muiLists.trgCodeList.map((data) => {
        if (data.type === "subheader")
          return <ListSubheader key={data.content}>{data.lang}</ListSubheader>;
        if (data.type === "item")
          return (
            <MenuItem key={data.content} value={`${data.lang} ${data.content}`}>
              {data.content}
            </MenuItem>
          );
        return (
          <MenuItem value="">
            <em></em>
          </MenuItem>
        );
      })}
  </Select>
</FormControl>; */
}
