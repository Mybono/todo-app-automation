import { push, expectElement } from "../utils";
import { screens } from "../screens";

describe("Task management @task @smoke ", () => {
  it("[UITM001]: Adds a new task with title and description", async () => {
    await screens.main.addTask({
      title: "Buy milk",
      text: "Remember to buy milk from the store",
    });
    await expectElement(push.taskAdded);
  });

  it("[UITM002]: Adds a new task with title", async () => {
    await screens.main.addTask({ title: "Complete assignment" });
    await expectElement(push.taskAdded);
  });

  it("[UITM003]: Deletes an existing task and shows confirmation message", async () => {
    const titleSelector = await screens.main.addTask({});
    await screens.addEdit.deleteTask(titleSelector);
    await expectElement(push.taskDeleted);
  });

  it("[UITM004]: Edits a task and confirms the changes are saved", async () => {
    const titleSelector = await screens.main.addTask({});
    await screens.addEdit.editTask({ titleSelector: titleSelector });
    await expectElement(push.taskSaved);
  });
});
