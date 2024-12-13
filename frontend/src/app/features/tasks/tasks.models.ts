export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
