import { useEffect, useMemo, useReducer } from "react";
import { setSelectedVoice, setVoices, setLanguage } from "./store/actions";
import INITIAL_STATE from "./store/init";
import textToSpeechReducer from "./store/reducer";
import TextToSpeech from "./TextToSpeech";

import { UseTextToSpeechReturn, TextToSpeechOptions, Speaker } from "./types";

const useTextToSpeech = (): UseTextToSpeechReturn => {
  const textToSpeechAvailable = TextToSpeech.isSupported();
  const [state, dispatch] = useReducer(textToSpeechReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.textToSpeech.voices) {
      const voices = state.textToSpeech.voices;
      const localVoice = voices[navigator.language][0];
      dispatch(setVoices(state.textToSpeech.voices));
      dispatch(setSelectedVoice(localVoice));
    }
  }, [state.textToSpeech.voices]);

  const speaker = useMemo((): Speaker => {
    return {
      dispatch,
      language: state.language,
      speaking: state.speaking,
      getVoiceMap: () => {
        return state.textToSpeech.getVoiceMap();
      },
      getVoiceArray: () => {
        return state.textToSpeech.getVoiceArray();
      },
      speak(text: string, options: TextToSpeechOptions) {
        state.textToSpeech.speak(text, options);
      },
      pause() {
        state.textToSpeech.pause();
      },
      resume() {
        state.textToSpeech.resume();
      },
      cancel() {
        state.textToSpeech.cancel();
      },
    };
  }, [state.language, state.speaking, state.textToSpeech]);

  const options = useMemo((): TextToSpeechOptions => {
    return {
      dispatch,
      language: state.language,
      selectedVoice: state.selectedVoice,
      volume: state.volume,
      rate: state.rate,
      pitch: state.pitch,
    };
  }, [
    state.language,
    state.pitch,
    state.rate,
    state.selectedVoice,
    state.volume,
  ]);

  return { textToSpeechAvailable, speaker, options };
};

export default useTextToSpeech;
