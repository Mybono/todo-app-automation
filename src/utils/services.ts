import { timeout } from "../utils";

export async function expectPushMessage(selector: string) {
  const message = await driver!.$(selector);
  await message.waitForDisplayed({ timeout: timeout.elementAppear });
  expect(await message.isDisplayed()).toBe(true);
}
