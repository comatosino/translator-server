"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SpeechToText_1 = __importDefault(require("./SpeechToText"));
const init_1 = __importDefault(require("./store/init"));
const actions_1 = require("./store/actions");
const reducer_1 = __importDefault(require("./store/reducer"));
const useSpeechToText = () => {
    const speechToTextAvailable = SpeechToText_1.default.isSupported();
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.default, init_1.default);
    (0, react_1.useEffect)(() => {
        if (speechToTextAvailable) {
            state.speechToText.interface.onstart = (_e) => {
                state.speechToText.clearTranscript();
                dispatch((0, actions_1.clearTranscript)());
                state.speechToText.listening = true;
                dispatch((0, actions_1.setListening)(true));
            };
        }
        state.speechToText.interface.onresult = (e) => {
            try {
                const { transcript } = e.results[0][0];
                state.speechToText.transcript = transcript;
                dispatch((0, actions_1.setTranscript)(transcript));
            }
            catch (error) {
                console.error(error);
            }
        };
        state.speechToText.interface.onend = (_e) => {
            try {
                state.speechToText.listening = false;
                state.speechToText.clearTranscript();
                dispatch((0, actions_1.clearTranscript)());
                dispatch((0, actions_1.setListening)(false));
            }
            catch (error) {
                console.error(error);
            }
        };
        state.speechToText.interface.onnomatch = (_e) => {
            console.log("NO SPEECH-TO-TEXT MATCH");
        };
        state.speechToText.interface.onerror = (e) => {
            const errMessage = e.message || e.error;
            console.log("ERROR", errMessage);
        };
    });
    const microphone = (0, react_1.useMemo)(() => {
        return {
            listening: state.listening,
            transcript: state.transcript,
            language: state.language,
            setLanguage: (lang) => {
                state.speechToText.lang = lang;
                dispatch((0, actions_1.setLanguage)(lang));
            },
            listen() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        state.speechToText.start();
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
            },
            stop() {
                state.speechToText.stop();
            },
            abort() {
                state.speechToText.abort();
            },
            clear() {
                state.speechToText.clearTranscript();
            },
        };
    }, [state.listening, state.transcript, state.language, state.speechToText]);
    const options = (0, react_1.useMemo)(() => {
        return {
            language: state.language,
            continuous: state.continuous,
            setContinuous: (continuous) => {
                state.speechToText.continuous = continuous;
                dispatch((0, actions_1.setContinuous)(continuous));
            },
            interimResults: state.interimResults,
            setInterimResults: (interimResults) => {
                state.speechToText.interimResults = interimResults;
                dispatch((0, actions_1.setInterimResults)(interimResults));
            },
        };
    }, [
        state.language,
        state.continuous,
        state.interimResults,
        state.speechToText,
    ]);
    return {
        speechToTextAvailable,
        microphone,
        options,
    };
};
exports.default = useSpeechToText;
