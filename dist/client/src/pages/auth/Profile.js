"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../../store/hooks");
const Auth_1 = __importDefault(require("./Auth"));
const Translator_1 = __importDefault(require("../app/Translator"));
const Profile = () => {
    const userProfile = (0, hooks_1.useAppSelector)((state) => state.user.profile);
    return userProfile.username ? <Translator_1.default user={userProfile}/> : <Auth_1.default />;
};
exports.default = Profile;
