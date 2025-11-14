import { createDriver, driver, timeout } from "../utils";
import { screens } from "../screens";

describe("Todo App", () => {
  before(async () => {
    await createDriver();
  });

  after(async () => {
    await driver?.deleteSession();
  });

  it("should add a task", async () => {
    await screens.main.addTask(
      "Buy milk",
      "Remember to buy milk from the store",
    );
  });
  it("should edit a task", async () => {
    const titleSelector = await screens.main.addTask();
    await screens.addEdit.editTask({ titleSelector: titleSelector });
    const push = await driver!.$(screens.main.pushTaskSaved);
    await push.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await push.isDisplayed()).toBe(true);
  });
  it("should delete a task", async () => {
    const titleSelector = await screens.main.addTask();
    await screens.addEdit.deleteTask(titleSelector);
    const push = await driver!.$(screens.main.pushTaskSaved);
    await push.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await push.isDisplayed()).toBe(true);
  });
});
