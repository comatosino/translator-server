type TextToSpeechOptions = {
  voice: string;
  volume: number | number[]; // between 0 (lowest) and 1 (highest)
  pitch: number | number[]; // range between 0 (lowest) and 2 (highest)
  rate: number | number[]; // between 0.1 (lowest) and 10 (highest)
};

export default TextToSpeechOptions;
