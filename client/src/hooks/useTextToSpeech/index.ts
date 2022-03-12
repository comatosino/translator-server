import { useEffect, useMemo, useReducer } from "react";
import {
  setPitch,
  setRate,
  setSelectedVoice,
  setVoices,
  setVolume,
} from "./store/actions";
import INITIAL_STATE from "./store/init";
import textToSpeechReducer from "./store/reducer";
import TextToSpeech from "./TextToSpeech";

import { UseTextToSpeechReturn, TextToSpeechOptions, Speaker } from "./types";

const useTextToSpeech = (): UseTextToSpeechReturn => {
  const textToSpeechAvailable = TextToSpeech.isSupported();
  const [state, dispatch] = useReducer(textToSpeechReducer, INITIAL_STATE);
  const { textToSpeech } = state;

  useEffect(() => {
    if (textToSpeechAvailable && textToSpeech.voices) {
      dispatch(setVoices(textToSpeech.voices));
    }
  }, [textToSpeechAvailable, textToSpeech.voices]);

  const speaker = useMemo((): Speaker => {
    return {
      speaking: state.speaking,
      selectedVoice: state.selectedVoice,
      getVoiceMap: () => textToSpeech.getVoiceMap(),
      getVoiceArray: () => textToSpeech.getVoiceArray(),
      setSelectedVoice: (selectedVoice: SpeechSynthesisVoice) => {
        dispatch(setSelectedVoice(selectedVoice));
      },
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
  }, [state, textToSpeech]);

  const options = useMemo((): TextToSpeechOptions => {
    return {
      volume: state.volume,
      setVolume: (volume: number) => {
        dispatch(setVolume(volume));
      },
      rate: state.rate,
      setRate: (rate: number) => {
        dispatch(setRate(rate));
      },
      pitch: state.pitch,
      setPitch: (pitch: number) => {
        dispatch(setPitch(pitch));
      },
    };
  }, [state]);

  return { textToSpeechAvailable, speaker, options };
};

export default useTextToSpeech;
