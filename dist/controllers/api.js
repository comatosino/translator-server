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
exports.deleteTranslation = exports.translate = void 0;
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../db/models");
const translate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userID)
            res.sendStatus(403);
        const { srcLang, trgLang, text } = req.body;
        const source = srcLang.substring(0, 2);
        let target;
        if (trgLang === "zh-CN" || trgLang === "zh-TW")
            target = trgLang;
        else
            target = trgLang.substring(0, 2);
        if (srcLang !== trgLang) {
            const url = `https://translation.googleapis.com/language/translate/v2`;
            const reqConfig = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                params: {
                    key: `${process.env.GOOGLE_TRANSLATE_API_KEY}`,
                },
            };
            const response = yield axios_1.default.post(url, {
                format: "text",
                q: text,
                source,
                target,
            }, reqConfig);
            // response.data.data.translations gives array of objects
            // e.g. { translations: [ { translatedText: 'auf Deutsch' } ] }
            const { data: { translations }, } = response.data;
            const [result] = translations;
            const newTranslation = yield models_1.Translation.create({
                source: srcLang,
                sourceText: text,
                target: trgLang,
                targetText: result.translatedText,
            });
            yield models_1.User.findByIdAndUpdate(req.userID, {
                $push: { translations: newTranslation._id },
            });
            return res.status(200).json(newTranslation);
        }
        res.status(400).json({ error: "languages are the same" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.translate = translate;
const deleteTranslation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.User.findByIdAndUpdate(req.userID, {
            $pull: { translations: req.params.id },
        });
        yield models_1.Translation.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error deleting translation" });
    }
});
exports.deleteTranslation = deleteTranslation;
