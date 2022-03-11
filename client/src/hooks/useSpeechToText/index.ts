import { useEffect, useMemo, useReducer } from "react";
import SpeechToText from "./SpeechToText";
import INITIAL_STATE from "./store/init";
import {
  setTranscript,
  clearTranscript,
  setListening,
  setLang,
  setContinuous,
  setInterimResults,
} from "./store/actions";
import speechToTextReducer from "./store/reducer";
import {
  Microphone,
  SpeechToTextOptions,
  UseSpeechToTextReturn,
} from "./types";

const useSpeechToText = (): UseSpeechToTextReturn => {
  const speechToTextAvailable = SpeechToText.isSupported();
  const [state, dispatch] = useReducer(speechToTextReducer, INITIAL_STATE);
  const { speechToText } = state;

  useEffect(() => {
    if (speechToTextAvailable) {
      speechToText.interface.onstart = (_e: Event) => {
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
  }, [speechToTextAvailable, speechToText]);

  const microphone: Microphone = {
    listening: state.listening,
    transcript: state.transcript,
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

  const options = useMemo((): SpeechToTextOptions => {
    return {
      language: state.language,
      setLanguage: (lang: string): void => {
        state.speechToText.lang = lang;
        dispatch(setLang(lang));
      },
      continuous: state.continuous,
      setContinuous: (continuous: boolean) => {
        state.speechToText.continuous = continuous;
        dispatch(setContinuous(continuous));
      },
      interimResults: state.interimResults,
      setInterimResults: (interimResults: boolean) => {
        state.speechToText.interimResults = interimResults;
        dispatch(setInterimResults(interimResults));
      },
    };
  }, [state]);

  return {
    speechToTextAvailable,
    microphone,
    options,
  };
};

export default useSpeechToText;
