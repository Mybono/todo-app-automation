import { headers, clickElement, expectElement } from "../utils";
import { screens } from "../screens";

describe("Filter empty tasks @filter @regression", () => {
  it("[UITM-FE001]: Filter tasks between Active", async () => {
    await clickElement(screens.main.filterBtn);
    await clickElement(screens.main.filterActive);

    await expectElement(headers.noActiveTasks);
  });

  it("[UITM-FE002]: Filter tasks between Completed", async () => {
    await clickElement(screens.main.filterBtn);
    await clickElement(screens.main.filterCompleted);

    await expectElement(headers.noCompletedTasks);
  });

  it("[UITM-FE003]: Filter tasks between All", async () => {
    await clickElement(screens.main.filterBtn);
    await clickElement(screens.main.filterAll);

    await expectElement(headers.noAllTasks);
  });
});
