export interface Task {
  title?: string;
  text?: string;
  status?: TaskStatus;
  selector?: string;
}
export type TaskStatus = (typeof taskStatuses)[keyof typeof taskStatuses];

export interface EditTaskFields {
  title?: string;
  text?: string;
}

export const taskStatuses = {
  active: 'active',
  completed: 'completed',
} as const;
