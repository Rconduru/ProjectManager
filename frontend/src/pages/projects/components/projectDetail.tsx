import * as React from "react";
import { Title } from "../../../components/title";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { IProjectWithTasks } from "../../../models/project.model";
import { createNewTask } from "../../../actions/task.action";

export interface IProjectDetailProps {
  project: IProjectWithTasks;
}

export default function ProjectDetail(props: IProjectDetailProps) {
  const [openTaskDetail, setOpenTaskDetail] = React.useState(false);
  const [projectId, setProjectId] = React.useState<number>(-1);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  async function submitNewTaks(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString();
    const endedAt = data.get("endedAt")?.toString();

    if (!title || !description || !endedAt) {
      setErrorMessage("Todos os campos são obrigatórios");
      return;
    }

    const currentDate = new Date().getDate();
    if (new Date(endedAt).getDate() < currentDate) {
      setErrorMessage(
        "Data de encerramento não pode ser menor que a data atual"
      );
      return;
    }

    const result = await createNewTask({
      title,
      description,
      projectId,
      endedAt: new Date(endedAt),
    });

    if (!result.success) {
      setErrorMessage(result.errorMessage);
    } else {
      setOpenTaskDetail(false);
    }
  }

  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", mb: 2 }}>
        <Title>{props.project.title}</Title>
        <Typography>{props.project.description}</Typography>
        <Title sx={{ mt: 3 }}>Tasks</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de encerramento</TableCell>
              <TableCell align="center">ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.project.tasks.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("pt-br").format(
                    new Date(row.endedAt)
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete">
                    <DescriptionIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid container xs={12} sx={{ mt: 3 }} flex={1}>
          <Grid item xs={12} md={4} lg={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenTaskDetail(true);
                setErrorMessage(undefined);
                setProjectId(props.project.id);
              }}
            >
              Nova tarefa
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Drawer
        anchor={"right"}
        open={openTaskDetail}
        onClose={() => setOpenTaskDetail(false)}
      >
        <Box
          sx={{ width: 400, pt: 10, px: 3, pb: 3 }}
          component="form"
          onSubmit={submitNewTaks}
          noValidate
        >
          <Typography component="h1" variant="h5">
            Nova tarefa
          </Typography>
          {errorMessage && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          )}
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              type="text"
              name="title"
              required
              fullWidth
              id="title"
              label="Título"
              autoComplete="title"
              autoFocus
              onChange={() => setErrorMessage(undefined)}
            />
            <TextField
              margin="normal"
              type="text"
              name="description"
              required
              fullWidth
              id="description"
              label="Descrição"
              autoComplete="description"
              onChange={() => setErrorMessage(undefined)}
            />
            <TextField
              margin="normal"
              type="date"
              name="endedAt"
              required
              fullWidth
              id="endedAt"
              label="Data de encerramento"
              InputLabelProps={{ shrink: true, required: true }}
              onChange={() => setErrorMessage(undefined)}
            />
            <Button type="submit" fullWidth variant="contained">
              Criar tarefa
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
