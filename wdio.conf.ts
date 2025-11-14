import type { Options } from "@wdio/types";

export const config = {
  runner: "local",
  path: "/",
  port: 4723,

  specs: ["./src/tests/**/*.ts"],
  maxInstances: 1,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    timeout: 60000,
  },

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Samsung Galaxy S21",
      "appium:app": "./app/apk/app-debug.apk",
      "appium:automationName": "UiAutomator2",
    },
  ],

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.json",
    },
  },
} as Options.Testrunner;
