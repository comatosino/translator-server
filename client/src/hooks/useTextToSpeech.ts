import { useState, useEffect, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

import TextToSpeech from "../classes/TextToSpeech";

import TextToSpeechOptions from "../types/TextToSpeechOptions";
import UseTextToSpeechReturn from "../types/UseTextToSpeechReturn";
import Speaker from "../types/Speaker";
import MuiLists from "../types/MuiLists";

import { TEXT_TO_SPEECH_DEFAULTS } from "../utils/defaultOptions";

const useTextToSpeech = (): UseTextToSpeechReturn => {
  const textToSpeechAvailable = TextToSpeech.isSupported();

  const instance = useState<TextToSpeech>(() => TextToSpeech.getInstance())[0];

  const useTextToSpeechOptions = useLocalStorage<TextToSpeechOptions>(
    "TextToSpeechOptions",
    TEXT_TO_SPEECH_DEFAULTS
  );

  const [voicesReady, setVoicesReady] = useState<boolean>(false);
  useEffect(() => {
    if (instance.getVoiceArray().length) setVoicesReady(true);
    else setVoicesReady(false);
  }, [instance]);

  // source language select options
  // creates a list of BCP 47 language tags for display
  const srcCodeList = useMemo<string[]>(() => {
    let uniqueLangCodes: string[] = [];
    if (voicesReady) {
      const voices = instance.getVoiceArray();
      const langCodes = voices.map((voice) => voice.lang);
      uniqueLangCodes = [...new Set(langCodes)];
    }
    return uniqueLangCodes;
  }, [instance, voicesReady]);

  // target language & voice select options
  // creates list of objects with info for MUI MenuItem & Subheader components
  const trgCodeList = useMemo<MuiLists["trgCodeList"]>(() => {
    let result: MuiLists["trgCodeList"] = [];
    if (instance.voices && voicesReady) {
      const langList = Object.keys(instance.voices);

      for (let i = 0; i < langList.length; i++) {
        const langCode = langList[i];
        const langVoices = instance.voices[langCode];
        result.push({ type: "subheader", content: langCode, lang: langCode });

        for (let j = 0; j < langVoices.length; j++) {
          const voice = langVoices[j];
          result.push({ type: "item", content: voice.name, lang: voice.lang });
        }
      }
    }
    return result;
  }, [instance.voices, voicesReady]);

  const speaker: Speaker = {
    voicesReady,
    speak(text: string, options: TextToSpeechOptions) {
      instance.speak(text, options);
    },
    pause() {
      instance.pause();
    },
    resume() {
      instance.resume();
    },
    cancel() {
      instance.cancel();
    },
  };

  const muiLists: MuiLists = {
    srcCodeList,
    trgCodeList,
  };

  return { textToSpeechAvailable, speaker, useTextToSpeechOptions, muiLists };
};

export default useTextToSpeech;
