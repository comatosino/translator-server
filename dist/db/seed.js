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
const _1 = __importDefault(require("."));
const models_1 = require("./models");
const addData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.User.create({
            username: "demo",
            password: "password",
            translations: [
                yield models_1.Translation.create({
                    source: "en-US",
                    sourceText: "hello",
                    target: "es-US",
                    targetText: "hola",
                }),
            ],
        });
    }
    catch (error) {
        console.error(error);
    }
});
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield _1.default.connect();
        if (connection) {
            yield (connection === null || connection === void 0 ? void 0 : connection.dropDatabase());
            yield addData();
        }
        console.log("db seeded successfully!");
    }
    catch (error) {
        console.log("error seeding database!");
        console.error(error);
    }
    finally {
        yield _1.default.disconnect();
    }
});
seed();
