describe("Debug UI Elements", () => {
  it("should click New Task and check form", async () => {
    await driver.pause(2000);

    const newTaskBtn = await driver.$(
      '//android.view.View[@content-desc="New Task"]/..',
    );
    await newTaskBtn.waitForDisplayed({ timeout: 5000 });
    await newTaskBtn.click();

    await driver.pause(2000);

    const source = await driver.getPageSource();
    console.log("\n========== FORM PAGE SOURCE ==========");
    console.log(source);
    console.log("======================================\n");
  });
});
