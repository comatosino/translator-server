"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTheme_1 = __importDefault(require("@mui/material/styles/createTheme"));
const theme = (0, createTheme_1.default)({
    palette: {
        mode: "dark",
        primary: {
            main: "#0066cc",
        },
        secondary: {
            main: "#ffcc00",
        },
    },
});
exports.default = theme;
