import React, { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

import TextToSpeech from "../classes/TextToSpeech";
import { TextToSpeechOpts } from "../models/TextToSpeechConfig";

const DEFAULTS: TextToSpeechOpts = {
  lang: "",
  voice: null,
  pitch: 1,
  rate: 1,
  volume: 1,
};

const useTextToSpeech = (): [
  boolean,
  TextToSpeech,
  SpeechSynthesisVoice[],
  [TextToSpeechOpts, React.Dispatch<TextToSpeechOpts>]
] => {
  const _textToSpeechAvailable = TextToSpeech.isSupported();
  const [_textToSpeech] = useState<TextToSpeech>(TextToSpeech.getInstance());
  const [_voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const _config = useLocalStorage<TextToSpeechOpts>(
    "TextToSpeechOptions",
    DEFAULTS
  );

  const handleVoicesLoaded = () => setVoices(_textToSpeech.voices);
  useEffect(() => {
    _textToSpeech.manager.addEventListener("voiceschanged", handleVoicesLoaded);
    return () => {
      _textToSpeech.manager.removeEventListener(
        "voiceschanged",
        handleVoicesLoaded
      );
    };
  });

  return [_textToSpeechAvailable, _textToSpeech, _voices, _config];
};

export default useTextToSpeech;
