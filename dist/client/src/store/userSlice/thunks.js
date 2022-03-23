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
exports.deleteTranslation = exports.logout = exports.login = exports.register = exports.getUser = void 0;
const _1 = require(".");
const API_1 = __importDefault(require("../../utils/API"));
const getUser = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, _1.setFetching)(true));
        const response = yield API_1.default.getUser();
        const { profile } = response.data;
        dispatch((0, _1.setUser)(profile));
    }
    catch (error) {
        console.error(error);
        localStorage.removeItem("translator-token");
    }
    finally {
        dispatch((0, _1.setFetching)(false));
    }
});
exports.getUser = getUser;
const register = (credentials) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, _1.setFetching)(true));
        const response = yield API_1.default.register(credentials);
        const { profile, token } = response.data;
        localStorage.setItem("translator-token", token);
        dispatch((0, _1.setUser)(profile));
    }
    catch (error) {
        console.error(error);
        localStorage.removeItem("translator-token");
        dispatch((0, _1.clearUser)());
    }
    finally {
        dispatch((0, _1.setFetching)(false));
    }
});
exports.register = register;
const login = (credentials) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, _1.setFetching)(true));
        const response = yield API_1.default.login(credentials);
        const { profile, token } = response.data;
        localStorage.setItem("translator-token", token);
        dispatch((0, _1.setUser)(profile));
    }
    catch (error) {
        console.error(error);
        localStorage.removeItem("translator-token");
        dispatch((0, _1.clearUser)());
    }
    finally {
        dispatch((0, _1.setFetching)(false));
    }
});
exports.login = login;
const logout = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, _1.setFetching)(true));
        yield API_1.default.logout();
    }
    catch (error) {
        console.error(error);
    }
    finally {
        localStorage.removeItem("translator-token");
        dispatch((0, _1.clearUser)());
        dispatch((0, _1.setFetching)(false));
    }
});
exports.logout = logout;
const deleteTranslation = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield API_1.default.delete(id);
        dispatch((0, _1.delTranslation)(id));
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteTranslation = deleteTranslation;
