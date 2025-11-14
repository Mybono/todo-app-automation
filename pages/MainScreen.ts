import { Browser } from "wd";

export class MainScreen {
  driver: Browser;

  constructor(driver: Browser) {
    this.driver = driver;
  }

  addTaskButton = "id:add_task_button";
  taskNameField = "id:task_name_input";
  taskList = "id:task_list";

  async addTask(name: string) {
    const addBtn = await this.driver.elementById(this.addTaskButton);
    await addBtn.click();

    const input = await this.driver.elementById(this.taskNameField);
    await input.type(name);
  }

  async getTasks() {
    return this.driver.elementsById(this.taskList);
  }

  async markTaskCompleted(name: string) {
    const task = await this.driver.elementByXPath(
      `//android.widget.TextView[@text='${name}']`,
    );
    const checkbox = await task.elementByXPath("../android.widget.CheckBox");
    await checkbox.click();
  }

  async filterTasks(filter: "All" | "Active" | "Completed") {
    const btn = await this.driver.elementByAccessibilityId(
      `filter-${filter.toLowerCase()}`,
    );
    await btn.click();
  }

  async openStatistics() {
    const menuBtn = await this.driver.elementByAccessibilityId("settings-menu");
    await menuBtn.click();
    const statsBtn = await this.driver.elementByAccessibilityId("statistics");
    await statsBtn.click();
  }
}
