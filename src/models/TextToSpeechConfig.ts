export interface TextToSpeechOpts {
  lang: string;
  voice: SpeechSynthesisVoice | null;
  pitch: number; // range between 0 (lowest) and 2 (highest)
  rate: number; // between 0.1 (lowest) and 10 (highest)
  volume: number; // between 0 (lowest) and 1 (highest)
}