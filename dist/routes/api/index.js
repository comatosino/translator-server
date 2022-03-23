"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../../controllers/api");
const router = (0, express_1.Router)();
router.post("/translate", api_1.translate);
router.delete("/translations/:id", api_1.deleteTranslation);
exports.default = router;
