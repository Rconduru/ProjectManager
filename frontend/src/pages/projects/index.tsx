import * as React from "react";

import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { projectStore } from "../../store/project.store";
import ProjectDetail from "./components/projectDetail";

export interface IProjectsProps {}

function Projects(props: IProjectsProps) {
  return (
    <Grid item xs={12}>
      {projectStore.state.projects.map((project) => (
        <ProjectDetail key={project.id} project={project} />
      ))}
    </Grid>
  );
}

export default observer(Projects);
