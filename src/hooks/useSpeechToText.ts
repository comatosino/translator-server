import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

import SpeechToText from "../classes/SpeechToText";
import SpeechToTextOptions from "../models/SpeechToTextOptions";

const DEFAULTS: SpeechToTextOptions = {
  lang: "",
  continuous: false,
  interimResults: false,
};

const useSpeechToText = (): [
  boolean,
  SpeechToText,
  [SpeechToTextOptions, React.Dispatch<SpeechToTextOptions>]
] => {
  const sttIsSupported = SpeechToText.isSupported();

  const [sst] = useState<SpeechToText>(() => SpeechToText.getInstance());
  const config = useLocalStorage<SpeechToTextOptions>(
    "SpeechToTextOptions",
    DEFAULTS
  );

  // update instance on config
  useEffect(() => {
    if (sttIsSupported) {
      sst.interface.lang = config[0].lang;
      sst.interface.continuous = config[0].continuous;
      sst.interface.interimResults = config[0].interimResults;
    }
  }, [sttIsSupported, sst, config]);

  return [sttIsSupported, sst, config];
};

export default useSpeechToText;
