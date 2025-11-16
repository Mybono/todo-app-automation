import {
  _,
  clickElement,
  editTextWidget,
  expectElement,
  getCheckBoxSelector,
  getTextSelector,
  logger,
  timeout,
} from "../utils";
import { Task, EditTaskFields, taskStatuses } from "../types";
import { screens } from ".";

export class task {
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

  /**
   * Fills out a task form with title and description, then saves it.
   * Optionally marks the task as completed if task.status === taskStatuses.completed.
   *
   * @param {Task} task - Task data object
   * @param {string} task.title - Task title (required)
   * @param {string} [task.text] - Task description (optional)
   * @param {string} [task.status] - Task status (optional, can be 'completed' or 'active')
   * @throws {Error} Throws error if form elements are not found or filling fails
   * @returns {Promise<void>}
   * @example
   * await addEdit.fillTask({
   *   title: "Buy milk",
   *   text: "From store",
   *   status: taskStatuses.completed
   * });
   */
  async fillTask(task: Task): Promise<void> {
    let title = task.title;
    let text = task.text;
    try {
      await this.fillField({ title: title, text: text });
      await clickElement(this.saveTaskBtn);
      if (task.status === taskStatuses.completed) {
        const checkbox = getCheckBoxSelector(false);
        let checkedCheckbox = await screens.main.toggleCheckbox(checkbox, true);
        await checkedCheckbox.waitForDisplayed({
          timeout: timeout.elementAppear,
        });
      }
    } catch (error) {
      throw new Error(`[fillTask]: ${(error as Error).message}`);
    }
  }

  async editTask(task: Task): Promise<string> {
    let title = task.title;
    let text = task.text;
    let selector = task.selector;

    try {
      if (!task.title || !task.text) {
        const randomData = _.getRandomText();
        title = randomData.title;
        text = randomData.text;
      }

      await this.selectTask(selector);
      await clickElement(this.editBtn);

      await this.fillField({ title: title, text: text });

      await clickElement(this.saveTaskBtn);
      selector = getTextSelector(title);
      return selector;
    } catch (error) {
      throw new Error(`[editTask]: ${(error as Error).message}`);
    }
  }

  async deleteTask(titleSelector: string) {
    try {
      await this.selectTask(titleSelector);
      await expectElement(this.taskDetailsHeader);
      await clickElement(this.deleteBtn);
    } catch (error) {
      throw new Error(`[deleteTask]: ${(error as Error).message}`);
    }
  }

  /**
   * Fill Field (title and/or text)
   * @param {EditTaskFields} fields - Fields to update
   * @throws {Error} If element is not found or cannot be edited
   * @returns {Promise<void>}
   * @example
   * await editFields({ title: "New title" });
   * await editFields({ text: "New description" });
   * await editFields({ title: "New title", text: "New description" });
   */
  async fillField(fields: EditTaskFields) {
    try {
      const inputs = await $$(editTextWidget);

      if (fields.title !== undefined) {
        await inputs[0].waitForDisplayed({ timeout: timeout.elementAppear });
        await inputs[0].setValue(fields.title);
        logger.info(
          `[fillField] Title edited to "${fields.title}" successfully.`,
        );
      }

      if (fields.text !== undefined) {
        await inputs[1].waitForDisplayed({ timeout: timeout.elementAppear });
        await inputs[1].setValue(fields.text);
        logger.info(
          `[fillField] Text edited to "${fields.text}" successfully.`,
        );
      }
    } catch (error) {
      throw new Error(`[fillField]: ${(error as Error).message}`);
    }
  }

  async selectTask(selector: string) {
    try {
      await clickElement(selector);
      await expectElement(this.taskDetailsHeader);
      logger.info(`[selectTask] Task selected successfully. ${selector}`);
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
