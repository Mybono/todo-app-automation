import { _, clickElement, expectElement, logger } from '../utils';
import {
  getTextSelector,
  getCheckBoxSelector,
  timeout,
  editTextWidget,
  taskScreenLocators,
} from '../constants';
import { Task, EditTaskFields, taskStatuses } from '../types';
import { $$, browser } from '@wdio/globals';
import { screens } from '../screens';

declare module '@wdio/globals' {
  interface Browser {
    waitUntil<T>(
      condition: () => Promise<T> | T,
      options?: { timeout?: number; timeoutMsg?: string; interval?: number },
    ): Promise<T>;
  }
}
export class TaskScreen {
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
    const title = task.title;
    const text = task.text;
    try {
      await this.fillField({ title: title, text: text });
      await clickElement(taskScreenLocators.saveTaskBtn);
      if (task.status === taskStatuses.completed) {
        const checkbox = getCheckBoxSelector(false);
        const checkedCheckbox = await screens.main.toggleCheckbox(checkbox, true);
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
      await clickElement(taskScreenLocators.editBtn);

      await this.fillField({ title: title, text: text });

      await clickElement(taskScreenLocators.saveTaskBtn);
      selector = getTextSelector(title);

      return selector;
    } catch (error) {
      throw new Error(`[editTask]: ${(error as Error).message}`);
    }
  }

  async deleteTask(titleSelector: string): Promise<void> {
    try {
      await this.selectTask(titleSelector);
      await expectElement(taskScreenLocators.taskDetailsHeader);
      await clickElement(taskScreenLocators.deleteBtn);
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
  async fillField(fields: EditTaskFields): Promise<void> {
    try {
      await browser.waitUntil(
        async () => {
          const elements = $$(editTextWidget);

          return (await elements.length) >= 2;
        },
        {
          timeout: timeout.elementAppear,
          timeoutMsg: `[fillField]: Expected at least 2 inputs of type ${editTextWidget}`,
        },
      );
      const inputs = $$(editTextWidget);

      if (fields.title !== undefined) {
        await inputs[0].waitForDisplayed({ timeout: timeout.elementAppear });
        await inputs[0].setValue(fields.title);
        logger.info(`[fillField] Title edited to "${fields.title}" successfully.`);
      }

      if (fields.text !== undefined) {
        await inputs[1].waitForDisplayed({ timeout: timeout.elementAppear });
        await inputs[1].setValue(fields.text);
        logger.info(`[fillField] Text edited to "${fields.text}" successfully.`);
      }
    } catch (error) {
      throw new Error(`[fillField]: ${(error as Error).message}`);
    }
  }

  async selectTask(selector: string): Promise<void> {
    try {
      await clickElement(selector);
      await expectElement(taskScreenLocators.taskDetailsHeader);
      logger.info(`[selectTask] Task selected successfully. ${selector}`);
    } catch (error) {
      throw new Error(`[selectTask]: ${(error as Error).message}`);
    }
  }

  async backToMain(): Promise<void> {
    try {
      await clickElement(taskScreenLocators.backBtn);
      logger.info('[backToMain] Navigated to main screen successfully.');
    } catch (error) {
      throw new Error(`[backToMain]: ${(error as Error).message}`);
    }
  }
}
