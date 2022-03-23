"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const actions_1 = require("./store/actions");
const init_1 = __importDefault(require("./store/init"));
const reducer_1 = __importDefault(require("./store/reducer"));
const TextToSpeech_1 = __importDefault(require("./TextToSpeech"));
const useTextToSpeech = () => {
    const textToSpeechAvailable = TextToSpeech_1.default.isSupported();
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.default, init_1.default);
    (0, react_1.useEffect)(() => {
        if (state.textToSpeech.voices) {
            const voices = state.textToSpeech.voices;
            const localVoice = voices[navigator.language][0];
            dispatch((0, actions_1.setVoices)(state.textToSpeech.voices));
            dispatch((0, actions_1.setSelectedVoice)(localVoice));
        }
    }, []);
    const speaker = (0, react_1.useMemo)(() => {
        return {
            dispatch,
            language: state.language,
            speaking: state.speaking,
            getVoiceMap: () => {
                return state.textToSpeech.getVoiceMap();
            },
            getVoiceArray: () => {
                return state.textToSpeech.getVoiceArray();
            },
            speak(script) {
                if (state.selectedVoice) {
                    const utterance = new SpeechSynthesisUtterance(script);
                    utterance.voice = state.selectedVoice;
                    utterance.lang = state.language;
                    utterance.pitch = state.pitch;
                    utterance.rate = state.rate;
                    utterance.volume = state.volume;
                    utterance.onstart = () => dispatch((0, actions_1.setSpeaking)(true));
                    utterance.onend = () => dispatch((0, actions_1.setSpeaking)(false));
                    utterance.onerror = (e) => console.log("ERROR: ", e.error);
                    state.textToSpeech.speak(utterance);
                }
            },
            pause() {
                state.textToSpeech.pause();
            },
            resume() {
                state.textToSpeech.resume();
            },
            cancel() {
                state.textToSpeech.cancel();
            },
        };
    }, [
        state.language,
        state.speaking,
        state.textToSpeech,
        state.selectedVoice,
        state.pitch,
        state.rate,
        state.volume,
    ]);
    const options = (0, react_1.useMemo)(() => {
        return {
            dispatch,
            language: state.language,
            selectedVoice: state.selectedVoice,
            volume: state.volume,
            rate: state.rate,
            pitch: state.pitch,
        };
    }, [
        state.language,
        state.pitch,
        state.rate,
        state.selectedVoice,
        state.volume,
    ]);
    return { textToSpeechAvailable, speaker, options };
};
exports.default = useTextToSpeech;
