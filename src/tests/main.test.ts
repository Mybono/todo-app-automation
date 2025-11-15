import { timeout, push, getCheckBoxSelector, toggleCheckbox } from "../utils";
import { screens } from "../screens";

describe("Edit Task: ", () => {

  it("should add a task", async () => {
    await screens.main.addTask(
      "Buy milk",
      "Remember to buy milk from the store",
    );
  });

  it("delete a task", async () => {
    const titleSelector = await screens.main.addTask();
    await screens.addEdit.deleteTask(titleSelector);

    const pushTaskDeleted = await driver!.$(push.taskDeleted);
    await pushTaskDeleted.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await pushTaskDeleted.isDisplayed()).toBe(true);
  });

  it("edit a task", async () => {
    const titleSelector = await screens.main.addTask();
    await screens.addEdit.editTask({ titleSelector: titleSelector });

    const taskSaved = await driver!.$(push.taskSaved);
    await taskSaved.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await taskSaved.isDisplayed()).toBe(true);
  });

  it("mark task completed from task screen", async () => {
    const titleSelector = await screens.main.addTask();
    await screens.addEdit.selectTask(titleSelector);

    const checkbox = getCheckBoxSelector(false);
    let checkedCheckbox = await toggleCheckbox(checkbox, true);
    await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await checkedCheckbox.isDisplayed()).toBe(true);

    const pushTaskMarkedComplete = await driver!.$(push.taskMarkedComplete);
    await pushTaskMarkedComplete.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await pushTaskMarkedComplete.isDisplayed()).toBe(true);

    const backBtn = await driver!.$(screens.addEdit.backBtn);
    await backBtn.waitForDisplayed({ timeout: timeout.elementAppear });
    await backBtn.click();
  })

  it("mark task completed from main screen", async () => {
    const checkbox = getCheckBoxSelector(false);
    let checkedCheckbox = await toggleCheckbox(checkbox, true);
    await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await checkedCheckbox.isDisplayed()).toBe(true);

    const pushTaskMarkedComplete = await driver!.$(push.taskMarkedComplete);
    await pushTaskMarkedComplete.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await pushTaskMarkedComplete.isDisplayed()).toBe(true);
  })
});
