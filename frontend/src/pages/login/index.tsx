import * as React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import * as s from "./styles";
import { login } from "../../actions/auth.action";
import { useNavigate } from "react-router-dom";

export interface ILoginProps {}

function Login(props: ILoginProps) {
  const navigate = useNavigate();

  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));

      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("access_token");
      } else {
        navigate("dashboard");
      }
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");

    event.preventDefault();
    setErrorMessage("");
    setError(false);
    const data = new FormData(event.currentTarget);

    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!username || !password) {
      setError(true);
      setErrorMessage("Usuário ou senha são campos obrigatórios");
      return;
    }

    const response = await login(username, password);

    if (response.success) {
      console.log("Login success");

      navigate("dashboard");
      return;
    }
    setError(true);
    setErrorMessage(response.errorMessage || "Erro ao realizar login");
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
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuário"
          name="username"
          autoComplete="username"
          error={error}
          onChange={() => {
            setError(false);
            setErrorMessage("");
          }}
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
          error={error}
          onChange={() => {
            setError(false);
            setErrorMessage("");
          }}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <s.SubmitButton type="submit" fullWidth variant="contained">
          ENTRAR
        </s.SubmitButton>
      </Box>
    </s.LoginBox>
  );
}

export default Login;
