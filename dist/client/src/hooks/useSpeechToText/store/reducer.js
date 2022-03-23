"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const reducerFunctions_1 = require("./reducerFunctions");
const speechToTextReducer = (state, action) => {
    switch (action.type) {
        case types_1.SpeechToTextActions.CLEAR_TRANSCRIPT:
            return (0, reducerFunctions_1.__clearTranscript)(state);
        case types_1.SpeechToTextActions.SET_TRANSCRIPT:
            return (0, reducerFunctions_1.__setTranscript)(state, action.payload);
        case types_1.SpeechToTextActions.SET_LANGUAGE:
            return (0, reducerFunctions_1.__setLanguage)(state, action.payload);
        case types_1.SpeechToTextActions.SET_LISTENING:
            return (0, reducerFunctions_1.__setListening)(state, action.payload);
        case types_1.SpeechToTextActions.SET_CONTINUOUS:
            return (0, reducerFunctions_1.__setContinuous)(state, action.payload);
        case types_1.SpeechToTextActions.SET_INTERIM_RESULTS:
            return (0, reducerFunctions_1.__setInterimResults)(state, action.payload);
        default:
            throw new Error();
    }
};
exports.default = speechToTextReducer;
