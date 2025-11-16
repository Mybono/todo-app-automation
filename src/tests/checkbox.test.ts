import {
  clickElement,
  headers,
  timeout,
  push,
  getCheckBoxSelector,
  expectElement,
  toggleCheckbox,
} from "../utils";
import { taskStatuses } from "../types";
import { screens } from "../screens";

describe("Task Checkbox Actions @checkbox @regression", () => {
  it("[UITM-CA001]: Marks a task as completed from the task details screen", async () => {
    const titleSelector = await screens.main.addTask({
      status: taskStatuses.active,
    });
    await screens.addEdit.selectTask(titleSelector);

    const checkbox = getCheckBoxSelector(false);
    let checkedCheckbox = await toggleCheckbox(checkbox, true);
    await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await checkedCheckbox.isDisplayed()).toBe(true);

    await expectElement(push.taskMarkedComplete);
    await screens.addEdit.backToMain();
  });

  it("[UITM-CA002]: Marks a task as active from the task details screen", async function () {
    const titleSelector = await screens.main.addTask({
      status: taskStatuses.completed,
    });
    await screens.addEdit.selectTask(titleSelector);

    const checkbox = getCheckBoxSelector(true);
    let checkedCheckbox = await toggleCheckbox(checkbox, false);
    await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await checkedCheckbox.isDisplayed()).toBe(true);

    await expectElement(push.taskMarkedActive);
    await screens.addEdit.backToMain();
  });

  it("[UITM-CA003]: Marks a task as completed directly from the main task list", async () => {
    await screens.main.addTask({ status: taskStatuses.active });
    const checkbox = getCheckBoxSelector(false);
    let checkedCheckbox = await toggleCheckbox(checkbox, true);
    await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });

    expect(await checkedCheckbox.isDisplayed()).toBe(true);
    await expectElement(push.taskMarkedComplete);
  });

  it("[UITM-CA004]: Marks a task as active directly from the main task list", async () => {
    await screens.main.addTask({ status: taskStatuses.completed });
    const checkbox = getCheckBoxSelector(true);
    let checkedCheckbox = await toggleCheckbox(checkbox, false);
    await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });

    expect(await checkedCheckbox.isDisplayed()).toBe(true);
    await expectElement(push.taskMarkedActive);
  });

  it("[UITM-FH001]: Filter tasks between Active @filter @regression", async () => {
    await clickElement(screens.main.filterBtn);
    await clickElement(screens.main.filterActive);

    await expectElement(headers.activeTasks);
  });

  it("[UITM-FH002]: Filter tasks between Completed @filter @regression", async () => {
    await clickElement(screens.main.filterBtn);
    await clickElement(screens.main.filterCompleted);

    await expectElement(headers.completedTasks);
  });

  it("[UITM-FH002]: Filter tasks between All @filter @regression", async () => {
    await clickElement(screens.main.filterBtn);
    await clickElement(screens.main.filterAll);

    await expectElement(headers.allTasks);
  });
});
