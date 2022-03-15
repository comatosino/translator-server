import { Microphone } from "../../hooks/useSpeechToText/types";
import { Speaker } from "../../hooks/useTextToSpeech/types";
import API, { TranslationReqPayload } from "../../utils/API";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  Stack,
  FormHelperText,
} from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import {
  setLanguage,
  setSelectedVoice,
} from "../../hooks/useTextToSpeech/store/actions";
import { useEffect } from "react";

const Main: React.FC<{
  microphone: Microphone;
  speaker: Speaker;
  langCodes: string[];
}> = ({ microphone, speaker, langCodes }): JSX.Element => {
  const { language: srcLang, transcript } = microphone;
  const { language: trgLang } = speaker;

  useEffect(() => {
    if (transcript) {
      const payload = {
        srcLang,
        text: transcript,
        trgLang,
      };
      translate(payload);
    }
  }, [transcript]);

  const translate = async (payload: TranslationReqPayload) => {
    const response = await API.translate(payload);
    console.log(response);
  };

  const handleSetSourceLang = (e: SelectChangeEvent<string>) => {
    microphone.setLanguage(e.target.value);
  };

  const handleSetTargetLang = (e: SelectChangeEvent<string>) => {
    const voices = speaker.getVoiceMap();
    speaker.dispatch(setLanguage(e.target.value));
    if (voices) {
      const defaultVoice = voices[e.target.value][0];
      speaker.dispatch(setSelectedVoice(defaultVoice));
    }
  };

  const handleListen = () => {
    microphone.listen();
  };

  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{ display: "flex", alignItems: "center" }}
        direction="row"
        spacing={10}
      >
        <FormControl variant="standard">
          <InputLabel id="src-lang">Source Language</InputLabel>
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
                      width="100"
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
                    width="100"
                    src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                    alt={""}
                  />
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{microphone.language}</FormHelperText>
        </FormControl>

        <FormControl variant="standard">
          <InputLabel id="src-lang">Target Language</InputLabel>
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
                      width="100"
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
                    width="100"
                    src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                    alt={""}
                  />
                </MenuItem>
              );
            })}
          </Select>

          {speaker.language === "es-US" ? (
            <FormHelperText>{"es-MX"}</FormHelperText>
          ) : (
            <FormHelperText>{speaker.language}</FormHelperText>
          )}
        </FormControl>
      </Stack>

      <IconButton
        onClick={handleListen}
        sx={{
          position: "fixed",
          bottom: 100,
        }}
        aria-label="microphone"
      >
        <MicNoneIcon sx={{ fontSize: "5em" }} />
      </IconButton>
    </Box>
  );
};

export default Main;
