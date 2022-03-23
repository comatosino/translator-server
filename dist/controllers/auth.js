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
exports.logout = exports.login = exports.register = exports.getUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../db/models");
const translationSortedDesc = {
    path: "translations",
    options: { sort: { createdAt: -1 } },
};
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userID)
            return res.status(401).json({ error: "Please login" });
        const user = yield models_1.User.findById(req.userID).populate(translationSortedDesc);
        if (!user)
            throw new Error();
        res.status(200).json({
            profile: {
                username: user.username,
                translations: user.translations,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching user profile" });
    }
});
exports.getUser = getUser;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ error: "Username and password required" });
        }
        if (req.body.password.length < 8) {
            return res.status(400).json({ error: "Password too short" });
        }
        let user = yield models_1.User.findOne({ username: req.body.username });
        if (user) {
            return res.status(401).json({ error: "User already exists" });
        }
        user = yield models_1.User.create(req.body);
        const token = jsonwebtoken_1.default.sign({ userID: user._id }, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });
        res.status(201).json({
            token,
            profile: {
                username: user.username,
                translations: [],
            },
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ error: "Username and password required" });
        }
        const user = yield models_1.User.findOne({ username: req.body.username }).populate(translationSortedDesc);
        if (!user) {
            res.status(401).json({ error: "Wrong username and/or password" });
        }
        else if (!(yield bcrypt_1.default.compare(req.body.password, user.password))) {
            res.status(401).json({ error: "Wrong username and/or password" });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ userID: user.id }, process.env.SECRET_KEY, {
                expiresIn: "24h",
            });
            res.status(200).json({
                token,
                profile: {
                    username: user.username,
                    translations: user.translations,
                },
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.userID ? res.sendStatus(204) : res.sendStatus(403);
});
exports.logout = logout;
