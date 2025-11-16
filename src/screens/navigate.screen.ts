import {
    _,
    clickElement,
    expectElement,
} from "../utils";
import { screens } from "../screens";

export class NavigateScreen {
    burgerMenuBtn = "~Open Drawer";
    statisticsBtn = '//android.widget.TextView[@text="Statistics"]';
    taskListBtn = '//android.widget.TextView[@text="Task List"]';
    todoHeader = '//android.widget.TextView[@text="Todo"]';

    async goToNavigateScreen() {
        try {
            await clickElement(this.burgerMenuBtn);
            await expectElement(this.todoHeader);
        } catch (error) {
            throw new Error(`[goToNavigateScreen]: ${(error as Error).message}`);
        }
    }

    async goToStatisticsScreen() {
        try {
            await clickElement(this.statisticsBtn);
            await expectElement(screens.statistics.statisticHeader);
        } catch (error) {
            throw new Error(`[goToStatisticsScreen]: ${(error as Error).message}`);
        }
    }

    async goToTasksScreen() {
        try {
            await clickElement(this.taskListBtn);
            await expectElement(screens.main.todoTitle);
        } catch (error) {
            throw new Error(`[goToStatisticsScreen]: ${(error as Error).message}`);
        }
    }
}
