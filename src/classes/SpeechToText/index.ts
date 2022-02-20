export default class SpeechToText {
  private static _instance: SpeechToText;
  public manager: SpeechRecognition;

  private constructor() {
    this.manager = new webkitSpeechRecognition();
    this.manager.onstart = (e: Event) => {
      console.log("onstart");
    };
    this.manager.onaudiostart = (e: Event) => {
      console.log("onaudiostart");
    };
    this.manager.onsoundstart = (e: Event) => {
      console.log("onsoundstart");
    };
    this.manager.onspeechstart = (e: Event) => {
      console.log("onspeechstart");
    };
    this.manager.onspeechend = (e: Event) => {
      console.log("onspeechend");
    };
    this.manager.onsoundend = (e: Event) => {
      console.log("onsoundend");
    };
    this.manager.onaudioend = (e: Event) => {
      console.log("onaudioend");
    };
    this.manager.onresult = (e: SpeechRecognitionEvent) => {
      console.log("onresult");
    };
    this.manager.onend = (e: Event) => {
      console.log("onend");
    };
    this.manager.onnomatch = (e: SpeechRecognitionEvent) => {
      console.log("onnomatch");
    };
    this.manager.onerror = (e: Event) => {
      console.log("onend");
    };
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
