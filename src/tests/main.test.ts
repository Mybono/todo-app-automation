import { createDriver, driver } from "../utils";
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
});
