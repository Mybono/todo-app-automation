import { expectElement } from "../utils";
import { screens } from "../screens";

describe("Screens navigate @navigate @regression", () => {
    it("[UITM-NA001]: From Tasks screen go to Navigate screen", async () => {
        await screens.navigate.goToNavigateScreen();

        await expectElement(screens.navigate.statisticsBtn);
        await expectElement(screens.navigate.taskListBtn);
    });

    it("[UITM-NA002]: From Navigate screen go to Statistics screen", async () => {
        await screens.navigate.goToStatisticsScreen();

        await expectElement(screens.statistics.statisticHeader);
    });

    it("[UITM-NA003]: From Statistics screen go to Navigate screen", async () => {
        await screens.navigate.goToNavigateScreen();

        await expectElement(screens.navigate.statisticsBtn);
        await expectElement(screens.navigate.taskListBtn);
    });

    it("[UITM-NA003]: From Navigate screen go to Tasks screen", async () => {
        await screens.navigate.goToTasksScreen();

        await expectElement(screens.main.filterBtn);
    });
});
