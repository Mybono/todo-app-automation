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
    // @ts-ignore
    const tasks = await this.driver.elementsById(this.taskList);
    return tasks;
  }
}
