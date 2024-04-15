import React, { PropsWithChildren } from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export interface IMainContentProps {}

export function MainContent(props: PropsWithChildren<IMainContentProps>) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Outlet />
    </Container>
  );
}
