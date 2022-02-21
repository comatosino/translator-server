import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  FormControlLabel,
  FormGroup,
  ListSubheader,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import SpeechToTextOptions from "../models/SpeechToTextOptions";
import TextToSpeechOptions from "../models/TextToSpeechOptions";

type OptionsProps = {
  voicesReady: boolean;
  langCodeList: string[];
  MUIvoiceDisplayList: { type: string; content: string; lang: string }[];
  useSttOptions: [SpeechToTextOptions, React.Dispatch<SpeechToTextOptions>];
  useTtsOptions: [TextToSpeechOptions, React.Dispatch<TextToSpeechOptions>];
};

const Options = (props: OptionsProps) => {
  const {
    voicesReady,
    langCodeList,
    MUIvoiceDisplayList,
    useSttOptions,
    useTtsOptions,
  } = props;

  // save options to local storage
  const [sstOpts, setSstOpts] = useSttOptions;
  const [ttsOpts, setTtsOpts] = useTtsOptions;

  const handleSetTargetLang = (e: SelectChangeEvent<string>): void => {
    setTtsOpts({ ...ttsOpts, voice: e.target.value });
  };

  const handleSetSourceLang = (e: SelectChangeEvent<string>): void => {
    setSstOpts({ ...sstOpts, lang: e.target.value });
  };

  const handleSetContinuous = (
    _e: React.ChangeEvent<HTMLInputElement>,
    _checked: boolean
  ): void => {
    setSstOpts({
      ...sstOpts,
      continuous: !sstOpts.continuous,
    });
  };

  const handleSetInterim = (
    _e: React.ChangeEvent<HTMLInputElement>,
    _checked: boolean
  ): void => {
    setSstOpts({ ...sstOpts, interimResults: !sstOpts.interimResults });
  };

  const handleSetVolume = (_e: Event, value: number | number[]): void => {
    setTtsOpts({ ...ttsOpts, volume: value });
  };

  const handleSetPitch = (_e: Event, value: number | number[]): void => {
    setTtsOpts({ ...ttsOpts, pitch: value });
  };

  const handleSetRate = (_e: Event, value: number | number[]): void => {
    setTtsOpts({ ...ttsOpts, rate: value });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={5}>
          <Typography variant="h3">Settings</Typography>
          <FormControl fullWidth>
            <InputLabel id="src-lang">Source Language</InputLabel>
            <Select
              label="Source Language"
              id="src-lang"
              name="source"
              value={voicesReady ? sstOpts.lang : ""}
              onChange={handleSetSourceLang}
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

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={sstOpts.continuous}
                  onChange={handleSetContinuous}
                />
              }
              label="Continuous Listening?"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={sstOpts.interimResults}
                  onChange={handleSetInterim}
                />
              }
              label="Interim Results?"
            />
          </FormGroup>

          <FormControl fullWidth>
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
                MUIvoiceDisplayList?.map((data) => {
                  if (data.type === "subheader")
                    return (
                      <ListSubheader key={data.content}>
                        {/* 2-char language code */}
                        {data.lang}
                      </ListSubheader>
                    );
                  if (data.type === "item")
                    return (
                      <MenuItem
                        key={data.content}
                        value={`${data.lang} ${data.content}`}
                      >
                        {/*voice name property e.g. Google US English */}
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
          </FormControl>

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
              onChange={handleSetVolume}
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
              onChange={handleSetPitch}
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
              onChange={handleSetRate}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Options;
