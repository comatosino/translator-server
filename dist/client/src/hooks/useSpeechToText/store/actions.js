"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInterimResults = exports.setContinuous = exports.setListening = exports.setLanguage = exports.clearTranscript = exports.setTranscript = void 0;
const types_1 = require("../types");
const setTranscript = (transcript) => {
    console.log("SET TRANSCRIPT", transcript);
    return {
        type: types_1.SpeechToTextActions.SET_TRANSCRIPT,
        payload: transcript,
    };
};
exports.setTranscript = setTranscript;
const clearTranscript = () => {
    console.log("CLEAR TRANSCRIPT");
    return {
        type: types_1.SpeechToTextActions.CLEAR_TRANSCRIPT,
    };
};
exports.clearTranscript = clearTranscript;
const setLanguage = (lang) => {
    console.log("SET SOURCE LANGUAGE", lang);
    return {
        type: types_1.SpeechToTextActions.SET_LANGUAGE,
        payload: lang,
    };
};
exports.setLanguage = setLanguage;
const setListening = (bool) => {
    console.log("SET LISTENING", bool);
    return {
        type: types_1.SpeechToTextActions.SET_LISTENING,
        payload: bool,
    };
};
exports.setListening = setListening;
const setContinuous = (bool) => {
    console.log("SET CONTINUOUS", bool);
    return {
        type: types_1.SpeechToTextActions.SET_CONTINUOUS,
        payload: bool,
    };
};
exports.setContinuous = setContinuous;
const setInterimResults = (bool) => {
    console.log("SET INTERIM RESULTS", bool);
    return {
        type: types_1.SpeechToTextActions.SET_INTERIM_RESULTS,
        payload: bool,
    };
};
exports.setInterimResults = setInterimResults;
