import { AxiosResponse } from "axios";
import { get } from "../api/api";
import { IProjectWithTasks } from "../models/project.model";
import { projectStore } from "../store/project.store";

interface IGetProjectCountResponse {
  count: number;
}

export const getProjectCount = async () => {
  const response: AxiosResponse<IGetProjectCountResponse> = await get(
    "/projects/count"
  );

  console.log(response.data);

  projectStore.setCount(response.data.count);
};

export const getProjectsWithTasks = async () => {
  const response: AxiosResponse<IProjectWithTasks[]> = await get(
    "/projects/tasks"
  );

  projectStore.setProjects(response.data);
};
