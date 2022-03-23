"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const Tune_1 = __importDefault(require("@mui/icons-material/Tune"));
const History_1 = __importDefault(require("@mui/icons-material/History"));
const MicNone_1 = __importDefault(require("@mui/icons-material/MicNone"));
const material_1 = require("@mui/material");
const Translator_1 = require("../pages/app/Translator");
const theme_1 = __importDefault(require("../themes/theme"));
const Header = (props) => {
    const { setPage, handleLogout } = props;
    return (<material_1.Box sx={{ bgcolor: theme_1.default.palette.secondary.main }}>
      <header>
        <nav style={{
            height: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
          <material_1.SpeedDial ariaLabel="speed-dial-menu" direction="right" icon={<Menu_1.default />}>
            <material_1.SpeedDialAction onClick={() => setPage(Translator_1.Page.MAIN)} icon={<MicNone_1.default />} tooltipTitle={"Microphone"}/>
            <material_1.SpeedDialAction onClick={() => setPage(Translator_1.Page.HISTORY)} icon={<History_1.default />} tooltipTitle={"History"}/>
            <material_1.SpeedDialAction onClick={() => setPage(Translator_1.Page.OPTIONS)} icon={<Tune_1.default />} tooltipTitle={"Options"}/>
            <material_1.SpeedDialAction onClick={handleLogout} icon={<Logout_1.default />} tooltipTitle={"Logout"}/>
          </material_1.SpeedDial>
        </nav>
      </header>
    </material_1.Box>);
};
exports.default = Header;
