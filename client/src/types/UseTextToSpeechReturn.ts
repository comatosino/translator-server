import Speaker from "./Speaker";
import TextToSpeechOptions from "./TextToSpeechOptions";
import MuiLists from "./MuiLists";

type UseTextToSpeechReturn = {
  textToSpeechAvailable: boolean;
  speaker: Speaker;
  useTextToSpeechOptions: [
    TextToSpeechOptions,
    React.Dispatch<TextToSpeechOptions>
  ];
  muiLists: MuiLists;
};

export default UseTextToSpeechReturn;
