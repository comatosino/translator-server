"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextToSpeech {
    constructor() {
        this.voices = null;
        this.speaking = false;
        this.interface = window.speechSynthesis;
        this.interface.onvoiceschanged = () => {
            const voicesArr = this.interface.getVoices();
            this.voices = voicesArr.reduce((voiceMap, voice) => {
                voiceMap[voice.lang]
                    ? voiceMap[voice.lang].push(voice)
                    : (voiceMap[voice.lang] = [voice]);
                return voiceMap;
            }, {});
        };
    }
    static isSupported() {
        return "speechSynthesis" in window || "webkitSpeechSynthesis" in window;
    }
    static getInstance() {
        if (this._instance)
            return this._instance;
        this._instance = new TextToSpeech();
        return this._instance;
    }
    getVoiceArray() {
        return this.interface.getVoices();
    }
    getVoiceMap() {
        if (!this.voices)
            return;
        return this.voices;
    }
    speak(utterance) {
        if (utterance) {
            this.interface.speak(utterance);
        }
    }
    pause() {
        this.interface.pause();
    }
    resume() {
        this.interface.resume();
    }
    cancel() {
        this.interface.cancel();
    }
}
exports.default = TextToSpeech;
