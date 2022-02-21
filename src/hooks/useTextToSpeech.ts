import React, { useState, useEffect, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

import TextToSpeech from "../classes/TextToSpeech";
import TextToSpeechOptions from "../models/TextToSpeechOptions";

const DEFAULTS: TextToSpeechOptions = {
  voice: "",
  pitch: 1,
  rate: 1,
  volume: 1,
};

const useTextToSpeech = (): [
  boolean,
  TextToSpeech,
  [TextToSpeechOptions, React.Dispatch<TextToSpeechOptions>],
  boolean,
  string[],
  { type: string; content: string; lang: string }[]
] => {
  const ttsIsSupported = TextToSpeech.isSupported();

  const [tts] = useState<TextToSpeech>(() => TextToSpeech.getInstance());
  const config = useLocalStorage<TextToSpeechOptions>(
    "TextToSpeechOptions",
    DEFAULTS
  );

  const [voicesReady, setVoicesReady] = useState<boolean>(true);
  useEffect(() => {
    if (tts.voices) setVoicesReady(true);
  }, [tts.voices]);

  // creates a list of BCP 47 language tags for display
  const langCodeList = useMemo<string[]>(() => {
    let uniqueLangCodes: string[] = [];
    if (tts.voices && voicesReady) {
      const voices = tts.getVoiceArray();
      const langCodes = voices.map((voice) => voice.lang);
      uniqueLangCodes = [...new Set(langCodes)];
    }
    return uniqueLangCodes;
  }, [tts, tts.voices, voicesReady]);

  // creates list of objects with information to create MUI MenuItem components
  // target language select options
  type MUIVoiceDisplayType = { type: string; content: string; lang: string }[];
  const MUIvoiceDisplayList = useMemo<MUIVoiceDisplayType>(() => {
    let result: MUIVoiceDisplayType = [];
    if (voicesReady) {
      const langList = Object.keys(tts.voices);

      for (let i = 0; i < langList.length; i++) {
        const langCode = langList[i];
        const langVoices = tts.voices[langCode];
        result.push({ type: "subheader", content: langCode, lang: langCode });

        for (let j = 0; j < langVoices.length; j++) {
          const voice = langVoices[j];
          result.push({ type: "item", content: voice.name, lang: voice.lang });
        }
      }
    }
    return result;
  }, [tts.voices, voicesReady]);

  return [
    ttsIsSupported,
    tts,
    config,
    voicesReady,
    langCodeList,
    MUIvoiceDisplayList,
  ];
};

export default useTextToSpeech;
