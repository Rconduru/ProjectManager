import { post } from "../api/api";
import { ITask } from "../models/task.model";
import { getProjectsWithTasks } from "./project.action";

interface ICreateNewTaskResponse {
  success: boolean;
  errorMessage: undefined | string;
}

export const createNewTask = async (
  newTak: ITask
): Promise<ICreateNewTaskResponse> => {
  try {
    await post("/tasks", {
      title: newTak.title,
      description: newTak.description,
      projectId: newTak.projectId,
      endedAt: newTak.endedAt,
    });

    await getProjectsWithTasks();

    return { success: true, errorMessage: undefined };
  } catch (error: any) {
    return { success: false, errorMessage: error.message };
  }
};
