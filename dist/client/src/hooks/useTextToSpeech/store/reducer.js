"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const reducerFunctions_1 = require("./reducerFunctions");
const textToSpeechReducer = (state, action) => {
    switch (action.type) {
        case types_1.TextToSpeechActions.SET_VOICES:
            return (0, reducerFunctions_1.__setVoices)(state, action.payload);
        case types_1.TextToSpeechActions.SET_SELECTED_VOICE:
            return (0, reducerFunctions_1.__setSelectedVoice)(state, action.payload);
        case types_1.TextToSpeechActions.SET_LANGUAGE:
            return (0, reducerFunctions_1.__setLanguage)(state, action.payload);
        case types_1.TextToSpeechActions.SET_VOLUME:
            return (0, reducerFunctions_1.__setVolume)(state, action.payload);
        case types_1.TextToSpeechActions.SET_RATE:
            return (0, reducerFunctions_1.__setRate)(state, action.payload);
        case types_1.TextToSpeechActions.SET_PITCH:
            return (0, reducerFunctions_1.__setPitch)(state, action.payload);
        case types_1.TextToSpeechActions.SET_SPEAKING:
            return (0, reducerFunctions_1.__setSpeaking)(state, action.payload);
        default:
            return state;
    }
};
exports.default = textToSpeechReducer;
