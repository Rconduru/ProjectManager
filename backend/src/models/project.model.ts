export interface IProject {
  id: number;
  title: string;
  description: string;
  startedAt: Date;
  endDate: Date;
  status: string;
  projectId?: number;
}
