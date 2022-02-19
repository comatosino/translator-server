export default class SpeechToText {
  private static _instance: SpeechToText;
  private _manager: SpeechRecognition;

  private constructor() {
    this._manager = new webkitSpeechRecognition();

    this._manager.onstart = (e: Event) => {console.log('onstart')};
    this._manager.onaudiostart = (e: Event) => {console.log('onaudiostart')};
    this._manager.onsoundstart = (e: Event) => {console.log('onsoundstart')};
    this._manager.onspeechstart = (e: Event) => {console.log('onspeechstart')};
    this._manager.onspeechend = (e: Event) => {console.log('onspeechend')};
    this._manager.onsoundend = (e: Event) => {console.log('onsoundend')};
    this._manager.onaudioend = (e: Event) => {console.log('onaudioend')};
    this._manager.onresult = (e: SpeechRecognitionEvent) => {console.log('onresult')};
    this._manager.onend = (e: Event) => {console.log('onend')};

    this._manager.onnomatch = (e: SpeechRecognitionEvent) => {console.log('onnomatch')};
    this._manager.onerror = (e: Event) => {console.log('onend')};
  }

  static isSupported(): boolean {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  }

  static getInstance(): SpeechToText {
    if (this._instance) return this._instance;
    this._instance = new SpeechToText();
    return this._instance;
  }
}
