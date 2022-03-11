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

export type MuiLists = {
  srcCodeList: string[];
  trgCodeList: { type: string; content: string; lang: string }[];
};

// type OptionsProps = {
//   voicesReady: boolean;
//   useSpeechToTextOptions: [
//     SpeechToTextOptions,
//     React.Dispatch<SpeechToTextOptions>
//   ];
//   useTextToSpeechOptions: [
//     TextToSpeechOptions,
//     React.Dispatch<TextToSpeechOptions>
//   ];
//   muiLists: MuiLists;
// };

const Options = () => {
  // source language select options
  // creates a list of BCP 47 language tags for display
  // const srcCodeList = useMemo<string[]>(() => {
  //   let uniqueLangCodes: string[] = [];
  //   if (voicesReady) {
  //     const voices = instance.getVoiceArray();
  //     const langCodes = voices.map((voice) => voice.lang);
  //     uniqueLangCodes = [...new Set(langCodes)];
  //   }
  //   return uniqueLangCodes;
  // }, [instance, voicesReady]);

  // target language & voice select options
  // creates list of objects with info for MUI MenuItem & Subheader components
  // const trgCodeList = useMemo<MuiLists["trgCodeList"]>(() => {
  //   let result: MuiLists["trgCodeList"] = [];
  //   if (instance.voices && voicesReady) {
  //     const langList = Object.keys(instance.voices);

  //     for (let i = 0; i < langList.length; i++) {
  //       const langCode = langList[i];
  //       const langVoices = instance.voices[langCode];
  //       result.push({ type: "subheader", content: langCode, lang: langCode });

  //       for (let j = 0; j < langVoices.length; j++) {
  //         const voice = langVoices[j];
  //         result.push({ type: "item", content: voice.name, lang: voice.lang });
  //       }
  //     }
  //   }
  //   return result;
  // }, [instance.voices, voicesReady]);

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

        {/* <FormControl fullWidth>
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
        </FormGroup> */}

        <Typography component="h2">
          <Divider>Target Language Options</Divider>
        </Typography>

        {/* <FormControl fullWidth>
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
        </FormControl> */}

        <Typography id="volume-slider">Volume</Typography>
        {/* <Slider
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
        /> */}

        <Typography id="pitch-slider">Pitch</Typography>
        {/* <Slider
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
        /> */}

        <Typography id="rate-slider">Rate</Typography>
        {/* <Slider
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
        /> */}
      </Stack>
    </Box>
  );
};

export default Options;
