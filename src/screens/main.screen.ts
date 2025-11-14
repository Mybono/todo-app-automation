import { screens } from "../screens";

export class MainScreen {
  addTaskBtn = "~New Task";
  allTaskTitle = '//android.widget.TextView[@text="All Tasks"]';
  checkBoxUnchecked = "//android.widget.CheckBox";
  filterActive = "~Active";
  filterAll = "~All";
  filterBtn = "~Filter";
  filterCompleted = "~Completed";
  moreOptionsMenu = "~More";
  openDrawerBtn = "~Open Drawer";
  pushTaskAdded = '//android.widget.TextView[@text="Task added"]';
  pushTaskMarkedComplete =
    '//android.widget.TextView[@text="Task marked complete"]';
  pushtaskSaved = '//android.widget.TextView[@text="Task saved"]';
  taskDetailsHeader = '//android.widget.TextView[@text="Task Details"]';
  taskTextInput = '//android.widget.TextView[@text="Enter your task here."]';
  taskTitleInput = '//android.widget.TextView[@text="Title"]';
  todoTitle = '//android.widget.TextView[@text="Todo"]';

  getTaskByTitle(title: string) {
    return `//android.widget.TextView[@text="${title}"]`;
  }

  async addTask(title: string, task: string) {
    try {
      const addBtn = await driver.$(this.addTaskBtn);
      await addBtn.waitForDisplayed({ timeout: 5000 });
      await addBtn.click();

      await screens.addEdit.fillTask(title, task);
      await driver.$(this.todoTitle).waitForDisplayed({ timeout: 5000 });
      await driver.$(this.allTaskTitle).waitForDisplayed({ timeout: 5000 });
      const taskTitleSelector = this.getTaskByTitle(title);
      await driver.$(taskTitleSelector).waitForDisplayed({ timeout: 5000 });
    } catch (error) {
      throw new Error(`[addTask]: Error in addTask: ${(error as Error).message}`);
    }
  }
}
