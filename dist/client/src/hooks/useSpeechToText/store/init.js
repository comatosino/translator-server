"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpeechToText_1 = __importDefault(require("../SpeechToText"));
const INITIAL_STATE = {
    speechToText: SpeechToText_1.default.getInstance(),
    language: navigator.language,
    transcript: "",
    listening: false,
    continuous: false,
    interimResults: false,
};
exports.default = INITIAL_STATE;
