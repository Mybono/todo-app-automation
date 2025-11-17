import "./setup";
import { settingsScreenLocators, mainScreenLocators } from "../../constants";
import { SettingsScreen } from "../../screens/settings.screen";
import * as utils from "../../utils";
import { screens } from "../../screens";
import { createMockElement, resetAllMocks } from "./setup";

describe("SettingsScreen Unit Tests", () => {
  let settingsScreen: SettingsScreen;
  let mockElement: any;

  beforeEach(() => {
    settingsScreen = new SettingsScreen();
    mockElement = createMockElement();

    (global.driver.$ as jest.Mock).mockReturnValue(mockElement);
    (global.$ as jest.Mock).mockReturnValue(mockElement);

    resetAllMocks();
  });

  describe("goToNavigateScreen()", () => {
    it("should open burger menu and wait for Todo header", async () => {
      await settingsScreen.goToNavigateScreen();

      expect(utils.clickElement).toHaveBeenCalledWith(
        settingsScreenLocators.burgerMenuBtn,
      );
      expect(utils.expectElement).toHaveBeenCalledWith(
        settingsScreenLocators.todoHeader,
      );
    });

    it("should throw error when burger menu click fails", async () => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error("Burger menu not found"),
      );

      await expect(settingsScreen.goToNavigateScreen()).rejects.toThrow(
        "[goToNavigateScreen]: Burger menu not found",
      );
    });

    it("should throw error when Todo header is not displayed", async () => {
      (utils.expectElement as jest.Mock).mockRejectedValueOnce(
        new Error("Todo header not found"),
      );

      await expect(settingsScreen.goToNavigateScreen()).rejects.toThrow(
        "[goToNavigateScreen]: Todo header not found",
      );
    });

    it("should call clickElement before expectElement", async () => {
      const callOrder: string[] = [];

      (utils.clickElement as jest.Mock).mockImplementation(() => {
        callOrder.push("clickElement");
        return Promise.resolve();
      });

      (utils.expectElement as jest.Mock).mockImplementation(() => {
        callOrder.push("expectElement");
        return Promise.resolve();
      });

      await settingsScreen.goToNavigateScreen();

      expect(callOrder).toEqual(["clickElement", "expectElement"]);
    });
  });

  describe("goToStatisticsScreen()", () => {
    it("should click statistics button and wait for statistics header", async () => {
      await settingsScreen.goToStatisticsScreen();

      expect(utils.clickElement).toHaveBeenCalledWith(
        settingsScreenLocators.statisticsBtn,
      );
    });

    it("should throw error when statistics button click fails", async () => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error("Statistics button not found"),
      );

      await expect(settingsScreen.goToStatisticsScreen()).rejects.toThrow(
        "[goToStatisticsScreen]: Statistics button not found",
      );
    });

    it("should throw error when statistics header is not displayed", async () => {
      (utils.expectElement as jest.Mock).mockRejectedValueOnce(
        new Error("Statistics header not found"),
      );

      await expect(settingsScreen.goToStatisticsScreen()).rejects.toThrow(
        "[goToStatisticsScreen]: Statistics header not found",
      );
    });

    it("should use correct statistics header selector from screens", async () => {
      await settingsScreen.goToStatisticsScreen();

      expect(utils.expectElement).toHaveBeenCalledWith(
        '//android.widget.TextView[@text="Statistics"]',
      );
    });
  });

  describe("goToTasksScreen()", () => {
    it("should click task list button and wait for todo title", async () => {
      await settingsScreen.goToTasksScreen();

      expect(utils.clickElement).toHaveBeenCalledWith(
        settingsScreenLocators.taskListBtn,
      );
      expect(utils.expectElement).toHaveBeenCalledWith(
        mainScreenLocators.todoTitle,
      );
    });

    it("should throw error when task list button click fails", async () => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error("Task list button not found"),
      );

      await expect(settingsScreen.goToTasksScreen()).rejects.toThrow(
        "[goToStatisticsScreen]: Task list button not found",
      );
    });

    it("should throw error when todo title is not displayed", async () => {
      (utils.expectElement as jest.Mock).mockRejectedValueOnce(
        new Error("Todo title not found"),
      );

      await expect(settingsScreen.goToTasksScreen()).rejects.toThrow(
        "[goToStatisticsScreen]: Todo title not found",
      );
    });

    it("should use correct todo title selector from screens.main", async () => {
      await settingsScreen.goToTasksScreen();

      expect(utils.expectElement).toHaveBeenCalledWith(
        '//android.widget.TextView[@text="Todo"]',
      );
    });

    it("should call clickElement before expectElement", async () => {
      const callOrder: string[] = [];

      (utils.clickElement as jest.Mock).mockImplementation(() => {
        callOrder.push("clickElement");
        return Promise.resolve();
      });

      (utils.expectElement as jest.Mock).mockImplementation(() => {
        callOrder.push("expectElement");
        return Promise.resolve();
      });

      await settingsScreen.goToTasksScreen();

      expect(callOrder).toEqual(["clickElement", "expectElement"]);
    });
  });

  describe("Navigation flow", () => {
    it("should navigate from settings to statistics and verify", async () => {
      await settingsScreen.goToStatisticsScreen();

      expect(utils.clickElement).toHaveBeenCalledTimes(1);
      expect(utils.expectElement).toHaveBeenCalledTimes(1);
      expect(utils.clickElement).toHaveBeenCalledWith(
        settingsScreenLocators.statisticsBtn,
      );
    });

    it("should navigate from settings to tasks and verify", async () => {
      await settingsScreen.goToTasksScreen();

      expect(utils.clickElement).toHaveBeenCalledTimes(1);
      expect(utils.expectElement).toHaveBeenCalledTimes(1);
      expect(utils.clickElement).toHaveBeenCalledWith(
        settingsScreenLocators.taskListBtn,
      );
    });

    it("should open navigation menu successfully", async () => {
      await settingsScreen.goToNavigateScreen();

      expect(utils.clickElement).toHaveBeenCalledWith(
        settingsScreenLocators.burgerMenuBtn,
      );
      expect(utils.expectElement).toHaveBeenCalledWith(
        settingsScreenLocators.todoHeader,
      );
    });
  });

  describe("Error handling", () => {
    it("should handle network timeout in goToNavigateScreen", async () => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error("Timeout exceeded"),
      );

      await expect(settingsScreen.goToNavigateScreen()).rejects.toThrow(
        "[goToNavigateScreen]: Timeout exceeded",
      );
    });

    it("should handle network timeout in goToStatisticsScreen", async () => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error("Timeout exceeded"),
      );

      await expect(settingsScreen.goToStatisticsScreen()).rejects.toThrow(
        "[goToStatisticsScreen]: Timeout exceeded",
      );
    });

    it("should handle network timeout in goToTasksScreen", async () => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error("Timeout exceeded"),
      );

      await expect(settingsScreen.goToTasksScreen()).rejects.toThrow(
        "[goToStatisticsScreen]: Timeout exceeded",
      );
    });

    it("should preserve error message in goToNavigateScreen", async () => {
      const originalError = new Error("Custom error message");
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(originalError);

      await expect(settingsScreen.goToNavigateScreen()).rejects.toThrow(
        "[goToNavigateScreen]: Custom error message",
      );
    });

    it("should preserve error message in goToStatisticsScreen", async () => {
      const originalError = new Error("Statistics error");
      (utils.expectElement as jest.Mock).mockRejectedValueOnce(originalError);

      await expect(settingsScreen.goToStatisticsScreen()).rejects.toThrow(
        "[goToStatisticsScreen]: Statistics error",
      );
    });
  });
});
