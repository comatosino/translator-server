"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__setPitch = exports.__setRate = exports.__setVolume = exports.__setLanguage = exports.__setVoices = exports.__setSelectedVoice = exports.__setSpeaking = void 0;
const __setSpeaking = (state, payload) => {
    return Object.assign(Object.assign({}, state), { speaking: payload });
};
exports.__setSpeaking = __setSpeaking;
const __setSelectedVoice = (state, payload) => {
    return Object.assign(Object.assign({}, state), { selectedVoice: payload });
};
exports.__setSelectedVoice = __setSelectedVoice;
const __setVoices = (state, payload) => {
    return Object.assign(Object.assign({}, state), { voices: payload });
};
exports.__setVoices = __setVoices;
const __setLanguage = (state, payload) => {
    return Object.assign(Object.assign({}, state), { language: payload });
};
exports.__setLanguage = __setLanguage;
const __setVolume = (state, payload) => {
    return Object.assign(Object.assign({}, state), { volume: payload });
};
exports.__setVolume = __setVolume;
const __setRate = (state, payload) => {
    return Object.assign(Object.assign({}, state), { rate: payload });
};
exports.__setRate = __setRate;
const __setPitch = (state, payload) => {
    return Object.assign(Object.assign({}, state), { pitch: payload });
};
exports.__setPitch = __setPitch;
