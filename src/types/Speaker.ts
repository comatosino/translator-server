import TextToSpeechOptions from "./TextToSpeechOptions";

type Speaker = {
  voicesReady: boolean;
  speak: (text: string, options: TextToSpeechOptions) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
};

export default Speaker;
