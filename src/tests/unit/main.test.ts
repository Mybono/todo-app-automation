import "./setup";
import { MainScreen } from "../../screens/main.screen";
import { taskStatuses } from "../../types";
import * as utils from "../../utils";
import { createMockElement, mockFillTask, mockSelectTask } from "./setup";

// Import mocked constants
const {
  mainScreenLocators,
  getTextSelector,
  getCheckBoxSelector,
  push,
} = require("../../constants");

// Mock the actual screens module to use our mocks
jest.mock("../../screens/screensInit", () => {
  const { mockFillTask, mockSelectTask } = require("./setup");

  return {
    screens: {
      task: {
        fillTask: mockFillTask,
        selectTask: mockSelectTask,
      },
      main: {
        toggleCheckbox: jest.fn().mockResolvedValue({
          waitForDisplayed: jest.fn().mockResolvedValue(undefined),
        }),
      },
    },
  };
});

describe("MainScreen Unit Tests", () => {
  let mainScreen: MainScreen;
  let mockElement: any;

  beforeEach(() => {
    mainScreen = new MainScreen();
    mockElement = createMockElement();

    // Setup mocks
    (global.driver.$ as jest.Mock).mockReturnValue(mockElement);
    (global.$ as jest.Mock).mockReturnValue(mockElement);
    (utils.clickElement as jest.Mock).mockResolvedValue(undefined);
    (utils.expectElement as jest.Mock).mockResolvedValue(undefined);

    // Reset our custom mocks
    mockFillTask.mockClear().mockResolvedValue(undefined);
    mockSelectTask.mockClear().mockResolvedValue(undefined);

    jest.clearAllMocks();
  });

  describe("addTask()", () => {
    it("should add a task with title and text", async () => {
      const task = {
        title: "Test Task",
        text: "Test Description",
      };

      const result = await mainScreen.addTask(task);

      expect(utils.clickElement).toHaveBeenCalledWith(
        mainScreenLocators.addTaskBtn,
      );
      expect(mockFillTask).toHaveBeenCalledWith({
        title: "Test Task",
        text: "Test Description",
        status: undefined,
      });
      expect(utils.expectElement).toHaveBeenCalledWith(
        mainScreenLocators.todoTitle,
      );
      expect(utils.expectElement).toHaveBeenCalledWith(
        mainScreenLocators.allTaskTitle,
      );
      expect(getTextSelector).toHaveBeenCalledWith("Test Task");
      expect(result).toBe("mock-text-selector-Test Task");
      expect(utils.logger.info).toHaveBeenCalledWith(
        '[addTask] Task "Test Task" added successfully.',
      );
    });

    it("should generate random title/text if not provided", async () => {
      const task = {};

      const result = await mainScreen.addTask(task);

      expect(utils._.getRandomText).toHaveBeenCalled();
      expect(mockFillTask).toHaveBeenCalledWith({
        title: "Random Title",
        text: "Random Description",
        status: undefined,
      });
      expect(result).toBe("mock-text-selector-Random Title");
    });

    it("should add task with active status and wait for push notification", async () => {
      const task = {
        title: "Active Task",
        text: "Description",
        status: taskStatuses.active,
      };

      await mainScreen.addTask(task);

      expect(mockFillTask).toHaveBeenCalledWith({
        title: "Active Task",
        text: "Description",
        status: taskStatuses.active,
      });
      expect(utils.expectElement).toHaveBeenCalledWith(push.taskAdded);
    });

    it("should add task with completed status without waiting for push", async () => {
      const task = {
        title: "Completed Task",
        text: "Description",
        status: taskStatuses.completed,
      };

      await mainScreen.addTask(task);

      expect(mockFillTask).toHaveBeenCalledWith({
        title: "Completed Task",
        text: "Description",
        status: taskStatuses.completed,
      });
      expect(utils.expectElement).not.toHaveBeenCalledWith(push.taskAdded);
    });
  });

  describe("applyFilter()", () => {
    it('should apply "all" filter', async () => {
      await mainScreen.applyFilter("all");

      expect(utils.clickElement).toHaveBeenCalledWith(
        mainScreenLocators.filterBtn,
      );
      expect(utils.clickElement).toHaveBeenCalledWith(
        mainScreenLocators.filterAll,
      );
      expect(utils.logger.info).toHaveBeenCalledWith(
        "[applyFilter] Applied filter: all",
      );
    });

    it('should apply "active" filter', async () => {
      await mainScreen.applyFilter("active");

      expect(utils.clickElement).toHaveBeenCalledWith(
        mainScreenLocators.filterBtn,
      );
      expect(utils.clickElement).toHaveBeenCalledWith(
        mainScreenLocators.filterActive,
      );
      expect(utils.logger.info).toHaveBeenCalledWith(
        "[applyFilter] Applied filter: active",
      );
    });

    it('should apply "completed" filter', async () => {
      await mainScreen.applyFilter("completed");

      expect(utils.clickElement).toHaveBeenCalledWith(
        mainScreenLocators.filterBtn,
      );
      expect(utils.clickElement).toHaveBeenCalledWith(
        mainScreenLocators.filterCompleted,
      );
      expect(utils.logger.info).toHaveBeenCalledWith(
        "[applyFilter] Applied filter: completed",
      );
    });
  });

  describe("markTaskComplete()", () => {
    it("should mark task complete without titleSelector", async () => {
      await mainScreen.markTaskComplete(true);

      expect(mockSelectTask).not.toHaveBeenCalled();
      expect(getCheckBoxSelector).toHaveBeenCalledWith(false);
      expect(utils.clickElement).toHaveBeenCalledWith("mock-checkbox-false");
      expect(getCheckBoxSelector).toHaveBeenCalledWith(true);
      expect(utils.expectElement).toHaveBeenCalledWith("mock-checkbox-true");
      expect(utils.logger.info).toHaveBeenCalledWith(
        "[markTaskComplete] Task marked as completed",
      );
    });

    it("should mark task as active without titleSelector", async () => {
      await mainScreen.markTaskComplete(false);

      expect(getCheckBoxSelector).toHaveBeenCalledWith(true);
      expect(utils.clickElement).toHaveBeenCalledWith("mock-checkbox-true");
      expect(getCheckBoxSelector).toHaveBeenCalledWith(false);
      expect(utils.expectElement).toHaveBeenCalledWith("mock-checkbox-false");
      expect(utils.logger.info).toHaveBeenCalledWith(
        "[markTaskComplete] Task marked as active",
      );
    });

    it("should select task first when titleSelector is provided", async () => {
      const titleSelector = "mock-selector";

      await mainScreen.markTaskComplete(true, titleSelector);

      expect(mockSelectTask).toHaveBeenCalledWith(titleSelector);
      expect(utils.clickElement).toHaveBeenCalled();
      expect(utils.expectElement).toHaveBeenCalled();
    });
  });

  describe("toggleCheckbox()", () => {
    it("should click checkbox when state differs", async () => {
      mockElement.getAttribute.mockResolvedValue("false");

      const result = await mainScreen.toggleCheckbox("mocked-selector", true);

      expect(global.$).toHaveBeenCalledWith("mocked-selector");
      expect(mockElement.getAttribute).toHaveBeenCalledWith("checked");
      expect(mockElement.click).toHaveBeenCalled();
      expect(getCheckBoxSelector).toHaveBeenCalledWith(true);
    });

    it("should not click if checkbox already in desired state", async () => {
      mockElement.getAttribute.mockResolvedValue("true");

      const result = await mainScreen.toggleCheckbox("mocked-selector", true);

      expect(mockElement.getAttribute).toHaveBeenCalledWith("checked");
      expect(mockElement.click).not.toHaveBeenCalled();
      expect(utils.logger.log).toHaveBeenCalledWith(
        "Checkbox already in desired state",
      );
      expect(result).toBe(mockElement);
    });

    it("should toggle from checked to unchecked", async () => {
      mockElement.getAttribute.mockResolvedValue("true");

      await mainScreen.toggleCheckbox("selector", false);

      expect(mockElement.click).toHaveBeenCalled();
      expect(getCheckBoxSelector).toHaveBeenCalledWith(false);
    });
  });
});
