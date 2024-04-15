import * as React from "react";

import { observer } from "mobx-react-lite";
import { Grid, Paper, Typography } from "@mui/material";
import { Title } from "../../components/title";

import { projectStore } from "../../store/project.store";

export interface IGeneralProps {}

function General(props: IGeneralProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 100,
          }}
        >
          <Title>Total de projetos</Title>
          <Typography component="p" variant="h4">
            {projectStore.state.count}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 100,
          }}
        >
          <Title>Total de usuários</Title>
          <Typography component="p" variant="h4">
            1
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}></Paper>
      </Grid>
    </Grid>
  );
}

export default observer(General);
