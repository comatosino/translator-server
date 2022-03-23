"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSpeaking = exports.setPitch = exports.setRate = exports.setVolume = exports.setLanguage = exports.setSelectedVoice = exports.setVoices = void 0;
const types_1 = require("../types");
const setVoices = (voices) => {
    console.log("SET VOICES", voices);
    return {
        type: types_1.TextToSpeechActions.SET_VOICES,
        payload: voices,
    };
};
exports.setVoices = setVoices;
const setSelectedVoice = (voice) => {
    console.log("SET SELECTED VOICE", voice);
    return {
        type: types_1.TextToSpeechActions.SET_SELECTED_VOICE,
        payload: voice,
    };
};
exports.setSelectedVoice = setSelectedVoice;
const setLanguage = (lang) => {
    console.log("SET TARGET LANGUAGE", lang);
    return {
        type: types_1.TextToSpeechActions.SET_LANGUAGE,
        payload: lang,
    };
};
exports.setLanguage = setLanguage;
const setVolume = (volume) => {
    console.log("SET VOLUME", volume);
    return {
        type: types_1.TextToSpeechActions.SET_VOLUME,
        payload: volume,
    };
};
exports.setVolume = setVolume;
const setRate = (rate) => {
    console.log("SET RATE", rate);
    return {
        type: types_1.TextToSpeechActions.SET_RATE,
        payload: rate,
    };
};
exports.setRate = setRate;
const setPitch = (pitch) => {
    console.log("SET PITCH", pitch);
    return {
        type: types_1.TextToSpeechActions.SET_PITCH,
        payload: pitch,
    };
};
exports.setPitch = setPitch;
const setSpeaking = (speaking) => {
    console.log("SET SPEAKING", speaking);
    return {
        type: types_1.TextToSpeechActions.SET_SPEAKING,
        payload: speaking,
    };
};
exports.setSpeaking = setSpeaking;
