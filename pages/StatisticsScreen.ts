import { Browser } from "wd";

export class SettingsScreen {
  driver: Browser;

  constructor(driver: Browser) {
    this.driver = driver;
  }

  async openStatistics() {
    const statsBtn = await this.driver.elementByAccessibilityId("statistics");
    await statsBtn.click();
  }
}
