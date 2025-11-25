import { logger } from '../utils';
import { browser } from '@wdio/globals';

export function getTextSelector(title: string): string {
  return `android=new UiSelector().className("android.widget.TextView").textContains("${title}")`;
}

export async function fetchSource(): Promise<void> {
  const source = await browser.getPageSource();
  logger.warn('\n========== LIST WITH TASK ==========');
  logger.log(source);
  logger.warn('====================================\n');
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
  noCompletedTasks: '//android.widget.TextView[@text="You have no completed tasks!"]',
  noAllTasks: '//android.widget.TextView[@text="You have no tasks!"]',
};

export function getCheckBoxSelector(isChecked: boolean): string {
  return `android=new UiSelector().className("android.widget.CheckBox").checked(${isChecked})`;
}

export const editTextWidget = 'android.widget.EditText';

/**
 * Timeout constants for various operations in milliseconds.
 */
export const timeout = {
  /** Timeout for waiting for an element to appear (5000 ms) */
  elementAppear: 5000,
  /** Timeout for waiting before clicking an element (3000 ms) */
  elementClick: 3000,
  /** Timeout for page navigation or screen transitions (10000 ms) */
  navigation: 10000,
};
