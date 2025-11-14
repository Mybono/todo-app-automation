import { Browser } from "wd";

export class TaskDetailsScreen {
  driver: Browser;

  constructor(driver: Browser) {
    this.driver = driver;
  }

  async editTask(oldName: string, newName: string) {
    const task = await this.driver.elementByXPath(
      `//android.widget.TextView[@text='${oldName}']`,
    );
    await task.click();
    const input = await this.driver.elementById("task_name_input");
    await input.clear();
    await input.type(newName);
    const saveBtn = await this.driver.elementById("save_task_button");
    await saveBtn.click();
  }

  async deleteTask(name: string) {
    const task = await this.driver.elementByXPath(
      `//android.widget.TextView[@text='${name}']`,
    );
    await task.click();
    const deleteBtn = await this.driver.elementById("delete_task_button");
    await deleteBtn.click();
  }
}
