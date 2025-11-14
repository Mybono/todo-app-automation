import { remote, RemoteOptions } from "webdriverio";

let driver: WebdriverIO.Browser | undefined;

export async function createDriver(): Promise<WebdriverIO.Browser> {
  const options: RemoteOptions = {
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    capabilities: {
      platformName: "Android",
      "appium:deviceName": "Samsung Galaxy S21",
      "appium:app": "./app/apk/app-debug.apk",
      "appium:automationName": "UiAutomator2",
    },
  };

  driver = await remote(options);
  return driver;
}

export { driver };
