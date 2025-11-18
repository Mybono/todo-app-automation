import { mainScreenLocators, settingsScreenLocators } from '../constants';
import { _, clickElement, expectElement } from '../utils';

export class SettingsScreen {
  async goToNavigateScreen() {
    try {
      await clickElement(settingsScreenLocators.burgerMenuBtn);
      await expectElement(settingsScreenLocators.todoHeader);
    } catch (error) {
      throw new Error(`[goToNavigateScreen]: ${(error as Error).message}`);
    }
  }

  async goToStatisticsScreen() {
    try {
      await clickElement(settingsScreenLocators.statisticsBtn);
      await expectElement(settingsScreenLocators.statisticsBtn);
    } catch (error) {
      throw new Error(`[goToStatisticsScreen]: ${(error as Error).message}`);
    }
  }

  async goToTasksScreen() {
    try {
      await clickElement(settingsScreenLocators.taskListBtn);
      await expectElement(mainScreenLocators.todoTitle);
    } catch (error) {
      throw new Error(`[goToStatisticsScreen]: ${(error as Error).message}`);
    }
  }
}
