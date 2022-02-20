export default interface TextToSpeechOptions {
  voice: string;
  pitch: number | number[]; // range between 0 (lowest) and 2 (highest)
  rate: number | number[]; // between 0.1 (lowest) and 10 (highest)
  volume: number | number[]; // between 0 (lowest) and 1 (highest)
}
