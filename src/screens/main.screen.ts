import { _, logger, timeout, getTextSelector } from "../utils";
import { screens } from "../screens";

export class MainScreen {
  addTaskBtn = '//android.view.View[@content-desc="New Task"]/..';
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
  pushTaskSaved = '//android.widget.TextView[@text="Task saved"]';
  pushTaskDeleted = '//android.widget.TextView[@text="Task was deleted"]';
  taskDetailsHeader = '//android.widget.TextView[@text="Task Details"]';
  taskTextInput = '//android.widget.TextView[@text="Enter your task here."]';
  taskTitleInput = '//android.widget.TextView[@text="Title"]';
  todoTitle = '//android.widget.TextView[@text="Todo"]';



  async addTask(title?: string, text?: string) {
    try {
      if (!title || !text) {
        const randomData = _.getRandomText();
        title = title ?? randomData.title;
        text = text ?? randomData.text;
      }

      const addBtn = await driver.$(this.addTaskBtn);
      await addBtn.waitForDisplayed({ timeout: timeout.elementAppear });
      await addBtn.click();

      await screens.addEdit.fillTask({ title, text });
      await driver
        .$(screens.main.pushTaskAdded)
        .waitForDisplayed({ timeout: timeout.elementAppear });
      await driver
        .$(this.todoTitle)
        .waitForDisplayed({ timeout: timeout.elementAppear });
      await driver
        .$(this.allTaskTitle)
        .waitForDisplayed({ timeout: timeout.elementAppear });

      const taskTitleSelector = getTextSelector(title);
      await driver
        .$(taskTitleSelector)
        .waitForDisplayed({ timeout: timeout.elementAppear });

      logger.info(`[addTask] Task "${title}" added successfully.`);
      return taskTitleSelector;
    } catch (error) {
      throw new Error(
        `[addTask]: Error in addTask: ${(error as Error).message}`,
      );
    }
  }
}
