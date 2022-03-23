"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useLangTags = (speaker) => {
    const langTags = (0, react_1.useMemo)(() => {
        const voices = speaker.getVoiceArray();
        if (voices.length) {
            const tags = voices.map((voice) => voice.lang);
            return [...new Set(tags)];
        }
        return [];
    }, []);
    return { langTags };
};
exports.default = useLangTags;
