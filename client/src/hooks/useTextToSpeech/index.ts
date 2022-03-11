import { useEffect, useReducer } from "react";
import { setVoices } from "./store/actions";
import INITIAL_STATE from "./store/init";
import textToSpeechReducer from "./store/reducer";
import TextToSpeech from "./TextToSpeech";

import { UseTextToSpeechReturn, TextToSpeechOptions, Speaker } from "./types";

const useTextToSpeech = (): UseTextToSpeechReturn => {
  const textToSpeechAvailable = TextToSpeech.isSupported();
  const [manager, dispatch] = useReducer(textToSpeechReducer, INITIAL_STATE);
  const { textToSpeech } = manager;

  useEffect(() => {
    if (textToSpeech.voices) {
      dispatch(setVoices(textToSpeech.voices));
    }
  }, [textToSpeech.voices]);

  const speaker: Speaker = {
    speaking: manager.speaking,
    speak(text: string, options: TextToSpeechOptions) {
      textToSpeech.speak(text, options);
    },
    pause() {
      textToSpeech.pause();
    },
    resume() {
      textToSpeech.resume();
    },
    cancel() {
      textToSpeech.cancel();
    },
  };

  const options: TextToSpeechOptions = {
    dispatch,
    selectedVoice: manager.selectedVoice,
    voices: manager.voices,
    volume: manager.volume,
    rate: manager.rate,
    pitch: manager.pitch,
  };

  return { textToSpeechAvailable, speaker, options };
};

export default useTextToSpeech;
