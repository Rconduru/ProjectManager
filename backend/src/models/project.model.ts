import { ITask } from "./task.interface";

export interface IProject {
  id: number;
  title: string;
  description: string;
  startedAt: Date;
  endDate?: Date;
  status: string;
  projectId?: number;
}

export interface IProjectWithTasksResult {
  project_id: number;
  title: string;
  description: string;
  status: string;
  project_started: string;
  id: number;
  task_title: string;
  task_description: string;
  is_finished: boolean;
  ended_at: string;
}

export interface IProjectWithTasks extends IProject {
  tasks: ITask[];
}
