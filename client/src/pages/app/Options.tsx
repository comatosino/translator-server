import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { SpeechToTextOptions } from "../../hooks/useSpeechToText/types";
import {
  TextToSpeechOptions,
  TextToSpeechActions,
} from "../../hooks/useTextToSpeech/types";

const Options: React.FC<{
  micOptions: SpeechToTextOptions;
  speakOptions: TextToSpeechOptions;
}> = ({ micOptions, speakOptions }): JSX.Element => {
  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack>
        <Typography component="h2">
          <Divider>Source Language Options</Divider>
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={micOptions.continuous}
                onChange={() =>
                  micOptions.setContinuous(!micOptions.continuous)
                }
              />
            }
            label="Continuous Listening?"
          />
          <FormControlLabel
            control={
              <Switch
                checked={micOptions.interimResults}
                onChange={() =>
                  micOptions.setInterimResults(!micOptions.interimResults)
                }
              />
            }
            label="Interim Results?"
          />
        </FormGroup>

        <Typography component="h2">
          <Divider>Target Language Options</Divider>
        </Typography>

        <Typography id="volume-slider">Volume</Typography>
        <Slider
          name={TextToSpeechActions[TextToSpeechActions.SET_VOLUME]}
          aria-labelledby="volume-slider"
          value={speakOptions.volume}
          getAriaValueText={() => `${speakOptions.volume}`}
          valueLabelDisplay="auto"
          step={0.25}
          marks
          min={0}
          max={1}
          onChange={(e, value) => speakOptions.setVolume(value as number)}
        />
        <Typography id="pitch-slider">Pitch</Typography>
        <Slider
          name={TextToSpeechActions[TextToSpeechActions.SET_PITCH]}
          aria-labelledby="pitch-slider"
          value={speakOptions.pitch}
          getAriaValueText={() => `${speakOptions.pitch}`}
          valueLabelDisplay="auto"
          step={0.25}
          marks
          min={0}
          max={2}
          onChange={(e, value) => speakOptions.setPitch(value as number)}
        />

        <Typography id="rate-slider">Rate</Typography>
        <Slider
          name={TextToSpeechActions[TextToSpeechActions.SET_RATE]}
          aria-labelledby="rate-slider"
          value={speakOptions.rate}
          getAriaValueText={() => `${speakOptions.rate}`}
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0.1}
          max={10}
          onChange={(e, value) => speakOptions.setRate(value as number)}
        />
      </Stack>
    </Box>
  );
};

export default Options;
