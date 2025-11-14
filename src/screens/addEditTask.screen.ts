import { screens } from "../screens";

export class AddEditTaskScreen {
  newTaskHeader = '//android.widget.TextView[@text="New Task"]';
  taskDetailsHeader = '//android.widget.TextView[@text="Task Details"]';
  taskTitleInput = '//android.widget.TextView[@text="Title"]';
  taskTextInput = '//android.widget.TextView[@text="Enter your task here."]';
  saveTaskBtn = "~Save task";
  deleteBtn = "~Delete task";
  editBtn = "~Edit";
  backBtn = "~Back";

  async fillTask(title: string, text: string) {
    await (await driver.$(this.taskTitleInput)).setValue(title);
    await (await driver.$(this.taskTextInput)).setValue(text);
    await (await driver.$(this.saveTaskBtn)).click();
    await driver
      .$(screens.main.pushTaskAdded)
      .waitForDisplayed({ timeout: 5000 });
  }
}
