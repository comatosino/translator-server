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
  Divider,
} from "@mui/material";
import MuiLists from "../types/MuiLists";

import SpeechToTextOptions from "../types/SpeechToTextOptions";
import TextToSpeechOptions from "../types/TextToSpeechOptions";

type OptionsProps = {
  voicesReady: boolean;
  useSpeechToTextOptions: [
    SpeechToTextOptions,
    React.Dispatch<SpeechToTextOptions>
  ];
  useTextToSpeechOptions: [
    TextToSpeechOptions,
    React.Dispatch<TextToSpeechOptions>
  ];
  muiLists: MuiLists;
};

const Options = (props: OptionsProps) => {
  const {
    voicesReady,
    useSpeechToTextOptions,
    useTextToSpeechOptions,
    muiLists,
  } = props;

  const [sstOpts, setSstOpts] = useSpeechToTextOptions;
  const [ttsOpts, setTtsOpts] = useTextToSpeechOptions;

  // SPEECH RECOGNITION OPTIONS
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

  // SPEECH SYNTHESIS OPTIONS
  const handleSetTargetLang = (e: SelectChangeEvent<string>): void => {
    setTtsOpts({ ...ttsOpts, voice: e.target.value });
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
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2.5}>
        <Typography component="h2">
          <Divider>Source Language Options</Divider>
        </Typography>

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
              muiLists.srcCodeList
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
                disabled
                checked={sstOpts.continuous}
                onChange={handleSetContinuous}
              />
            }
            label="Continuous Listening?"
          />
          <FormControlLabel
            control={
              <Switch
                disabled
                checked={sstOpts.interimResults}
                onChange={handleSetInterim}
              />
            }
            label="Interim Results?"
          />
        </FormGroup>

        <Typography component="h2">
          <Divider>Target Language Options</Divider>
        </Typography>

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
              muiLists.trgCodeList.map((data) => {
                if (data.type === "subheader")
                  return (
                    <ListSubheader key={data.content}>
                      {data.lang}
                    </ListSubheader>
                  );
                if (data.type === "item")
                  return (
                    <MenuItem
                      key={data.content}
                      value={`${data.lang} ${data.content}`}
                    >
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

        <Typography id="volume-slider">Volume</Typography>
        <Slider
          disabled
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
          disabled
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
          disabled
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
      </Stack>
    </Box>
  );
};

export default Options;
