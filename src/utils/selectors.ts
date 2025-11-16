import { logger } from "../utils";

export function getTextSelector(title: string) {
  return `android=new UiSelector().className("android.widget.TextView").textContains("${title}")`;
}

export async function fetchSource() {
  const source = await driver.getPageSource();
  logger.warn("\n========== LIST WITH TASK ==========");
  logger.log(source);
  logger.warn("====================================\n");
}

export const push = {
  taskMarkedActive: '//android.widget.TextView[@text="Task marked active"]',
  taskSaved: '//android.widget.TextView[@text="Task saved"]',
  taskAdded: '//android.widget.TextView[@text="Task added"]',
  taskMarkedComplete: '//android.widget.TextView[@text="Task marked complete"]',
  taskDeleted: '//android.widget.TextView[@text="Task was deleted"]',
};

export const headers = {
  activeTasks: '//android.widget.TextView[@text="Active Tasks"]',
  completedTasks: '//android.widget.TextView[@text="Completed Tasks"]',
  allTasks: '//android.widget.TextView[@text="All Tasks"]',
  noActiveTasks: '//android.widget.TextView[@text="You have no active tasks!"]',
  noCompletedTasks:
    '//android.widget.TextView[@text="You have no completed tasks!"]',
  noAllTasks: '//android.widget.TextView[@text="You have no tasks!"]',
};

export function getCheckBoxSelector(isChecked: boolean) {
  return `android=new UiSelector().className("android.widget.CheckBox").checked(${isChecked})`;
}

export const editTextWidget = "android.widget.EditText";
