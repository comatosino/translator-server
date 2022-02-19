import React, { useMemo } from "react";

import useSpeechToText from "./hooks/useSpeechToText";
import useTextToSpeech from "./hooks/useTextToSpeech";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  ListSubheader,
  TextareaAutosize,
  Button,
} from "@mui/material";

const Translator: React.FC = (): JSX.Element => {
  const [speechToTextAvailable, speechToText, useSttOptions] =
    useSpeechToText();
  const [
    textToSpeechAvailable,
    textToSpeech,
    useTtsOptions,
    voicesReady,
    langList,
  ] = useTextToSpeech();

  const [sstOpts, setSstOpts] = useSttOptions;
  const [ttsOpts, setTtsOpts] = useTtsOptions;

  const voiceList = useMemo(() => {
    if (voicesReady) {
      const result: { type: string; content: string }[] = [];
      for (let i = 0; i < langList.length; i++) {
        const langCode = langList[i];
        const langVoices = textToSpeech.voices[langCode];
        result.push({ type: "subheader", content: langCode });
        for (let j = 0; j < langVoices.length; j++) {
          const voice = langVoices[j];
          result.push({ type: "item", content: voice.name });
        }
      }
      return result;
    }
  }, [voicesReady, textToSpeech.voices, langList]);

  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const { name, value: lang } = e.target;
    try {
      switch (name) {
        case "source":
          setSstOpts({ ...sstOpts, lang });
          break;
        case "target":
          setTtsOpts({ ...ttsOpts, lang });
          break;
        default:
          throw new Error("Something went wrong...");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return speechToTextAvailable && textToSpeechAvailable ? (
    <>
      <Box>
        <Stack spacing={5}>
          <FormControl fullWidth>
            <InputLabel id="src-lang">Source Language</InputLabel>
            <Select
              label="Source Language"
              id="src-lang"
              name="source"
              value={voicesReady ? sstOpts.lang : ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>Select a language!</em>
              </MenuItem>
              {voicesReady &&
                langList
                  .filter((lang) => lang !== ttsOpts.lang)
                  .map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>

          <TextareaAutosize aria-label="empty textarea" placeholder="input" />

          <Box>
            <Button>Start Listening</Button>
          </Box>

          <FormControl fullWidth>
            <InputLabel id="tgt-lang">Target Language</InputLabel>
            <Select
              label="Target Language"
              id="tgt-lang"
              name="target"
              value={voicesReady ? ttsOpts.lang : ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>Select a language and voice!</em>
              </MenuItem>

              {voicesReady &&
                voiceList?.map((data) => {
                  if (data.type === "subheader")
                    return (
                      <ListSubheader key={data.content}>
                        {data.content}
                      </ListSubheader>
                    );
                  if (data.type === "item")
                    return (
                      <MenuItem key={data.content} value={data.content}>
                        {data.content}
                      </MenuItem>
                    );
                })}
            </Select>
          </FormControl>

          <TextareaAutosize aria-label="empty textarea" placeholder="output" />
        </Stack>
      </Box>
    </>
  ) : (
    <h1>not supported</h1>
  );
};

export default Translator;
