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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
axios_1.default.interceptors.request.use((config) => {
    const token = localStorage.getItem("translator-token");
    if (token) {
        const headers = {
            authorization: `Bearer ${token}`,
        };
        config["headers"] = headers;
    }
    return config;
}, (error) => console.error(error));
class API {
}
exports.default = API;
_a = API;
API.getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `auth/user`;
    return axios_1.default.get(url);
});
API.register = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `auth/register`;
    return axios_1.default.post(url, credentials);
});
API.login = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `auth/login`;
    return axios_1.default.post(url, credentials);
});
API.logout = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `auth/logout`;
    return axios_1.default.delete(url);
});
API.translate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `api/translate`;
    return axios_1.default.post(url, payload);
});
API.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `api/translations/${id}`;
    return axios_1.default.delete(url);
});
