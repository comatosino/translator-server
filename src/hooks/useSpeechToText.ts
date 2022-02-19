import React, { useState } from "react";
import useLocalStorage from "./useLocalStorage";

import SpeechToText from "../classes/SpeechToText";
import { SpeechToTextOpts } from "../models/SpeechToTextConfig";

const DEFAULTS: SpeechToTextOpts = {
  lang: "",
  continuous: false,
  interim: false,
};

const useSpeechToText = (): [
  boolean,
  SpeechToText,
  [SpeechToTextOpts, React.Dispatch<SpeechToTextOpts>]
] => {
  const _speechToTextAvailable = SpeechToText.isSupported();
  const [_speechToText] = useState<SpeechToText>(SpeechToText.getInstance());
  const _config = useLocalStorage<SpeechToTextOpts>(
    "SpeechToTextOptions",
    DEFAULTS
  );
  return [_speechToTextAvailable, _speechToText, _config];
};

export default useSpeechToText;
