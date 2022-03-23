"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpeechToText {
    constructor() {
        this.listening = false;
        this.transcript = "";
        const Recognition = webkitSpeechRecognition || SpeechRecognition;
        this.interface = new Recognition();
        this.interface.lang = navigator.language;
    }
    static isSupported() {
        return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    }
    static getInstance() {
        if (this._instance)
            return this._instance;
        this._instance = new SpeechToText();
        return this._instance;
    }
    get lang() {
        return this.interface.lang;
    }
    set lang(lang) {
        this.interface.lang = lang;
    }
    get continuous() {
        return this.interface.continuous;
    }
    set continuous(bool) {
        this.interface.continuous = bool;
    }
    get interimResults() {
        return this.interface.interimResults;
    }
    set interimResults(bool) {
        this.interface.interimResults = bool;
    }
    start() {
        this.clearTranscript();
        this.listening = true;
        this.interface.start();
    }
    stop() {
        this.listening = false;
        this.interface.stop();
    }
    abort() {
        this.clearTranscript();
        this.listening = false;
        this.interface.abort();
    }
    clearTranscript() {
        this.transcript = "";
    }
}
exports.default = SpeechToText;
