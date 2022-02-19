export interface SpeechToTextOpts {
  lang: string;
  continuous: boolean; // continuous listening
  interim: boolean;    // return results as they are processed
}