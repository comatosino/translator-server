import { ChangeEventHandler, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { useAppDispatch } from "../../store/hooks";
import { register, login } from "../../store/userSlice/thunks";

const CLEAR = {
  username: "",
  password: "",
  confirmPassword: "",
};

enum Form {
  LOGIN,
  REGISTER,
}

const Auth: React.FC<{}> = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [formType, setFormType] = useState(Form.LOGIN);
  const [formData, setFormData] = useState(() => CLEAR);

  const clearFormInputs = () => setFormData(() => CLEAR);

  const handleFormInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };
    setFormData(() => newData);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!formData.username.length || !formData.password.length) return;

    const credentials = {
      username: formData.username,
      password: formData.password,
    };

    switch (formType) {
      case Form.LOGIN:
        dispatch(login(credentials));
        break;
      case Form.REGISTER:
        if (formData.password !== formData.confirmPassword) return;
        dispatch(register(credentials));
        break;
      default:
        throw new Error("Error submitting form");
    }
    clearFormInputs();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2}>
          <TextField
            type="text"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleFormInputChange}
          />

          <TextField
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleFormInputChange}
          />

          {formType === Form.REGISTER && (
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleFormInputChange}
            />
          )}

          <Button type="submit" variant="contained">
            {Form[formType]}
          </Button>
        </Stack>
      </form>

      {formType === Form.LOGIN && (
        <Button onClick={() => setFormType(Form.REGISTER)}>
          {Form[Form.REGISTER]}
        </Button>
      )}

      {formType === Form.REGISTER && (
        <Button onClick={() => setFormType(Form.LOGIN)}>
          {Form[Form.LOGIN]}
        </Button>
      )}
    </>
  );
};

export default Auth;
