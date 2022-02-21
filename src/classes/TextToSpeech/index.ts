import VoiceMap from "../../models/VoiceMap";

export default class TextToSpeech {
  private static _instance: TextToSpeech;
  public interface: SpeechSynthesis;
  public voices: VoiceMap = {};

  private constructor() {
    this.interface = speechSynthesis;
    this.interface.onvoiceschanged = () => {
      const voicesArr = this.interface.getVoices();
      this.voices = voicesArr.reduce(
        (voiceMap: VoiceMap, voice: SpeechSynthesisVoice) => {
          if (voiceMap[voice.lang]) {
            voiceMap[voice.lang].push(voice);
          } else {
            voiceMap[voice.lang] = [voice];
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

  getVoiceArray(): SpeechSynthesisVoice[] {
    return this.interface.getVoices();
  }
}
