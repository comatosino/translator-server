import {
  BooleanPayloadAction,
  NoPayloadAction,
  SpeechToTextActions,
  StringPayloadAction,
} from "../types";

export const setTranscript = (str: string): StringPayloadAction => {
  return {
    type: SpeechToTextActions.SET_TRANSCRIPT,
    payload: str,
  };
};

export const clearTranscript = (): NoPayloadAction => {
  return {
    type: SpeechToTextActions.CLEAR_TRANSCRIPT,
  };
};

export const setLang = (str: string): StringPayloadAction => {
  return {
    type: SpeechToTextActions.SET_LANG,
    payload: str,
  };
};

export const setListening = (bool: boolean): BooleanPayloadAction => {
  return {
    type: SpeechToTextActions.SET_LISTENING,
    payload: bool,
  };
};

export const setContinuous = (bool: boolean): BooleanPayloadAction => {
  return {
    type: SpeechToTextActions.SET_CONTINUOUS,
    payload: bool,
  };
};

export const setInterimResults = (bool: boolean): BooleanPayloadAction => {
  return {
    type: SpeechToTextActions.SET_INTERIM_RESULTS,
    payload: bool,
  };
};
