import React, { useState } from "react";
import useLocalStorage from "./useLocalStorage";

import SpeechToText from "../classes/SpeechToText";
import SpeechToTextOptions from "../models/speechToTextOptions";

const DEFAULTS: SpeechToTextOptions = {
  lang: "",
  continuous: false,
  interim: false,
};

const useSpeechToText = (): [
  boolean,
  SpeechToText,
  [SpeechToTextOptions, React.Dispatch<SpeechToTextOptions>]
] => {
  const sttIsSupported = SpeechToText.isSupported();
  const [manager] = useState<SpeechToText>(() => SpeechToText.getInstance());
  const config = useLocalStorage<SpeechToTextOptions>(
    "SpeechToTextOptions",
    DEFAULTS
  );
  return [sttIsSupported, manager, config];
};

export default useSpeechToText;
