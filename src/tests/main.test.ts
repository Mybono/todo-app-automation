import { createDriver, driver } from "../utils/driver";
import { MainScreen } from "../pages/MainScreen";

describe("Todo App", () => {
  let mainScreen: MainScreen;

  before(async () => {
    await createDriver();
    mainScreen = new MainScreen();
  });

  after(async () => {
    await driver?.deleteSession();
  });

  it("should add a task", async () => {
    await mainScreen.addTask("Buy milk");
    const tasks = await mainScreen.getTasks();
    console.log(tasks);
  });
});
