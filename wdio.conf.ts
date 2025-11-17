import { capabilities } from "./src/config";
import { logger } from "./src/utils/logger";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";

declare const browser: WebdriverIO.Browser;
declare const allure: any;

export const config = {
  runner: "local",
  path: "/",
  port: 4723,

  specs: ["./dist/tests/e2e/**/*.js"],
  maxInstances: 1,

  capabilities: capabilities as any,

  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "reports/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  services: [],

  onPrepare: function () {
    try {
      logger.log("💥 Cleaning Appium packages...");

      const packages = [
        "io.appium.uiautomator2.server",
        "io.appium.uiautomator2.server.test",
        "io.appium.settings",
      ];

      for (const pkg of packages) {
        logger.log(`🧹 Clearing package: ${pkg}`);
        try {
          execSync(`adb -s emulator-5554 shell pm clear ${pkg}`);
        } catch {}
        try {
          execSync(`adb -s emulator-5554 uninstall ${pkg}`);
        } catch {}
      }

      logger.log("✅ Appium packages cleaned successfully!");
    } catch (e) {
      logger.warn(`⚠️ Cleanup failed, continuing anyway: ${e}`);
    }
  },

  afterTest: async function (
    test: { title: string },
    context: any,
    {
      error,
      result,
      duration,
      passed,
      retries,
    }: {
      error?: any;
      result?: any;
      duration?: number;
      passed: boolean;
      retries?: any;
    },
  ) {
    if (!passed) {
      try {
        const screenshotDir = path.join("reports", "screenshots");
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }

        const timestamp = dayjs().format("YYYYMMDD_HHmmss");
        const sanitizedTestName = test.title
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_-]/g, "");
        const screenshotName = `${sanitizedTestName}_${timestamp}.png`;
        const screenshotPath = path.join(screenshotDir, screenshotName);

        await browser.saveScreenshot(screenshotPath);

        const fileBuffer = fs.readFileSync(screenshotPath);
        await allure.addAttachment(
          "Screenshot on Failure",
          fileBuffer,
          "image/png",
        );

        logger.log(`[afterTest] Screenshot saved: ${screenshotPath}`);
      } catch (err) {
        logger.warn(
          `[afterTest] Failed to save screenshot: ${(err as Error).message}`,
        );
      }
    }
  },
};
