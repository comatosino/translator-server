import { ChangeEventHandler, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useAppDispatch } from "../store/hooks";
import { register, login } from "../store/userSlice/thunks";

const CLEAR = {
  username: "",
  password: "",
};

const Auth = (): JSX.Element => {
  const [form, setForm] = useState("login");
  const [formData, setFormData] = useState(() => CLEAR);
  const dispatch = useAppDispatch();

  const clearInputs = () => {
    setFormData(() => CLEAR);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };
    setFormData(() => newData);
  };

  const handleFormSubmit = () => {
    if (!formData.username.length || !formData.password.length) return;
    const credentials = {
      username: formData.username,
      password: formData.password,
    };

    form === "register"
      ? dispatch(register(credentials))
      : dispatch(login(credentials));
    clearInputs();
  };

  // LOGIN
  if (form === "login")
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Login</Typography>
        <TextField
          id="filled-helperText"
          label="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <TextField
          id="filled-helperText"
          label="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <Button onClick={handleFormSubmit} variant="text">
          login
        </Button>

        <Button onClick={() => setForm(() => "register")} variant="text">
          no account? signup
        </Button>
      </Box>
    );

  // SIGNUP
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Signup</Typography>
      <TextField
        id="filled-helperText"
        label="username"
        name="username"
        onChange={handleInputChange}
        value={formData.username}
      />

      <TextField
        id="filled-helperText"
        label="password"
        name="password"
        onChange={handleInputChange}
        value={formData.password}
      />
      <Button onClick={handleFormSubmit} variant="text">
        sign up
      </Button>

      <Button onClick={() => setForm(() => "login")} variant="text">
        already have an account? login
      </Button>
    </Box>
  );
};

export default Auth;
