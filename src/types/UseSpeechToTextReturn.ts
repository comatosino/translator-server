import Microphone from "./Microphone";
import SpeechToTextOptions from "./SpeechToTextOptions";

type UseSpeechToTextReturn = {
  speechToTextAvailable: boolean;
  microphone: Microphone;
  useSpeechToTextOptions: [
    SpeechToTextOptions,
    React.Dispatch<SpeechToTextOptions>
  ];
};

export default UseSpeechToTextReturn;
