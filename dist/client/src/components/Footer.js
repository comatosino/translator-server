"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const Translator_1 = require("../pages/app/Translator");
const History_1 = __importDefault(require("@mui/icons-material/History"));
const MicNone_1 = __importDefault(require("@mui/icons-material/MicNone"));
const theme_1 = __importDefault(require("../themes/theme"));
const Footer = ({ page, setPage }) => {
    return (<material_1.Box sx={{ bgcolor: theme_1.default.palette.secondary.main }}>
      <footer>
        <nav style={{
            height: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
        }}>
          {/* GOTO HISTORY */}
          {page === Translator_1.Page.MAIN && (<material_1.Fab onClick={() => setPage(Translator_1.Page.HISTORY)} color="primary" aria-label="mic">
              <History_1.default />
            </material_1.Fab>)}

          {/* GOTO MICROPHONE */}
          {(page === Translator_1.Page.HISTORY || page === Translator_1.Page.OPTIONS) && (<material_1.Fab onClick={() => setPage(Translator_1.Page.MAIN)} color="primary" aria-label="mic">
              <MicNone_1.default />
            </material_1.Fab>)}
        </nav>
      </footer>
    </material_1.Box>);
};
exports.default = Footer;
