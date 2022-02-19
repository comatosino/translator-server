import useSpeechToText from "./hooks/useSpeechToText";
import useTextToSpeech from "./hooks/useTextToSpeech";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const App: React.FC = (): JSX.Element => {
  const [speechToTextAvailable, speechToText, sttConfig] = useSpeechToText();
  const [textToSpeechAvailable, textToSpeech, ttsConfig] = useTextToSpeech();

  return (
    <>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="src-lang">Target Language</InputLabel>
          <Select
            label="Source Language"
            id="src-lang"
            value={ttsOptions.lang}
            onChange={(e) =>
              console.log(e.target.value);
            }
          >
            {voices.map((voice) => (
              <MenuItem key={voice.voiceURI} value={voice.lang}>
                {voice.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button>Button</Button>
      </Box>
    </>
  );
};

export default App;
