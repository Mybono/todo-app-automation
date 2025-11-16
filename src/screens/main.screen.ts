import { _, clickElement, logger, timeout, getTextSelector, push } from "../utils";
import { Task, taskStatuses } from "../interfaces";
import { screens } from "../screens";

export class MainScreen {
  burgerMenuBtn = "~Open Drawer";
  addTaskBtn = '//android.view.View[@content-desc="New Task"]/..';
  allTaskTitle = '//android.widget.TextView[@text="All Tasks"]';
  checkBoxUnchecked = "//android.widget.CheckBox";
  moreOptionsMenu = "~More";
  taskDetailsHeader = '//android.widget.TextView[@text="Task Details"]';
  taskTextInput = '//android.widget.TextView[@text="Enter your task here."]';
  taskTitleInput = '//android.widget.TextView[@text="Title"]';
  todoTitle = '//android.widget.TextView[@text="Todo"]';
  filterCompleted = '//android.widget.TextView[@text="Completed"]';
  filterActive = '//android.widget.TextView[@text="Active"]';
  filterAll = '//android.widget.TextView[@text="All"]';
  filterBtn = "~Filter";


  async addTask(task: Task) {
    let title = task.title;
    let text = task.text;
    let taskStaus = task.status;
    try {
      if (!task.title || !task.text) {
        const randomData = _.getRandomText();
        title = randomData.title;
        text = randomData.text;
      }

      await clickElement(this.addTaskBtn);
      await screens.addEdit.fillTask({
        title: title,
        text: text,
        status: taskStaus,
      });

      if (taskStaus === taskStatuses.active) {
        await driver
          .$(push.taskAdded)
          .waitForDisplayed({ timeout: timeout.elementAppear });
      }
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
