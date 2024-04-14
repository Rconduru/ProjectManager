import * as React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import * as s from "./styles";

export interface ILoginProps {}

function Login(props: ILoginProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  return (
    <s.LoginBox>
      <s.LoginAvatar>
        <LockOutlinedIcon />
      </s.LoginAvatar>
      <Typography component="h1" variant="h5">
        Project Manager - Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuário"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <s.SubmitButton type="submit" fullWidth variant="contained">
          Sign In
        </s.SubmitButton>
      </Box>
    </s.LoginBox>
  );
}

export default Login;
