import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addTranslation } from "../../store/userSlice";
import API, { TranslationReqPayload } from "../../utils/API";
import {
  setLanguage,
  setSelectedVoice,
} from "../../hooks/useTextToSpeech/store/actions";
import { Microphone } from "../../hooks/useSpeechToText/types";
import { Speaker } from "../../hooks/useTextToSpeech/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  Stack,
  Box,
  FormHelperText,
} from "@mui/material";

import MicNoneIcon from "@mui/icons-material/MicNone";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const Main: React.FC<{
  microphone: Microphone;
  speaker: Speaker;
  langCodes: string[];
}> = ({ microphone, speaker, langCodes }): JSX.Element => {
  const userDispatch = useAppDispatch();
  const { language: srcLang, transcript } = microphone;
  const { language: trgLang } = speaker;

  const translate = useCallback(
    async (transcript: string) => {
      if (srcLang.substring(0, 2) === trgLang.substring(0, 2)) {
        speaker.speak(transcript);
      } else {
        const payload: TranslationReqPayload = {
          srcLang,
          text: transcript,
          trgLang,
        };
        const response = await API.translate(payload);
        const translation = response.data;
        speaker.speak(translation.targetText);
        userDispatch(addTranslation(translation));
      }
    },
    [speaker, srcLang, trgLang, userDispatch]
  );

  useEffect(() => {
    if (transcript) {
      translate(transcript);
    }
  }, [translate, transcript]);

  const setSourceLang = (src: string) => {
    microphone.setLanguage(src);
  };

  const handleSetSourceLang = (e: SelectChangeEvent<string>) => {
    setSourceLang(e.target.value);
  };

  const setTargetLang = (trg: string) => {
    const voices = speaker.getVoiceMap();
    if (voices) {
      const defaultVoice = voices[trg][0];
      speaker.dispatch(setLanguage(trg));
      speaker.dispatch(setSelectedVoice(defaultVoice));
    }
  };

  const handleSetTargetLang = (e: SelectChangeEvent<string>) => {
    setTargetLang(e.target.value);
  };

  const handleSwapLangs = () => {
    const srcTemp = srcLang;
    const trgTemp = trgLang;
    setSourceLang(trgTemp);
    setTargetLang(srcTemp);
  };

  const handleListen = () => {
    microphone.listen();
  };

  return (
    <Stack
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      spacing={1}
      overflow={"auto"}
      minHeight={0.8}
      maxHeight={0.8}
      padding={3}
      boxSizing={"border-box"}
    >
      <Box
        display={"flex"}
        width={1}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <FormControl variant="standard">
          <InputLabel id="src-lang">{srcLang}</InputLabel>
          <Select
            label="Source Language"
            id="src-lang"
            name="source"
            value={microphone.language || ""}
            onChange={handleSetSourceLang}
          >
            {langCodes.map((code) => {
              const [lang, country] = code.split("-");

              if (lang === "es" && country === "US") {
                return (
                  <MenuItem key={code} value={code}>
                    <img
                      loading="lazy"
                      width="75"
                      src={`https://flagcdn.com/mx.svg`}
                      alt={""}
                    />
                  </MenuItem>
                );
              }

              return (
                <MenuItem key={code} value={code}>
                  <img
                    loading="lazy"
                    width="75"
                    src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                    alt={""}
                  />
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>Source Language</FormHelperText>
        </FormControl>

        <IconButton onClick={handleSwapLangs}>
          <SwapHorizIcon />
        </IconButton>

        <FormControl variant="standard">
          <InputLabel id="src-lang">{trgLang}</InputLabel>
          <Select
            label="Target Language"
            id="trg-lang"
            name="target"
            value={speaker.language || ""}
            onChange={handleSetTargetLang}
          >
            {langCodes.map((code) => {
              const [lang, country] = code.split("-");

              if (lang === "es" && country === "US") {
                return (
                  <MenuItem key={code} value={code}>
                    <img
                      loading="lazy"
                      width="75"
                      src={`https://flagcdn.com/mx.svg`}
                      alt={""}
                    />
                  </MenuItem>
                );
              }
              return (
                <MenuItem key={code} value={code}>
                  <img
                    loading="lazy"
                    width="75"
                    src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                    alt={""}
                  />
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>Target Language</FormHelperText>
        </FormControl>
      </Box>

      <Box
        position={"absolute"}
        bottom={10}
        left={0}
        right={0}
        display={"flex"}
        justifyContent={"center"}
      >
        <IconButton onClick={handleListen} aria-label="microphone">
          <MicNoneIcon sx={{ fontSize: "5em" }} />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Main;
