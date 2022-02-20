import React, { ReactHTML } from "react";

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
  Typography,
  Container,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

import Slider from "@mui/material/Slider";

const Translator: React.FC = (): JSX.Element => {
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

  // save options to local storage
  const [sstOpts, setSstOpts] = useSttOptions;
  const [ttsOpts, setTtsOpts] = useTtsOptions;

  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    try {
      switch (name) {
        case "source":
          setSstOpts({ ...sstOpts, lang: value });
          break;
        case "target":
          setTtsOpts({ ...ttsOpts, voice: value });
          break;
        default:
          throw new Error("Something went wrong...");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return speechToTextAvailable && textToSpeechAvailable ? (
    <Container>
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
                langCodeList
                  .filter((lang) => lang !== ttsOpts.voice)
                  .map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>

          <TextareaAutosize aria-label="empty textarea" placeholder="input" />

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={sstOpts.continuous}
                  onChange={(e) =>
                    setSstOpts({ ...sstOpts, continuous: !sstOpts.continuous })
                  }
                />
              }
              label="Continuous Listening?"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={sstOpts.interim}
                  onChange={(e) =>
                    setSstOpts({ ...sstOpts, interim: !sstOpts.interim })
                  }
                />
              }
              label="Interim Results?"
            />
          </FormGroup>

          <Box>
            <Button>Start Listening</Button>
          </Box>

          <FormControl fullWidth>
            <InputLabel id="tgt-lang">Target Language</InputLabel>
            <Select
              label="Target Language"
              id="tgt-lang"
              name="target"
              value={voicesReady ? ttsOpts.voice : ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>Select a language and voice!</em>
              </MenuItem>

              {voicesReady &&
                MUIvoiceDisplayList?.map((data) => {
                  if (data.type === "subheader")
                    return (
                      <ListSubheader key={data.content}>
                        {data.content}
                      </ListSubheader>
                    );
                  if (data.type === "item")
                    return (
                      <MenuItem
                        key={data.content}
                        value={`${data.lang}-${data.content}`}
                      >
                        {data.content}
                      </MenuItem>
                    );
                  return (
                    <MenuItem value="">
                      <em>Select a language and voice!</em>
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <TextareaAutosize aria-label="empty textarea" placeholder="output" />

          <Box>
            <Button>Speak</Button>
          </Box>

          <Box>
            <Typography id="volume-slider">Volume</Typography>
            <Slider
              aria-labelledby="volume-slider"
              value={ttsOpts.volume}
              getAriaValueText={() => `${ttsOpts.volume}`}
              valueLabelDisplay="auto"
              step={0.25}
              marks
              min={0}
              max={1}
              onChange={(e: Event, value: number | number[]) => {
                setTtsOpts({ ...ttsOpts, volume: value });
              }}
            />

            <Typography id="pitch-slider">Pitch</Typography>
            <Slider
              aria-labelledby="pitch-slider"
              value={ttsOpts.pitch}
              getAriaValueText={() => `${ttsOpts.pitch}`}
              valueLabelDisplay="auto"
              step={0.25}
              marks
              min={0}
              max={2}
              onChange={(e: Event, value: number | number[]) => {
                setTtsOpts({ ...ttsOpts, pitch: value });
              }}
            />

            <Typography id="rate-slider">Rate</Typography>
            <Slider
              aria-labelledby="rate-slider"
              value={ttsOpts.rate}
              getAriaValueText={() => `${ttsOpts.rate}`}
              valueLabelDisplay="auto"
              step={0.1}
              marks
              min={0.1}
              max={10}
              onChange={(e: Event, value: number | number[]) => {
                setTtsOpts({ ...ttsOpts, rate: value });
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  ) : (
    <h1>not supported</h1>
  );
};

export default Translator;
