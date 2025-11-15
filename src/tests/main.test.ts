import { push, expectPushMessage } from "../utils";
import { screens } from "../screens";

describe("Task management @task @smoke ", () => {
  let titleSelector: string;

  beforeEach(async () => {
    titleSelector = await screens.main.addTask({});
  });

  it("adds a new task with title and description", async () => {
    await screens.main.addTask(
      {
        title: "Buy milk",
        text: "Remember to buy milk from the store"
      },
    );
    await expectPushMessage(push.taskAdded);
  });

  it("adds a new task with title", async () => {
    await screens.main.addTask(
      { title: "Complete assignment" }
    );
    await expectPushMessage(push.taskAdded);
  });

  it("deletes an existing task and shows confirmation message", async () => {
    await screens.addEdit.deleteTask(titleSelector);
    await expectPushMessage(push.taskDeleted);
  });

  it("edits a task and confirms the changes are saved", async () => {
    await screens.addEdit.editTask({ titleSelector: titleSelector });
    await expectPushMessage(push.taskSaved);
  });
});
