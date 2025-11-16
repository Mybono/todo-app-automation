import { expectElement } from "../utils";
import { screens } from "../screens";

describe("Screens navigation @navigate @regression", () => {
  it("[UITM-NA001]: Navigates from Tasks screen to Settings screen", async () => {
    await screens.settings.goToNavigateScreen();

    await expectElement(screens.settings.statisticsBtn);
    await expectElement(screens.settings.taskListBtn);
  });

  it("[UITM-NA002]: Navigates from Settings screen to Statistics screen", async () => {
    await screens.settings.goToStatisticsScreen();

    await expectElement(screens.statistics.statisticHeader);
  });

  it("[UITM-NA003]: Navigates from Statistics screen back to Settings screen", async () => {
    await screens.settings.goToNavigateScreen();

    await expectElement(screens.settings.statisticsBtn);
    await expectElement(screens.settings.taskListBtn);
  });

  it("[UITM-NA004]: Navigates from Settings screen to Tasks screen", async () => {
    await screens.settings.goToTasksScreen();

    await expectElement(screens.main.filterBtn);
  });
});
