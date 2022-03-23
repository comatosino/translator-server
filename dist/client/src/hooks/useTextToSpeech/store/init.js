"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextToSpeech_1 = __importDefault(require("../TextToSpeech"));
const INITIAL_STATE = {
    textToSpeech: TextToSpeech_1.default.getInstance(),
    speaking: false,
    language: navigator.language,
    selectedVoice: null,
    voices: null,
    volume: 1,
    rate: 1,
    pitch: 1,
};
exports.default = INITIAL_STATE;
