import { Typography, TypographyOwnProps } from "@mui/material";
import * as React from "react";

export interface ITitleProps extends TypographyOwnProps {}

export function Title(props: React.PropsWithChildren<ITitleProps>) {
  const { children, ...rest } = props;

  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      {...rest}
    >
      {children}
    </Typography>
  );
}
