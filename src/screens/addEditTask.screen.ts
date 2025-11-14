import { screens } from "../screens";
import { logger } from "../utils";

export class AddEditTaskScreen {
  newTaskHeader = '//android.widget.TextView[@text="New Task"]';
  taskDetailsHeader = '//android.widget.TextView[@text="Task Details"]';
  taskTitleInput = '//android.widget.TextView[@text="Title"]';
  taskTextInput = '//android.widget.TextView[@text="Enter your task here."]';
  saveTaskBtn = "~Save task";
  deleteBtn = "~Delete task";
  editBtn = "~Edit";
  backBtn = "~Back";

  async fillTask(title: string, text: string) {
    try {
      await (await driver.$(this.taskTitleInput)).setValue(title);
      await (await driver.$(this.taskTextInput)).setValue(text);
      await (await driver.$(this.saveTaskBtn)).click();
      await driver
        .$(screens.main.pushTaskAdded)
        .waitForDisplayed({ timeout: 5000 });
      logger.info(`Task "${title}" added successfully.`);
    } catch (error) {
      throw new Error(
        `[fillTask]: Error in fillTask: ${(error as Error).message}`,
      );
    }
  }
}
