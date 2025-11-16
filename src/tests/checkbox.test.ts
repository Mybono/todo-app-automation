import { timeout, push, getCheckBoxSelector, expectPushMessage, toggleCheckbox } from "../utils";
import { taskStatuses } from "../interfaces";
import { screens } from "../screens";


describe("Task Checkbox Actions @checkbox @smoke", () => {

    it("[UITM005]: Marks a task as completed from the task details screen", async () => {
        const titleSelector = await screens.main.addTask({ status: taskStatuses.active });
        await screens.addEdit.selectTask(titleSelector);

        const checkbox = getCheckBoxSelector(false);
        let checkedCheckbox = await toggleCheckbox(checkbox, true);
        await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });
        expect(await checkedCheckbox.isDisplayed()).toBe(true);

        await expectPushMessage(push.taskMarkedComplete);
        await screens.addEdit.backToMain();
    })

    it("[UITM006]: Marks a task as active from the task details screen", async function () {
        const titleSelector = await screens.main.addTask({ status: taskStatuses.completed });
        await screens.addEdit.selectTask(titleSelector);

        const checkbox = getCheckBoxSelector(true);
        let checkedCheckbox = await toggleCheckbox(checkbox, false);
        await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });
        expect(await checkedCheckbox.isDisplayed()).toBe(true);

        await expectPushMessage(push.taskMarkedActive);
        await screens.addEdit.backToMain();
    })

    it("[UITM007]: Marks a task as completed directly from the main task list", async () => {
        await screens.main.addTask({ status: taskStatuses.active });
        const checkbox = getCheckBoxSelector(false);
        let checkedCheckbox = await toggleCheckbox(checkbox, true);
        await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });

        expect(await checkedCheckbox.isDisplayed()).toBe(true);
        await expectPushMessage(push.taskMarkedComplete);
    })

    it("[UITM008]: Marks a task as active directly from the main task list", async () => {
        await screens.main.addTask({ status: taskStatuses.completed });
        const checkbox = getCheckBoxSelector(true);
        let checkedCheckbox = await toggleCheckbox(checkbox, false);
        await checkedCheckbox.waitForDisplayed({ timeout: timeout.elementAppear });

        expect(await checkedCheckbox.isDisplayed()).toBe(true);
        await expectPushMessage(push.taskMarkedActive);
    })
});
