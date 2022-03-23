"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const material_1 = require("@mui/material");
const hooks_1 = require("../../store/hooks");
const thunks_1 = require("../../store/userSlice/thunks");
const CLEAR = {
    username: "",
    password: "",
    confirmPassword: "",
};
var Form;
(function (Form) {
    Form[Form["LOGIN"] = 0] = "LOGIN";
    Form[Form["REGISTER"] = 1] = "REGISTER";
})(Form || (Form = {}));
const Auth = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [formType, setFormType] = (0, react_1.useState)(Form.LOGIN);
    const [formData, setFormData] = (0, react_1.useState)(() => CLEAR);
    const clearFormInputs = () => setFormData(() => CLEAR);
    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        const newData = Object.assign(Object.assign({}, formData), { [name]: value });
        setFormData(() => newData);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.username.length || !formData.password.length)
            return;
        const credentials = {
            username: formData.username,
            password: formData.password,
        };
        switch (formType) {
            case Form.LOGIN:
                dispatch((0, thunks_1.login)(credentials));
                break;
            case Form.REGISTER:
                if (formData.password !== formData.confirmPassword)
                    return;
                dispatch((0, thunks_1.register)(credentials));
                break;
            default:
                throw new Error("Error submitting form");
        }
        clearFormInputs();
    };
    return (<material_1.Stack height={500} width={1} padding={2} justifyContent={"space-between"}>
      <material_1.Box>
        <material_1.Typography padding={3} textAlign={"center"}>
          {Form[formType]}
        </material_1.Typography>

        <form onSubmit={handleFormSubmit}>
          <material_1.Stack spacing={2} width={1}>
            <material_1.TextField type="text" label="Username" name="username" value={formData.username} onChange={handleFormInputChange} required/>

            <material_1.TextField type="password" label="Password" name="password" value={formData.password} onChange={handleFormInputChange} required/>

            {formType === Form.REGISTER && (<material_1.TextField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleFormInputChange} required/>)}

            <material_1.Box textAlign={"center"} paddingTop={3}>
              <material_1.Button type="submit" variant="contained" fullWidth>
                {Form[formType]}
              </material_1.Button>
            </material_1.Box>
          </material_1.Stack>
        </form>
      </material_1.Box>

      {formType === Form.LOGIN && (<material_1.Button onClick={() => setFormType(Form.REGISTER)} fullWidth>
          {`Don't have an account? ${Form[Form.REGISTER]}`}
        </material_1.Button>)}

      {formType === Form.REGISTER && (<material_1.Button onClick={() => setFormType(Form.LOGIN)} fullWidth>
          {`Already have an account? ${Form[Form.LOGIN]}`}
        </material_1.Button>)}
    </material_1.Stack>);
};
exports.default = Auth;
