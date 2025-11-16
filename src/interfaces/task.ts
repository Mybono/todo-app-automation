export interface Task {
  title?: string;
  text?: string;
  status?: TaskStatus;
  titleSelector?: string;
}
export type TaskStatus = (typeof taskStatuses)[keyof typeof taskStatuses];

export const taskStatuses = {
  active: "active",
  completed: "completed",
} as const;
