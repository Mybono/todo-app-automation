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
    await this.driver.elementById(this.addTaskButton).click();
    await this.driver.elementById(this.taskNameField).type(name);
  }

  async getTasks() {
    return this.driver.elementsById(this.taskList);
  }
}
