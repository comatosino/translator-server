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
  const [textToSpeech] = useState<TextToSpeech>(() =>
    TextToSpeech.getInstance()
  );
  const config = useLocalStorage<TextToSpeechOptions>(
    "TextToSpeechOptions",
    DEFAULTS
  );

  const [voicesReady, setVoicesReady] = useState<boolean>(false);

  // returns a list of BCP 47 language tags
  const langCodeList = useMemo<string[]>(() => {
    let uniqueLangCodes: string[] = [];
    if (voicesReady) {
      const voices = textToSpeech.getVoiceArray();
      const langCodes = voices.map((voice) => voice.lang);
      uniqueLangCodes = [...new Set(langCodes)];
    }
    return uniqueLangCodes;
  }, [textToSpeech, voicesReady]);

  // returns list of objects with information to create MUI MenuItem components
  const MUIvoiceDisplayList = useMemo<
    { type: string; content: string; lang: string }[]
  >(() => {
    let result: { type: string; content: string; lang: string }[] = [];
    if (voicesReady) {
      const langList = Object.keys(textToSpeech.voices);
      for (let i = 0; i < langList.length; i++) {
        const langCode = langList[i];
        const langVoices = textToSpeech.voices[langCode];
        result.push({ type: "subheader", content: langCode, lang: langCode });
        for (let j = 0; j < langVoices.length; j++) {
          const voice = langVoices[j];
          result.push({ type: "item", content: voice.name, lang: langCode });
        }
      }
    }
    return result;
  }, [voicesReady, textToSpeech.voices]);

  useEffect(() => {
    textToSpeech.manager.addEventListener("voiceschanged", handleVoicesLoaded);
    return () => {
      textToSpeech.manager.removeEventListener(
        "voiceschanged",
        handleVoicesLoaded
      );
    };
  });
  const handleVoicesLoaded = () => setVoicesReady(true);

  return [
    ttsIsSupported,
    textToSpeech,
    config,
    voicesReady,
    langCodeList,
    MUIvoiceDisplayList,
  ];
};

export default useTextToSpeech;
