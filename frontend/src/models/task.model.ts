export interface ITask {
  id?: number;
  title: string;
  description: string;
  status?: string;
  projectId: number;
  endedAt: Date;
}
