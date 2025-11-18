import { expectElement } from '../../utils';
import { screens } from '../../screens';
import { mainScreenLocators, settingsScreenLocators } from '../../constants';

describe('Screens navigation @navigate @regression', () => {
  it('[UITM-NA001]: Navigates from Tasks screen to Settings screen', async () => {
    await screens.settings.goToNavigateScreen();

    await expectElement(settingsScreenLocators.statisticsBtn);
    await expectElement(settingsScreenLocators.taskListBtn);
  });

  it('[UITM-NA002]: Navigates from Settings screen to Statistics screen', async () => {
    await screens.settings.goToStatisticsScreen();

    await expectElement(settingsScreenLocators.statisticsBtn);
  });

  it('[UITM-NA003]: Navigates from Statistics screen back to Settings screen', async () => {
    await screens.settings.goToNavigateScreen();

    await expectElement(settingsScreenLocators.statisticsBtn);
  });

  it('[UITM-NA004]: Navigates from Settings screen to Tasks screen', async () => {
    await screens.settings.goToTasksScreen();

    await expectElement(mainScreenLocators.filterBtn);
  });
});
