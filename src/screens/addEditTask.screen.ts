import { _, timeout } from "../utils";

export class AddEditTaskScreen {
  newTaskHeader = '//android.widget.TextView[@text="New Task"]';
  taskDetailsHeader = '//android.widget.TextView[@text="Task Details"]';
  taskTitleInput =
    '//android.widget.EditText[.//android.widget.TextView[@text="Title"]]';
  taskTextInput =
    '//android.widget.EditText[.//android.widget.TextView[@text="Enter your task here."]]';
  saveTaskBtn = '//android.view.View[@content-desc="Save task"]/..';
  deleteBtn = "~Delete task";
  editBtn = "~Edit";
  backBtn = "~Back";

  async fillTask(text: string, title: string) {
    try {
      await this.fillOutTitle(title);
      await this.fillOutText(text);
      const saveTaskBtn = await driver.$(this.saveTaskBtn);
      await saveTaskBtn.waitForDisplayed({ timeout: timeout.elementAppear });
      await saveTaskBtn.click();
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
        title = title ?? randomData.title;
        text = text ?? randomData.text;
      }

      await this.selectTask(titleSelector);
      const editBtn = await driver.$(this.editBtn);
      await editBtn.waitForDisplayed({ timeout: timeout.elementAppear });
      await editBtn.click();

      await this.fillOutTitle(title);
      await this.fillOutText(text);

      const saveTaskBtn = await driver.$(this.editBtn);
      await saveTaskBtn.waitForDisplayed({ timeout: timeout.elementAppear });
      await editBtn.click();
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
      const deleteBtn = await driver.$(this.deleteBtn);
      await deleteBtn.waitForDisplayed({ timeout: timeout.elementAppear });
      await deleteBtn.click();
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

  async selectTask(titleSelector: string) {
    try {
      const task = await driver!.$(titleSelector);
      await task.waitForDisplayed({ timeout: timeout.elementAppear });
      await task.click();
      await driver
        .$(this.taskDetailsHeader)
        .waitForDisplayed({ timeout: timeout.elementAppear });
    } catch (error) {
      throw new Error(`[selectTask]: ${(error as Error).message}`);
    }
  }
}
