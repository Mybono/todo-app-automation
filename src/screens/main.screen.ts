import { _, clickElement, expectElement, logger } from "../utils";
import {
  getTextSelector,
  getCheckBoxSelector,
  mainScreenLocators,
  push,
} from "../constants";
import { Task, taskStatuses, FilterType } from "../types";
import { screens } from "../screens";

export class MainScreen {
  /**
   * Adds a new task to the app.
   * If title or text is not provided, generates random task data.
   * Optionally sets the task status (active or completed).
   *
   * @param {Task} task - Task data object
   * @param {string} [task.title] - Task title (optional, random generated if missing)
   * @param {string} [task.text] - Task description (optional, random generated if missing)
   * @param {string} [task.status] - Task status (optional, can be 'active' or 'completed')
   *
   * @throws {Error} Throws error if task cannot be added or form elements are not found
   *
   * @returns {Promise<string>} Returns the selector of the newly added task's title
   *
   * @example
   * const selector = await screens.main.addTask({
   *   title: "Buy milk",
   *   text: "From store",
   *   status: taskStatuses.completed
   * });
   */
  async addTask(task: Task): Promise<string> {
    let title = task.title;
    let text = task.text;
    let taskStaus = task.status;
    try {
      if (!task.title || !task.text) {
        const randomData = _.getRandomText();
        title = randomData.title;
        text = randomData.text;
      }

      await clickElement(mainScreenLocators.addTaskBtn);
      await screens.task.fillTask({
        title: title,
        text: text,
        status: taskStaus,
      });

      if (taskStaus === taskStatuses.active) {
        await expectElement(push.taskAdded);
      }
      await expectElement(mainScreenLocators.todoTitle);
      await expectElement(mainScreenLocators.allTaskTitle);

      const taskTitleSelector = getTextSelector(title);
      await expectElement(taskTitleSelector);

      logger.info(`[addTask] Task "${title}" added successfully.`);
      return taskTitleSelector;
    } catch (error) {
      throw new Error(
        `[addTask]: Error in addTask: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Applies a task filter on the main screen.
   *
   * Opens the filter menu and selects the desired filter type: "all", "active", or "completed".
   *
   * @param {FilterType} filterType - Type of filter to apply. Possible values:
   *   - "all": Show all tasks
   *   - "active": Show only active tasks
   *   - "completed": Show only completed tasks
   *
   * @throws {Error} Throws error if filter button or filter option is not found or click fails
   *
   * @returns {Promise<void>} Resolves when the filter has been successfully applied
   *
   * @example
   * await screens.main.applyFilter(filter.active);
   */
  async applyFilter(filterType: FilterType): Promise<void> {
    try {
      await clickElement(mainScreenLocators.filterBtn);

      let filterSelector: string;
      switch (filterType) {
        case "all":
          filterSelector = mainScreenLocators.filterAll;
          break;
        case "active":
          filterSelector = mainScreenLocators.filterActive;
          break;
        case "completed":
          filterSelector = mainScreenLocators.filterCompleted;
          break;
      }

      await clickElement(filterSelector);
      logger.info(`[applyFilter] Applied filter: ${filterType}`);
    } catch (error) {
      throw new Error(`[applyFilter]: ${(error as Error).message}`);
    }
  }

  /**
   * Marks a task as completed or active.
   *
   * Optionally selects the task first if a titleSelector is provided, then clicks the checkbox to update its status.
   * Waits for the checkbox state to reflect the new status before resolving.
   *
   * @param {boolean} isCompleted - Target status for the task. `true` to mark as completed, `false` to mark as active.
   * @param {string} [titleSelector] - Optional selector for the task title. If provided, the task will be selected before updating its status.
   *
   * @throws {Error} Throws error if the task cannot be selected, the checkbox cannot be clicked, or the updated checkbox state is not displayed.
   *
   * @returns {Promise<void>} Resolves when the task status has been successfully updated and verified.
   *
   * @example
   * //Mark a task as completed by title selector
   * await screens.main.markTaskComplete(true);
   *
   * //Mark the currently selected task as active
   * await screens.main.markTaskComplete(false);
   */
  async markTaskComplete(
    isCompleted: boolean,
    titleSelector?: string,
  ): Promise<void> {
    try {
      if (titleSelector) {
        await screens.task.selectTask(titleSelector);
      }

      const checkboxToClickSelector = getCheckBoxSelector(!isCompleted);
      await clickElement(checkboxToClickSelector);

      const checkboxUpdatedSelector = getCheckBoxSelector(isCompleted);
      await expectElement(checkboxUpdatedSelector);

      logger.info(
        `[markTaskComplete] Task marked as ${isCompleted ? "completed" : "active"}`,
      );
    } catch (error) {
      throw new Error(`[markTaskComplete]: ${(error as Error).message}`);
    }
  }

  async toggleCheckbox(selector: string, isCompleted: boolean) {
    try {
      const checkbox = await $(selector);
      const currentState = (await checkbox.getAttribute("checked")) === "true";

      if (currentState !== isCompleted) {
        await checkbox.click();
        const newSelector = getCheckBoxSelector(isCompleted);
        return await $(newSelector);
      } else {
        logger.log("Checkbox already in desired state");
        return checkbox;
      }
    } catch (error) {
      throw new Error(`[toggleCheckbox]: ${(error as Error).message}`);
    }
  }
}
