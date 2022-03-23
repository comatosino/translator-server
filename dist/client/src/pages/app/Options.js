"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const types_1 = require("../../hooks/useTextToSpeech/types");
const languages_json_1 = __importDefault(require("../../utils/maps/languages.json"));
const countries_json_1 = __importDefault(require("../../utils/maps/countries.json"));
const actions_1 = require("../../hooks/useTextToSpeech/store/actions");
const utils_1 = require("../../utils");
const Options = ({ micOptions, speakOptions, getVoices }) => {
    var _a;
    const altVoices = getVoices()[speakOptions.language];
    const [trgLangCode, trgCountryCode] = (0, utils_1.splitLangTag)(speakOptions.language);
    const handleSetVoice = (e) => {
        const voice = altVoices.find((voice) => voice.name === e.target.value);
        if (voice)
            speakOptions.dispatch((0, actions_1.setSelectedVoice)(voice));
    };
    return (<material_1.Stack id={"options"} spacing={3} padding={3} maxHeight={0.8} minHeight={0.8} boxSizing={"border-box"}>
      <material_1.Typography component="h2">
        <material_1.Divider>Voice Options</material_1.Divider>
      </material_1.Typography>

      <material_1.FormControl>
        <material_1.InputLabel>{`${languages_json_1.default[trgLangCode]["exonym"]["en"]} (${countries_json_1.default[trgCountryCode]}) Alternate Voices`}</material_1.InputLabel>
        <material_1.Select labelId="alt-voice-select-label" id="alt-voice-select" value={((_a = speakOptions.selectedVoice) === null || _a === void 0 ? void 0 : _a.name) || ""} label={`${languages_json_1.default[trgLangCode]["exonym"]["en"]} (${countries_json_1.default[trgCountryCode]}) Alternate Voices`} onChange={handleSetVoice}>
          {altVoices.map((voice) => {
            return (<material_1.MenuItem key={voice.name} value={voice.name}>
                {voice.name}
              </material_1.MenuItem>);
        })}
        </material_1.Select>
      </material_1.FormControl>

      <material_1.Typography id="volume-slider">Volume</material_1.Typography>
      <material_1.Slider name={types_1.TextToSpeechActions[types_1.TextToSpeechActions.SET_VOLUME]} aria-labelledby="volume-slider" value={speakOptions.volume} getAriaValueText={() => `${speakOptions.volume}`} valueLabelDisplay="auto" step={0.25} marks min={0} max={1} onChange={(_e, value) => speakOptions.dispatch((0, actions_1.setVolume)(value))}/>
      <material_1.Typography id="pitch-slider">Pitch</material_1.Typography>
      <material_1.Slider name={types_1.TextToSpeechActions[types_1.TextToSpeechActions.SET_PITCH]} aria-labelledby="pitch-slider" value={speakOptions.pitch} getAriaValueText={() => `${speakOptions.pitch}`} valueLabelDisplay="auto" step={0.25} marks min={0} max={2} onChange={(_e, value) => speakOptions.dispatch((0, actions_1.setPitch)(value))}/>

      <material_1.Typography id="rate-slider">Rate</material_1.Typography>
      <material_1.Slider name={types_1.TextToSpeechActions[types_1.TextToSpeechActions.SET_RATE]} aria-labelledby="rate-slider" value={speakOptions.rate} getAriaValueText={() => `${speakOptions.rate}`} valueLabelDisplay="auto" step={0.1} marks min={0.1} max={10} onChange={(_e, value) => speakOptions.dispatch((0, actions_1.setRate)(value))}/>
    </material_1.Stack>);
};
exports.default = Options;
