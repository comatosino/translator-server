import SpeechToTextOptions from "../types/SpeechToTextOptions";
import TextToSpeechOptions from "../types/TextToSpeechOptions";

export const SPEECH_TO_TEXT_DEFAULTS: SpeechToTextOptions = {
  lang: "",
  continuous: false,
  interimResults: false,
};

export const TEXT_TO_SPEECH_DEFAULTS: TextToSpeechOptions = {
  voice: "",
  pitch: 1,
  rate: 1,
  volume: 1,
};
