import { push, expectElement } from "../../utils";
import { screens } from "../../screens";

describe("Task management @task @regression ", () => {
  it("[UITM-TA001]: Adds a new task with title and description", async () => {
    await screens.main.addTask({
      title: "Buy milk",
      text: "Remember to buy milk from the store",
    });
    await expectElement(push.taskAdded);
  });

  it("[UITM-TA002]: Adds a new task with title", async () => {
    await screens.main.addTask({ title: "Complete assignment" });
    await expectElement(push.taskAdded);
  });

  it("[UITM-TA003]: Deletes an existing task and shows confirmation message", async () => {
    const titleSelector = await screens.main.addTask({});
    await screens.task.deleteTask(titleSelector);
    await expectElement(push.taskDeleted);
  });

  it("[UITM-TA004]: Edits a task and confirms the changes are saved", async () => {
    const titleSelector = await screens.main.addTask({});
    await screens.task.editTask({ selector: titleSelector });
    await expectElement(push.taskSaved);
  });
});
