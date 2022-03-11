import { SpeechSynthesisVoiceMap, TextToSpeechOptions } from "./types";

export default class TextToSpeech {
  private static _instance: TextToSpeech;
  public interface: SpeechSynthesis;
  public voices: SpeechSynthesisVoiceMap | null = null;

  private constructor() {
    this.interface = window.speechSynthesis;
    this.interface.onvoiceschanged = () => {
      const voicesArr = this.interface.getVoices();
      this.voices = voicesArr.reduce(
        (voiceMap: SpeechSynthesisVoiceMap, voice: SpeechSynthesisVoice) => {
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

  getVoiceMap(): SpeechSynthesisVoiceMap | undefined {
    if (!this.voices) return;
    return this.voices;
  }

  // TODO: MODIFY TO ACCEPT NEW PARAMS
  // now we receive the voice itself
  speak(text: string, options: TextToSpeechOptions): void {
    console.log(text);
    console.log(options);
    // const voices = this.getVoiceArray();
    // const utteranceVoice = voices.find(
    //   (voice) => voice.name === options.voice.substring(6)
    // );

    // if (utteranceVoice) {
    //   const utterance = new SpeechSynthesisUtterance(text);
    //   utterance.voice = utteranceVoice;
    //   utterance.volume = options.volume as number;
    //   utterance.pitch = options.pitch as number;
    //   utterance.rate = options.rate as number;
    //   this.interface.speak(utterance);
    // }
  }

  pause(): void {
    this.interface.pause();
  }

  resume(): void {
    this.interface.resume();
  }

  cancel(): void {
    this.interface.cancel();
  }
}
