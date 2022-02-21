export default class SpeechToText {
  private static _instance: SpeechToText;
  public interface: SpeechRecognition;

  private constructor() {
    this.interface = new webkitSpeechRecognition();
    this.interface.onstart = (e: Event) => {
      console.log("onstart");
    };
    this.interface.onaudiostart = (e: Event) => {
      console.log("onaudiostart");
    };
    this.interface.onsoundstart = (e: Event) => {
      console.log("onsoundstart");
    };
    this.interface.onspeechstart = (e: Event) => {
      console.log("onspeechstart");
    };
    this.interface.onspeechend = (e: Event) => {
      console.log("onspeechend");
    };
    this.interface.onsoundend = (e: Event) => {
      console.log("onsoundend");
    };
    this.interface.onaudioend = (e: Event) => {
      console.log("onaudioend");
    };
    this.interface.onresult = (e: SpeechRecognitionEvent) => {
      console.log("onresult");
    };
    this.interface.onend = (e: Event) => {
      console.log("onend");
    };
    this.interface.onnomatch = (e: SpeechRecognitionEvent) => {
      console.log("onnomatch");
    };
    this.interface.onerror = (e: Event) => {
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
