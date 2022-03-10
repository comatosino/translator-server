import SpeechToText from "./SpeechToText";

export type Microphone = {
  listening: boolean;
  listen: () => void;
  stop: () => void;
  abort: () => void;
  clear: () => void;
};

export type UseSpeechToTextReturn = {
  speechToTextAvailable: boolean;
  microphone: Microphone;
  options: SpeechToTextOptions;
  transcript: string;
};

export type SpeechToTextOptions = {
  dispatch: React.Dispatch<SpeechToTextReducerAction>;
  language: string;
  continuous: boolean;
  interimResults: boolean;
};

export type SpeechToTextState = {
  speechToText: SpeechToText;
  transcript: string;
  language: string;
  listening: boolean;
  continuous: boolean;
  interimResults: boolean;
};

export type NoPayloadAction = {
  type: SpeechToTextActions.CLEAR_TRANSCRIPT;
};

export type BooleanPayloadAction = {
  type:
    | SpeechToTextActions.SET_LISTENING
    | SpeechToTextActions.SET_CONTINUOUS
    | SpeechToTextActions.SET_INTERIM_RESULTS;
  payload: boolean;
};

export type StringPayloadAction = {
  type: SpeechToTextActions.SET_TRANSCRIPT | SpeechToTextActions.SET_LANG;
  payload: string;
};

export type SpeechToTextReducerAction =
  | StringPayloadAction
  | NoPayloadAction
  | BooleanPayloadAction;

export enum SpeechToTextActions {
  SET_TRANSCRIPT,
  CLEAR_TRANSCRIPT,
  SET_LANG,
  SET_LISTENING,
  SET_CONTINUOUS,
  SET_INTERIM_RESULTS,
}
