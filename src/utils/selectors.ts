import { logger } from "../utils";

export function getTextSelector(title: string) {
    return `android=new UiSelector().className("android.widget.TextView").textContains("${title}")`;
}

export function getCheckBoxSelector(isChecked: boolean) {
    return `android=new UiSelector().className("android.widget.CheckBox").checked(${isChecked})`
}

export async function toggleCheckbox(selector: string, desiredState: boolean) {
    try {
    const checkbox = await $(selector);
    const currentState = (await checkbox.getAttribute('checked')) === 'true';

    if (currentState !== desiredState) {
        await checkbox.click();
        const newSelector = getCheckBoxSelector(desiredState);
        return await $(newSelector);
    } else {
        logger.log('Checkbox already in desired state');
        return checkbox; 
    }
    } catch (error) {
        throw new Error(`[toggleCheckbox]: ${(error as Error).message}`);
    }
}

export async function fetchSource() {
    const source = await driver.getPageSource();
    logger.warn("\n========== LIST WITH TASK ==========");
    logger.log(source);
    logger.warn("====================================\n");
}

export const push = {
    taskMarkedActive: '//android.widget.TextView[@text="Task marked active"]',
    taskSaved: '//android.widget.TextView[@text="Task saved"]',
    taskAdded: '//android.widget.TextView[@text="Task added"]',
    taskMarkedComplete: '//android.widget.TextView[@text="Task marked complete"]',
    taskDeleted: '//android.widget.TextView[@text="Task was deleted"]'
}
