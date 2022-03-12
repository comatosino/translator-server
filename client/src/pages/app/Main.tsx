import { Microphone } from "../../hooks/useSpeechToText/types";
import { Speaker } from "../../hooks/useTextToSpeech/types";
import { MuiLists } from "../../hooks/userMuiLangLists";
import {
  Box,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

const Main: React.FC<{
  microphone: Microphone;
  speaker: Speaker;
  srcCodeList: MuiLists["srcCodeList"];
  trgCodeList: MuiLists["trgCodeList"];
}> = ({ microphone, speaker, srcCodeList, trgCodeList }): JSX.Element => {
  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel id="src-lang">Source Language</InputLabel>
          <Select
            label="Source Language"
            id="src-lang"
            name="source"
            value={microphone.language || srcCodeList[0] || ""}
            onChange={(e: SelectChangeEvent<string>) => {
              microphone.setLanguage(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>Select a language!</em>
            </MenuItem>
            {srcCodeList.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="tgt-lang">Target Language</InputLabel>
          <Select
            label="Target Language"
            id="tgt-lang"
            name="target"
            value={speaker.selectedVoice?.name || ""}
            onChange={({ target }: SelectChangeEvent<string>) => {
              const voiceName = target.value;
              const voiceArr = speaker.getVoiceArray()!;
              const voice = voiceArr.find((voice) => voice.name === voiceName);
              if (voice) speaker.setSelectedVoice(voice);
            }}
          >
            <MenuItem value="">
              <em>Select a language and voice!</em>
            </MenuItem>

            {trgCodeList.map((data) => {
              if (data.type === "subheader")
                return (
                  <ListSubheader key={data.content}>{data.lang}</ListSubheader>
                );
              if (data.type === "item")
                return (
                  <MenuItem key={data.content} value={data.content}>
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
      </Stack>
    </Box>
  );
};

export default Main;
