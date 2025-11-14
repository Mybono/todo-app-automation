import { Given, When, Then } from "@cucumber/cucumber";
import wd, { Browser } from "wd";
import { expect } from "chai";
import { MainScreen } from "../pages";

let driver: Browser;
let mainScreen: MainScreen;

const caps = {
  platformName: "Android",
  deviceName: "Pixel_7_API_34",   
  app: "./app/apk/app-debug.apk", 
  automationName: "UiAutomator2"
};

Given("I am on the main screen", async () => {
  driver = wd.promiseChainRemote("localhost", 4723); // Appium сервер по умолчанию
  await driver.init(caps);
  mainScreen = new MainScreen(driver);
});

When("I add a new task {string}", async (taskName: string) => {
  await mainScreen.addTask(taskName);
});

Then("I should see the task {string} in the list", async (taskName: string) => {
  const tasks = await mainScreen.getTasks();
  const texts = await Promise.all(tasks.map(t => t.text()));
  expect(texts).to.include(taskName);
});
