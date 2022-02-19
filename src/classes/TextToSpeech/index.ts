export default class TextToSpeech {
  private static _instance: TextToSpeech;
  private _manager: SpeechSynthesis;
  private _voices: SpeechSynthesisVoice[] = [];

  private constructor() {
    this._manager = speechSynthesis;
    this._manager.onvoiceschanged = () => {
      this._voices = this._manager.getVoices();
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

  get manager(): SpeechSynthesis {
    return this._manager;
  }

  get voices(): SpeechSynthesisVoice[] {
    if (this._voices) return this._voices;
    return this._manager.getVoices();
  }
}
