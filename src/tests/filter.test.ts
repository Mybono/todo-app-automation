import {
    headers,
    clickElement,
    expectElement,
} from "../utils";
import { screens } from "../screens";

describe("Filter task @filter @regression", () => {

    it("[UITM009]: Filter tasks between Active @filter @regression", async function () {
        await clickElement(screens.main.filterBtn);
        await clickElement(screens.main.filterActive);

        await expectElement(headers.activeTsks);
    });

    it("[UITM010]: Filter tasks between Completed @filter @regression", async () => {
        await clickElement(screens.main.filterBtn);
        await clickElement(screens.main.filterCompleted);

        await expectElement(headers.completedTsks);
    });

    it("[UITM011]: Filter tasks between All", async () => {
        await clickElement(screens.main.filterBtn);
        await clickElement(screens.main.filterAll);

        await expectElement(headers.allTasks);
    });
});

