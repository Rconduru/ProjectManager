import { ITask } from "./task.interface";

export interface IProject {
  id: number;
  projectId?: number;
  title: string;
  description: string;
  status: string;
  startedAt: Date;
  createdAt: Date;
  endedDate?: Date;
  createdBy: number;
}

export interface IProjectWithTasksResult {
  project_id: number;
  title: string;
  description: string;
  status: string;
  project_started: Date;
  project_ended: Date;
  project_created: Date;
  project_created_by: number;
  id: number;
  task_title: string;
  task_description: string;
  is_finished: boolean;
  ended_at: Date;
}

export interface IProjectWithTasks extends IProject {
  tasks: ITask[];
}
