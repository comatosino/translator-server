import TextToSpeech from "./TextToSpeech";

export type TextToSpeechState = {
  textToSpeech: TextToSpeech;
  selectedVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoiceMap | null;
  volume: number | number[];
  rate: number | number[];
  pitch: number | number[];
};

export type Speaker = {
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
  getVoiceMap: () => SpeechSynthesisVoiceMap | undefined;
  getVoiceArray: () => SpeechSynthesisVoice[];
  speak: (text: string, options: TextToSpeechOptions) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
};

export type SpeechSynthesisVoiceMap = {
  [langCode: string]: SpeechSynthesisVoice[];
};

export type UseTextToSpeechReturn = {
  textToSpeechAvailable: boolean;
  speaker: Speaker;
  options: TextToSpeechOptions;
};

export type TextToSpeechOptions = {
  volume: number | number[]; // between 0 (lowest) and 1 (highest)
  setVolume: (volume: number) => void;
  pitch: number | number[]; // range between 0 (lowest) and 2 (highest)
  setPitch: (pitch: number) => void;
  rate: number | number[]; // between 0.1 (lowest) and 10 (highest)
  setRate: (rate: number) => void;
};

export enum TextToSpeechActions {
  SET_VOICES,
  SET_SELECTED_VOICE,
  SET_VOLUME,
  SET_RATE,
  SET_PITCH,
  SET_SPEAKING,
}

export type BooleanPayloadAction = {
  type: TextToSpeechActions.SET_SPEAKING;
  payload: boolean;
};

export type NumberPayloadAction = {
  type:
    | TextToSpeechActions.SET_VOLUME
    | TextToSpeechActions.SET_RATE
    | TextToSpeechActions.SET_PITCH;
  payload: number;
};

export type SelectedVoicePayloadAction = {
  type: TextToSpeechActions.SET_SELECTED_VOICE;
  payload: SpeechSynthesisVoice;
};

export type VoicesPayloadAction = {
  type: TextToSpeechActions.SET_VOICES;
  payload: SpeechSynthesisVoiceMap;
};

export type TextToSpeechReducerAction =
  | VoicesPayloadAction
  | SelectedVoicePayloadAction
  | NumberPayloadAction
  | BooleanPayloadAction;
