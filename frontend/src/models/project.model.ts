import { ITask } from "./task.model";

export interface IProject {
  id: number;
  title: string;
  description: string;
  startedAt: string;
  endDate?: string;
  status: string;
  projectId?: number;
}

export interface IProjectWithTasks extends IProject {
  tasks: ITask[];
}
