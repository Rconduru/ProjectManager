import { styled } from "@mui/material/styles";
import { Box, Avatar, Button } from "@mui/material";

export const LoginBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const LoginAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  bgcolor: theme.palette.secondary.main,
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
