export interface ITask {
  id?: number;
  title: string;
  description: string;
  status: string;
  projectId: number;
  endedAt: Date;
}

export interface ITaskRequest {
  title: string;
  description: string;
  projectId: number;
  endedAt: string;
}
