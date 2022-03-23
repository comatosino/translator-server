"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const authenticate = (req, res, next) => {
    const bearer = req.headers.authorization;
    const token = bearer === null || bearer === void 0 ? void 0 : bearer.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, payload) => {
            if (err) {
                res.status(403).json({ error: err.message });
            }
            else {
                req.userID = payload.userID; // TODO: add typing so payload accepts userID property
                next();
            }
        });
    }
    else {
        next();
    }
};
exports.default = authenticate;
