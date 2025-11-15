import type { Options } from "@wdio/types";
import { capabilities } from "./src/config/capabilities";
import { logger } from "./src/utils/logger";
import { execSync } from "child_process";

export const config: Options.Testrunner = {
    runner: "local",
    path: "/",
    port: 4723,

    specs: ["./src/tests/**/*.ts"],
    maxInstances: 1,
    framework: "mocha",
    reporters: ["spec"],

    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
        require: ["ts-node/register"] // подключаем ts-node
    },

    services: [
        ["appium", {
            command: "appium",
            args: {
                relaxedSecurity: true
            },
            capabilities: capabilities
        }]
    ],

    /**
     * Hook before starting the session: clean only Appium packages
     * without killing the emulator.
     */
    onPrepare: function () {
        try {
            logger.log("💥 Cleaning Appium packages...");

            const packages = [
                "io.appium.uiautomator2.server",
                "io.appium.uiautomator2.server.test",
                "io.appium.settings"
            ];

            for (const pkg of packages) {
                logger.log(`🧹 Clearing package: ${pkg}`);
                try { execSync(`adb -s emulator-5554 shell pm clear ${pkg}`) } catch {}
                try { execSync(`adb -s emulator-5554 uninstall ${pkg}`) } catch {}
            }

            logger.log("✅ Appium packages cleaned successfully!");
        } catch (e) {
            logger.warn(`⚠️ Cleanup failed, continuing anyway: ${e}`);
        }
    }
};
