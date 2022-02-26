import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

import SpeechToText from "../classes/SpeechToText";
import SpeechToTextOptions from "../types/SpeechToTextOptions";
import UseSpeechToTextReturn from "../types/UseSpeechToTextReturn";
import Microphone from "../types/Microphone";

import { SPEECH_TO_TEXT_DEFAULTS } from "../utils/defaultOptions";

const useSpeechToText = (): UseSpeechToTextReturn => {
  const speechToTextAvailable = SpeechToText.isSupported();

  const instance = useState<SpeechToText>(() => SpeechToText.getInstance())[0];

  const useSpeechToTextOptions = useLocalStorage<SpeechToTextOptions>(
    "SpeechToTextOptions",
    SPEECH_TO_TEXT_DEFAULTS
  );

  const [listening, setListening] = useState<boolean>(instance.listening);
  const [transcript, setTranscript] = useState<string>(instance.transcript);

  // sync instance state with hook
  useEffect(() => {
    instance.lang = useSpeechToTextOptions[0].lang;
    instance.continuous = useSpeechToTextOptions[0].continuous;
    instance.interimResults = useSpeechToTextOptions[0].interimResults;
  }, [instance, useSpeechToTextOptions]);

  // assign event handlers
  useEffect(() => {
    if (speechToTextAvailable) {
      instance.interface.onstart = (_e: Event): void => {
        setTranscript("");
        instance.clear();
        instance.listening = true;
        setListening(instance.listening);
      };

      instance.interface.onresult = (e: SpeechRecognitionEvent): void => {
        const { transcript } = e.results[0][0];
        instance.transcript = transcript;
        setTranscript(instance.transcript);
      };

      instance.interface.onend = (_e: Event) => {
        instance.listening = false;
        setListening(instance.listening);
      };

      instance.interface.onnomatch = (_e: SpeechRecognitionEvent): void => {
        setTranscript("");
        instance.listening = false;
        setListening(instance.listening);
        instance.clear();
        throw new Error("NO MATCH");
      };

      instance.interface.onerror = (e: SpeechRecognitionError): void => {
        setTranscript("");
        instance.listening = false;
        setListening(instance.listening);
        instance.clear();
        throw new Error(e.error);
      };
    }
  });

  const microphone: Microphone = {
    listening,
    transcript,
    listen() {
      instance.start();
    },
    stop() {
      instance.stop();
    },
    abort() {
      instance.abort();
    },
    clear() {
      instance.clear();
    },
  };

  return { speechToTextAvailable, microphone, useSpeechToTextOptions };
};

export default useSpeechToText;
