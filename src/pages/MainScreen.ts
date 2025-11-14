import { driver } from "../utils/driver";

export class MainScreen {
  async addTask(task: string) {
    const input = await driver?.$("//android.widget.EditText");
    await input?.setValue(task);
    const addBtn = await driver?.$("//android.widget.Button[@text='Add']");
    await addBtn?.click();
  }

  async getTasks(): Promise<string[]> {
    const tasks = await driver?.$$("//android.widget.TextView");
    return tasks?.map((t) => t.getText()) ?? [];
  }
}
