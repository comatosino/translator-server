import { useEffect, useReducer } from "react";
import SpeechToText from "./SpeechToText";
import INITIAL_STATE from "./store/init";

import { setTranscript, clearTranscript, setListening } from "./store/actions";
import reducer from "./store/reducer";
import {
  Microphone,
  SpeechToTextOptions,
  UseSpeechToTextReturn,
} from "./types";

const useSpeechToText = (): UseSpeechToTextReturn => {
  const speechToTextAvailable = SpeechToText.isSupported();
  const [manager, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { speechToText } = manager;

  useEffect(() => {
    if (speechToTextAvailable) {
      speechToText.interface.onstart = (e: Event) => {
        speechToText.clearTranscript();
        dispatch(clearTranscript());
        speechToText.listening = true;
        dispatch(setListening(true));
      };
    }

    speechToText.interface.onresult = (e: SpeechRecognitionEvent): void => {
      try {
        const { transcript } = e.results[0][0];
        speechToText.transcript = transcript;
        dispatch(setTranscript(transcript));
      } catch (error) {
        console.error(error);
      }
    };

    speechToText.interface.onend = (_e: Event) => {
      try {
        speechToText.listening = false;
        dispatch(setListening(false));
      } catch (error) {
        console.error(error);
      }
    };

    speechToText.interface.onnomatch = (_e: SpeechRecognitionEvent): void => {
      throw new Error("NO MATCH");
    };

    speechToText.interface.onerror = (e: SpeechRecognitionError): void => {
      speechToText.clearTranscript();
      dispatch(clearTranscript());
      dispatch(setListening(false));
      throw new Error(e.error);
    };
  }, [speechToText, speechToTextAvailable]);

  const microphone: Microphone = {
    listening: manager.listening,
    async listen() {
      speechToText.start();
    },
    stop() {
      speechToText.stop();
    },
    abort() {
      speechToText.abort();
    },
    clear() {
      speechToText.clearTranscript();
    },
  };

  const options: SpeechToTextOptions = {
    dispatch,
    language: manager.language,
    continuous: manager.continuous,
    interimResults: manager.interimResults,
  };

  return {
    speechToTextAvailable,
    microphone,
    transcript: manager.transcript,
    options,
  };
};

export default useSpeechToText;
