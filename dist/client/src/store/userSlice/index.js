"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.delTranslation = exports.addTranslation = exports.setFetching = exports.clearUser = exports.setUser = exports.userSlice = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = {
    profile: { username: "", translations: [] },
    error: "",
    fetching: true,
};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState: exports.initialState,
    reducers: {
        setUser: (state, action) => {
            state.profile = action.payload;
        },
        clearUser: (state) => {
            state.profile = {};
        },
        setFetching: (state, action) => {
            state.fetching = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addTranslation: (state, action) => {
            var _a;
            (_a = state.profile.translations) === null || _a === void 0 ? void 0 : _a.unshift(action.payload);
        },
        delTranslation: (state, action) => {
            var _a;
            state.profile.translations = (_a = state.profile.translations) === null || _a === void 0 ? void 0 : _a.filter((translation) => translation._id !== action.payload);
        },
    },
});
_a = exports.userSlice.actions, exports.setUser = _a.setUser, exports.clearUser = _a.clearUser, exports.setFetching = _a.setFetching, exports.addTranslation = _a.addTranslation, exports.delTranslation = _a.delTranslation;
exports.default = exports.userSlice.reducer;
