"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const material_1 = require("@mui/material");
const _1 = require(".");
const react_1 = require("react");
const hooks_1 = require("../../store/hooks");
const thunks_1 = require("../../store/userSlice/thunks");
const useSpeechToText_1 = __importDefault(require("../../hooks/useSpeechToText"));
const useTextToSpeech_1 = __importDefault(require("../../hooks/useTextToSpeech"));
const useLangTags_1 = __importDefault(require("../../hooks/useLangTags"));
const Header_1 = __importDefault(require("../../components/Header"));
const Footer_1 = __importDefault(require("../../components/Footer"));
var Page;
(function (Page) {
    Page[Page["HISTORY"] = 0] = "HISTORY";
    Page[Page["MAIN"] = 1] = "MAIN";
    Page[Page["OPTIONS"] = 2] = "OPTIONS";
})(Page = exports.Page || (exports.Page = {}));
const Translator = () => {
    const userDispatch = (0, hooks_1.useAppDispatch)();
    const [page, setPage] = (0, react_1.useState)(Page.MAIN);
    const { speechToTextAvailable, microphone, options: micOptions, } = (0, useSpeechToText_1.default)();
    const { textToSpeechAvailable, speaker, options: speakOptions, } = (0, useTextToSpeech_1.default)();
    const { langTags } = (0, useLangTags_1.default)(speaker);
    const handleLogout = () => {
        userDispatch((0, thunks_1.logout)());
    };
    if (!speechToTextAvailable || !textToSpeechAvailable) {
        return (<>
        {!speechToTextAvailable && (<material_1.Typography>Speech to Text not supported on this browser</material_1.Typography>)}
        {!textToSpeechAvailable && (<material_1.Typography>Text to Speech not supported on this browser</material_1.Typography>)}
      </>);
    }
    return (<material_1.Box width={"100%"} height={"100%"}>
      <Header_1.default handleLogout={handleLogout} setPage={setPage}/>
      {page === Page.MAIN && (<_1.Main speaker={speaker} microphone={microphone} langTags={langTags}/>)}
      {page === Page.OPTIONS && (<_1.Options micOptions={micOptions} speakOptions={speakOptions} getVoices={speaker.getVoiceMap}/>)}
      {page === Page.HISTORY && <_1.Record />}
      <Footer_1.default page={page} setPage={setPage}/>
    </material_1.Box>);
};
exports.default = Translator;
