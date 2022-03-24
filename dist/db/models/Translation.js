"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TranslationSchema = new mongoose_1.Schema({
    source: {
        type: String,
        required: true,
    },
    sourceText: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    targetText: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Translation = (0, mongoose_1.model)("Translation", TranslationSchema);
exports.default = Translation;
