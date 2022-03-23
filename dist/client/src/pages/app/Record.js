"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Record.css");
const DeleteForever_1 = __importDefault(require("@mui/icons-material/DeleteForever"));
const material_1 = require("@mui/material");
const languages_json_1 = __importDefault(require("../../utils/maps/languages.json"));
const countries_json_1 = __importDefault(require("../../utils/maps/countries.json"));
const hooks_1 = require("../../store/hooks");
const thunks_1 = require("../../store/userSlice/thunks");
const utils_1 = require("../../utils");
const Record = () => {
    const userDispatch = (0, hooks_1.useAppDispatch)();
    const translations = (0, hooks_1.useAppSelector)((state) => { var _a; return (_a = state.user.profile) === null || _a === void 0 ? void 0 : _a.translations; });
    if (!translations || !translations.length) {
        return (<material_1.Stack maxHeight={0.8} minHeight={0.8} padding={1} boxSizing={"border-box"} justifyContent={"center"}>
        <material_1.Typography textAlign={"center"}>No history to display!</material_1.Typography>
      </material_1.Stack>);
    }
    return (<material_1.Stack id={"history"} overflow={"auto"} maxHeight={0.8} minHeight={0.8} padding={1} boxSizing={"border-box"}>
      {translations.map((translation) => {
            const [srcLangCode, srcCountryCode] = (0, utils_1.splitLangTag)(translation.source);
            const [trgLangCode, trgCountryCode] = (0, utils_1.splitLangTag)(translation.target);
            return (<material_1.Box key={translation._id} height={1} margin={1} position={"relative"}>
            <material_1.Card elevation={5}>
              <material_1.Box position={"absolute"} top={5} right={5}>
                <material_1.IconButton onClick={() => userDispatch((0, thunks_1.deleteTranslation)(translation._id))} aria-label="delete">
                  <DeleteForever_1.default />
                </material_1.IconButton>
              </material_1.Box>
              <material_1.CardContent>
                <material_1.Stack spacing={1} paddingBottom={1}>
                  <material_1.Typography>{languages_json_1.default[srcLangCode]["endonym"]}</material_1.Typography>

                  <material_1.Stack direction={"row"}>
                    <img loading="lazy" width="50" src={`https://flagcdn.com/${srcCountryCode.toLowerCase()}.svg`} alt={""}/>
                  </material_1.Stack>

                  <material_1.Typography>
                    {`
                      ${languages_json_1.default[srcLangCode]["exonym"]["en"]} •
                      ${countries_json_1.default[srcCountryCode]}
                    `}
                  </material_1.Typography>
                  <material_1.Typography>{translation.sourceText}</material_1.Typography>
                </material_1.Stack>
                <material_1.Divider variant="middle"/>
                <material_1.Stack spacing={1} alignItems={"flex-end"} paddingTop={1}>
                  <material_1.Typography>{languages_json_1.default[trgLangCode]["endonym"]}</material_1.Typography>
                  <img loading="lazy" width="50" src={`https://flagcdn.com/${trgCountryCode.toLowerCase()}.svg`} alt={""}/>
                  <material_1.Typography>
                    {`
                      ${languages_json_1.default[trgLangCode]["exonym"]["en"]} •
                      ${countries_json_1.default[trgCountryCode]}
                    `}
                  </material_1.Typography>
                  <material_1.Typography>{translation.targetText}</material_1.Typography>
                </material_1.Stack>
              </material_1.CardContent>
            </material_1.Card>
          </material_1.Box>);
        })}
    </material_1.Stack>);
};
exports.default = Record;
