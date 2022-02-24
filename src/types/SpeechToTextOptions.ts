type SpeechToTextOptions = {
  lang: string;
  continuous: boolean; // keep listening until user manually ends transcription
  interimResults: boolean; // return results before they are finalized
};

export default SpeechToTextOptions;
