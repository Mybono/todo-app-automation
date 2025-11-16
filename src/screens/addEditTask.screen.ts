import {
  _,
  clickElement,
  logger,
  getTextSelector,
  getCheckBoxSelector,
  toggleCheckbox,
  timeout,
} from "../utils";
import { Task, taskStatuses } from "../interfaces";

export class AddEditTaskScreen {
  newTaskHeader = '//android.widget.TextView[@text="New Task"]';
  taskDetailsHeader = '//android.widget.TextView[@text="Task Details"]';
  taskTitleInput =
    '//android.widget.EditText[.//android.widget.TextView[@text="Title"]]';
  taskTextInput =
    '//android.widget.EditText[.//android.widget.TextView[@text="Enter your task here."]]';
  saveTaskBtn = "~Save task";
  deleteBtn = "~Delete task";
  editBtn = "~Edit Task";
  backBtn = "~Back";

  async fillTask(task: Task) {
    let title = task.title;
    let text = task.text;
    try {
      await this.fillOutTitle(title);
      await this.fillOutText(text);
      await clickElement(this.saveTaskBtn);
      if (task.status === taskStatuses.completed) {
        const checkbox = getCheckBoxSelector(false);
        let checkedCheckbox = await toggleCheckbox(checkbox, true);
        await checkedCheckbox.waitForDisplayed({
          timeout: timeout.elementAppear,
        });
      }
    } catch (error) {
      throw new Error(`[fillTask]: ${(error as Error).message}`);
    }
  }

  async editTask({
    titleSelector: titleSelector,
    title: title,
    text: text,
  }: {
    titleSelector: string;
    title?: string;
    text?: string;
  }) {
    try {
      if (!title || !text) {
        const randomData = _.getRandomText();
        title = randomData.title;
        text = randomData.text;
      }

      await this.selectTask(titleSelector);
      await clickElement(this.editBtn);

      await this.editTitle(title);
      await this.editText(text);

      const saveTaskBtn = await driver.$(this.saveTaskBtn);
      await saveTaskBtn.waitForDisplayed({ timeout: timeout.elementAppear });
      await saveTaskBtn.click();
      titleSelector = getTextSelector(title);
      return titleSelector;
    } catch (error) {
      throw new Error(`[editTask]: ${(error as Error).message}`);
    }
  }

  async deleteTask(titleSelector: string) {
    try {
      await this.selectTask(titleSelector);
      await driver
        .$(this.taskDetailsHeader)
        .waitForDisplayed({ timeout: timeout.elementAppear });
      
      await clickElement(this.deleteBtn);
    } catch (error) {
      throw new Error(`[deleteTask]: ${(error as Error).message}`);
    }
  }

  async fillOutText(text: string) {
    try {
      const textInput = await driver.$(this.taskTextInput);
      await textInput.waitForDisplayed({ timeout: timeout.elementAppear });
      await textInput.setValue(text);
    } catch (error) {
      throw new Error(
        `[fillOutText]: Error in fillTask: ${(error as Error).message}`,
      );
    }
  }

  async fillOutTitle(title: string) {
    try {
      const titleInput = await driver.$(this.taskTitleInput);
      await titleInput.waitForDisplayed({ timeout: timeout.elementAppear });
      await titleInput.setValue(title);
    } catch (error) {
      throw new Error(`[fillOutTitle]: ${(error as Error).message}`);
    }
  }

  async editText(text: string) {
    try {
      const titleInput = await $$("android.widget.EditText");
      await titleInput[1].waitForDisplayed({ timeout: timeout.elementAppear });
      await titleInput[1].setValue(text);
      logger.info(`[editText] Text edited to "${text}" successfully.`);
    } catch (error) {
      throw new Error(`[editText]: ${(error as Error).message}`);
    }
  }

  async editTitle(title: string) {
    try {
      const titleInput = await $$("android.widget.EditText");
      await titleInput[0].waitForDisplayed({ timeout: timeout.elementAppear });
      await titleInput[0].setValue(title);
      logger.info(`[editTitle] Title edited to "${title}" successfully.`);
    } catch (error) {
      throw new Error(`[editTitle]: ${(error as Error).message}`);
    }
  }

  async selectTask(titleSelector: string) {
    try {

      await clickElement(titleSelector);
      await driver
        .$(this.taskDetailsHeader)
        .waitForDisplayed({ timeout: timeout.elementAppear });
      logger.info(`[selectTask] Task selected successfully. ${titleSelector}`);
    } catch (error) {
      throw new Error(`[selectTask]: ${(error as Error).message}`);
    }
  }

  async backToMain() {
    try {
      await clickElement(this.backBtn);
      logger.info(`[backToMain] Navigated to main screen successfully.`);
    } catch (error) {
      throw new Error(`[backToMain]: ${(error as Error).message}`);
    }
  }
}
