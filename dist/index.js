"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./middleware");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
db_1.default.connect();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(middleware_1.authenticate);
app.use(routes_1.default);
app.get("*", (_req, res) => {
    res.status(404).json({ message: "Page not found" });
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
