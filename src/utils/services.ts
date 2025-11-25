import { timeout } from '../constants';
import { $, browser } from '@wdio/globals';

/**
 * Waits for an element to be visible and asserts that it is displayed.
 */
export async function expectElement(selector: string): Promise<ReturnType<typeof $>>  {
  try {
    const element = browser!.$(selector);
    await element.waitForDisplayed({ timeout: timeout.elementAppear });
    expect(await element.isDisplayed()).toBe(true);

    return element;
  } catch (error) {
    throw new Error(
      `[expectElement]: Element is not visible: ${selector}\n${(error as Error).message}`,
    );
  }
}

/**
 * Waits for an element to be visible and clicks on it.
 */
export async function clickElement(selector: string): Promise<void> {
  try {
    const element = browser!.$(selector);
    await element.waitForDisplayed({ timeout: timeout.elementAppear });
    await element.click();
  } catch (error) {
    throw new Error(
      `[clickElement]: Failed to click element: ${selector}\n${(error as Error).message}`,
    );
  }
}
