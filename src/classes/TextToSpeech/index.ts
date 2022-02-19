export default class TextToSpeech {
  private static _instance: TextToSpeech;
  public manager: SpeechSynthesis;
  public voices: {
    [langCode: string]: SpeechSynthesisVoice[];
  } = {};

  private constructor() {
    this.manager = speechSynthesis;
    this.manager.onvoiceschanged = () => {
      const voicesArr = this.manager.getVoices();
      this.voices = voicesArr.reduce(
        (
          voiceMap: {
            [langCode: string]: SpeechSynthesisVoice[];
          },
          voice: SpeechSynthesisVoice
        ) => {
          const prefix = voice.lang.substring(0, 2);
          if (voiceMap[prefix]) {
            voiceMap[prefix].push(voice);
          } else {
            voiceMap[prefix] = [voice];
          }
          return voiceMap;
        },
        {}
      );
    };
  }

  static isSupported(): boolean {
    return "speechSynthesis" in window || "webkitSpeechSynthesis" in window;
  }

  static getInstance(): TextToSpeech {
    if (this._instance) return this._instance;
    this._instance = new TextToSpeech();
    return this._instance;
  }
}
