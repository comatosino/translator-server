export default interface SpeechToTextOptions {
  lang: string;
  continuous: boolean; // continuous listening
  interimResults: boolean; // return results as they are processed
}
