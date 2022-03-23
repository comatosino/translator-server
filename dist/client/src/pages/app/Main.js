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
const MicNone_1 = __importDefault(require("@mui/icons-material/MicNone"));
const SwapHoriz_1 = __importDefault(require("@mui/icons-material/SwapHoriz"));
const material_1 = require("@mui/material");
const languages_json_1 = __importDefault(require("../../utils/maps/languages.json"));
const countries_json_1 = __importDefault(require("../../utils/maps/countries.json"));
const react_1 = require("react");
const actions_1 = require("../../hooks/useTextToSpeech/store/actions");
const hooks_1 = require("../../store/hooks");
const userSlice_1 = require("../../store/userSlice");
const API_1 = __importDefault(require("../../utils/API"));
const utils_1 = require("../../utils");
const Main = ({ microphone, speaker, langTags }) => {
    const { language: srcLang, listening, transcript } = microphone;
    const { language: trgLang, speaking } = speaker;
    const userDispatch = (0, hooks_1.useAppDispatch)();
    const [status, setStatus] = (0, react_1.useState)("Ready!");
    const [call, setCall] = (0, react_1.useState)({
        text: "",
        countryCode: "",
    });
    const [response, setResponse] = (0, react_1.useState)({
        text: "",
        countryCode: "",
    });
    (0, react_1.useEffect)(() => {
        if (speaking)
            setStatus("Speaking...");
        else if (!speaking && status === "Speaking...")
            setStatus("Ready!");
    }, [speaking]);
    (0, react_1.useEffect)(() => {
        if (!listening && status === "Listening...")
            setStatus("Ready!");
    }, [listening]);
    const translate = (0, react_1.useCallback)((transcript) => __awaiter(void 0, void 0, void 0, function* () {
        setStatus("Translating...");
        setCall({
            text: transcript,
            countryCode: srcLang.substring(3),
        });
        // don't send request to api if languages are the same
        if (srcLang.substring(0, 2) === trgLang.substring(0, 2)) {
            setResponse({
                text: transcript,
                countryCode: srcLang.substring(3),
            });
            speaker.speak(transcript);
        }
        else {
            const payload = {
                srcLang,
                text: transcript,
                trgLang,
            };
            const response = yield API_1.default.translate(payload);
            const translation = response.data;
            setResponse({
                text: translation.targetText,
                countryCode: trgLang.substring(3),
            });
            userDispatch((0, userSlice_1.addTranslation)(translation));
            speaker.speak(translation.targetText);
        }
    }), [speaker, srcLang, trgLang, userDispatch]);
    (0, react_1.useEffect)(() => {
        if (transcript)
            translate(transcript);
    }, [translate, transcript]);
    const setSourceLang = (src) => {
        microphone.setLanguage(src);
    };
    const handleSetSourceLang = (e) => {
        setSourceLang(e.target.value);
    };
    const setTargetLang = (trg) => {
        const voices = speaker.getVoiceMap();
        if (voices) {
            const defaultVoice = voices[trg][0];
            speaker.dispatch((0, actions_1.setLanguage)(trg));
            speaker.dispatch((0, actions_1.setSelectedVoice)(defaultVoice));
        }
    };
    const handleSetTargetLang = (e) => {
        setTargetLang(e.target.value);
    };
    const handleSwapLangs = () => {
        const srcTemp = srcLang;
        const trgTemp = trgLang;
        setSourceLang(trgTemp);
        setTargetLang(srcTemp);
    };
    const handleListen = () => {
        setStatus("Listening...");
        setCall({
            text: "",
            countryCode: "",
        });
        setResponse({
            text: "",
            countryCode: "",
        });
        microphone.listen();
    };
    const [srcLangCode, srcCountryCode] = (0, utils_1.splitLangTag)(srcLang);
    const [trgLangCode, trgCountryCode] = (0, utils_1.splitLangTag)(trgLang);
    return (<material_1.Stack id={"main"} position={"relative"} boxSizing={"border-box"} justifyContent={"center"} spacing={1} minHeight={0.8} maxHeight={0.8} padding={3}>
      <material_1.Stack position={"absolute"} top={0} left={0} right={0} padding={5} spacing={1}>
        {call.text && (<material_1.Stack padding={1} flexDirection={"row"} alignItems={"center"}>
            <img height="20" src={`https://flagcdn.com/${call.countryCode.toLowerCase()}.svg`} alt={""}/>
            <material_1.Typography fontSize={14} paddingLeft={1}>
              {call.text}
            </material_1.Typography>
          </material_1.Stack>)}

        {response.text && (<material_1.Stack justifyContent={"flex-end"} alignItems={"center"} flexDirection={"row"} padding={1}>
            <material_1.Typography fontSize={14} paddingRight={1} textAlign={"right"}>
              {response.text}
            </material_1.Typography>
            <img height="20" src={`https://flagcdn.com/${response.countryCode.toLowerCase()}.svg`} alt={""}/>
          </material_1.Stack>)}
      </material_1.Stack>

      <material_1.Box display={"flex"} flexDirection={"row"} width={1} justifyContent={"space-evenly"} alignItems={"center"}>
        <material_1.Box width={150}>
          <material_1.FormControl variant="standard" fullWidth>
            <material_1.InputLabel id="src-lang">
              {`
                ${languages_json_1.default[srcLangCode]["endonym"]} •
                ${languages_json_1.default[srcLangCode]["exonym"]["en"]}
              `}
            </material_1.InputLabel>
            <material_1.Select label="Source Language" id="src-lang" name="source" value={microphone.language || ""} onChange={handleSetSourceLang}>
              {langTags.map((tag) => {
            const [, countryCode] = (0, utils_1.splitLangTag)(tag);
            return (<material_1.MenuItem key={tag} value={tag}>
                    <img loading="lazy" width="100" src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`} alt={""}/>
                  </material_1.MenuItem>);
        })}
            </material_1.Select>
            <material_1.FormHelperText sx={{ overflow: "visible" }}>
              {countries_json_1.default[srcCountryCode]}
            </material_1.FormHelperText>
          </material_1.FormControl>
        </material_1.Box>

        <material_1.IconButton onClick={handleSwapLangs}>
          <SwapHoriz_1.default />
        </material_1.IconButton>

        <material_1.Box width={150}>
          <material_1.FormControl fullWidth variant="standard">
            <material_1.InputLabel id="src-lang">
              {`
                ${languages_json_1.default[trgLangCode]["endonym"]} •
                ${languages_json_1.default[trgLangCode]["exonym"]["en"]}
              `}
            </material_1.InputLabel>

            <material_1.Select label="Target Language" id="trg-lang" name="target" value={speaker.language || ""} onChange={handleSetTargetLang}>
              {langTags.map((tag) => {
            const [, country] = (0, utils_1.splitLangTag)(tag);
            return (<material_1.MenuItem key={tag} value={tag}>
                    <img loading="lazy" width="100" src={`https://flagcdn.com/${country.toLowerCase()}.svg`} alt={""}/>
                  </material_1.MenuItem>);
        })}
            </material_1.Select>
            <material_1.FormHelperText>{countries_json_1.default[trgCountryCode]}</material_1.FormHelperText>
          </material_1.FormControl>
        </material_1.Box>
      </material_1.Box>
      <material_1.Box position={"absolute"} bottom={50} left={0} right={0} display={"flex"} justifyContent={"center"}>
        <material_1.IconButton onClick={handleListen} disabled={status !== "Ready!"} aria-label="microphone">
          <MicNone_1.default sx={{ fontSize: "5em" }}/>
        </material_1.IconButton>
      </material_1.Box>
      <material_1.Typography textAlign={"center"} position={"absolute"} bottom={20} left={0} right={0}>
        {status}
      </material_1.Typography>
    </material_1.Stack>);
};
exports.default = Main;
