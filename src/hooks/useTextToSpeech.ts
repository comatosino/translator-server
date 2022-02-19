import React, { useState, useEffect, useRef, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

import TextToSpeech from "../classes/TextToSpeech";
import TextToSpeechOptions from "../models/TextToSpeechOptions";

const DEFAULTS: TextToSpeechOptions = {
  lang: "",
  voice: null,
  pitch: 1,
  rate: 1,
  volume: 1,
};

const useTextToSpeech = (): [
  boolean,
  TextToSpeech,
  [TextToSpeechOptions, React.Dispatch<TextToSpeechOptions>],
  boolean,
  string[]
] => {
  const ttsIsSupported = TextToSpeech.isSupported();
  const [textToSpeech] = useState<TextToSpeech>(() =>
    TextToSpeech.getInstance()
  );
  const config = useLocalStorage<TextToSpeechOptions>(
    "TextToSpeechOptions",
    DEFAULTS
  );

  // TODO add logic to also update speechSynthesys

  const [voicesLoaded, setVoicesLoaded] = useState<boolean>(false);

  const langList = useMemo<string[]>(
    () => Object.keys(textToSpeech.voices),
    [textToSpeech.voices]
  );

  useEffect(() => {
    textToSpeech.manager.addEventListener("voiceschanged", handleVoicesLoaded);
    return () => {
      textToSpeech.manager.removeEventListener(
        "voiceschanged",
        handleVoicesLoaded
      );
    };
  });
  const handleVoicesLoaded = () => setVoicesLoaded(true);

  return [ttsIsSupported, textToSpeech, config, voicesLoaded, langList];
};

export default useTextToSpeech;
