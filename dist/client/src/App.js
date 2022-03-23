"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const hooks_1 = require("./store/hooks");
const thunks_1 = require("./store/userSlice/thunks");
const userSlice_1 = require("./store/userSlice");
const auth_1 = require("./pages/auth");
const material_1 = require("@mui/material");
const ThemeProvider_1 = __importDefault(require("@mui/system/ThemeProvider"));
const theme_1 = __importDefault(require("./themes/theme"));
const App = () => {
    const userDispatch = (0, hooks_1.useAppDispatch)();
    const fetchingUser = (0, hooks_1.useAppSelector)((state) => state.user.fetching);
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem("translator-token");
        if (token)
            userDispatch((0, thunks_1.getUser)());
        else
            userDispatch((0, userSlice_1.setFetching)(false));
    }, [userDispatch]);
    return (<ThemeProvider_1.default theme={theme_1.default}>
      <material_1.Container id="app" maxWidth="sm">
        <material_1.Paper>
          <material_1.Box sx={{
            height: '100vh',
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {fetchingUser ? <material_1.CircularProgress /> : <auth_1.Profile />}
          </material_1.Box>
        </material_1.Paper>
      </material_1.Container>
    </ThemeProvider_1.default>);
};
exports.default = App;
