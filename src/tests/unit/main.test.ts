import './setup';
import { createMockElement, mockFillTask, mockSelectTask } from './setup';
import { taskStatuses, MockElement } from '../../types';
import { MainScreen } from '../../screens/main.screen';
import * as utils from '../../utils';

// Import mocked constants
const {
  mainScreenLocators,
  getTextSelector,
  getCheckBoxSelector,
  push,
} = require('../../constants');

// Mock the actual screens module to use our mocks
jest.mock('../../screens/screensInit', () => {
  const { mockFillTask, mockSelectTask } = require('./setup');

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

describe('MainScreen Unit Tests', () => {
  let mainScreen: MainScreen;
  let mockElement: MockElement;

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

  describe('addTask()', () => {
    it('should add a task with title and text', async () => {
      const task = {
        title: 'Test Task',
        text: 'Test Description',
      };

      const result = await mainScreen.addTask(task);

      await expect(utils.clickElement).toHaveBeenCalledWith(mainScreenLocators.addTaskBtn);
      await expect(mockFillTask).toHaveBeenCalledWith({
        title: 'Test Task',
        text: 'Test Description',
        status: undefined,
      });
      await expect(utils.expectElement).toHaveBeenCalledWith(mainScreenLocators.todoTitle);
      await expect(utils.expectElement).toHaveBeenCalledWith(mainScreenLocators.allTaskTitle);
      await expect(getTextSelector).toHaveBeenCalledWith('Test Task');
      await expect(result).toBe('mock-text-selector-Test Task');
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[addTask] Task "Test Task" added successfully.',
      );
    });

    it('should generate random title/text if not provided', async () => {
      const task = {};

      const result = await mainScreen.addTask(task);

      await expect(utils._.getRandomText).toHaveBeenCalled();
      await expect(mockFillTask).toHaveBeenCalledWith({
        title: 'Random Title',
        text: 'Random Description',
        status: undefined,
      });
      await expect(result).toBe('mock-text-selector-Random Title');
    });

    it('should add task with active status and wait for push notification', async () => {
      const task = {
        title: 'Active Task',
        text: 'Description',
        status: taskStatuses.active,
      };

      await mainScreen.addTask(task);

      await expect(mockFillTask).toHaveBeenCalledWith({
        title: 'Active Task',
        text: 'Description',
        status: taskStatuses.active,
      });
      await expect(utils.expectElement).toHaveBeenCalledWith(push.taskAdded);
    });

    it('should add task with completed status without waiting for push', async () => {
      const task = {
        title: 'Completed Task',
        text: 'Description',
        status: taskStatuses.completed,
      };

      await mainScreen.addTask(task);

      await expect(mockFillTask).toHaveBeenCalledWith({
        title: 'Completed Task',
        text: 'Description',
        status: taskStatuses.completed,
      });
      await expect(utils.expectElement).not.toHaveBeenCalledWith(push.taskAdded);
    });
  });

  describe('applyFilter()', () => {
    it('should apply "all" filter', async () => {
      await mainScreen.applyFilter('all');

      await expect(utils.clickElement).toHaveBeenCalledWith(mainScreenLocators.filterBtn);
      await expect(utils.clickElement).toHaveBeenCalledWith(mainScreenLocators.filterAll);
      await expect(utils.logger.info).toHaveBeenCalledWith('[applyFilter] Applied filter: all');
    });

    it('should apply "active" filter', async () => {
      await mainScreen.applyFilter('active');

      await expect(utils.clickElement).toHaveBeenCalledWith(mainScreenLocators.filterBtn);
      await expect(utils.clickElement).toHaveBeenCalledWith(mainScreenLocators.filterActive);
      await expect(utils.logger.info).toHaveBeenCalledWith('[applyFilter] Applied filter: active');
    });

    it('should apply "completed" filter', async () => {
      await mainScreen.applyFilter('completed');

      await expect(utils.clickElement).toHaveBeenCalledWith(mainScreenLocators.filterBtn);
      await expect(utils.clickElement).toHaveBeenCalledWith(mainScreenLocators.filterCompleted);
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[applyFilter] Applied filter: completed',
      );
    });
  });

  describe('markTaskComplete()', () => {
    it('should mark task complete without titleSelector', async () => {
      await mainScreen.markTaskComplete(true);

      await expect(mockSelectTask).not.toHaveBeenCalled();
      await expect(getCheckBoxSelector).toHaveBeenCalledWith(false);
      await expect(utils.clickElement).toHaveBeenCalledWith('mock-checkbox-false');
      await expect(getCheckBoxSelector).toHaveBeenCalledWith(true);
      await expect(utils.expectElement).toHaveBeenCalledWith('mock-checkbox-true');
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[markTaskComplete] Task marked as completed',
      );
    });

    it('should mark task as active without titleSelector', async () => {
      await mainScreen.markTaskComplete(false);

      await expect(getCheckBoxSelector).toHaveBeenCalledWith(true);
      await expect(utils.clickElement).toHaveBeenCalledWith('mock-checkbox-true');
      await expect(getCheckBoxSelector).toHaveBeenCalledWith(false);
      await expect(utils.expectElement).toHaveBeenCalledWith('mock-checkbox-false');
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[markTaskComplete] Task marked as active',
      );
    });

    it('should select task first when titleSelector is provided', async () => {
      const titleSelector = 'mock-selector';

      await mainScreen.markTaskComplete(true, titleSelector);

      await expect(mockSelectTask).toHaveBeenCalledWith(titleSelector);
      await expect(utils.clickElement).toHaveBeenCalled();
      await expect(utils.expectElement).toHaveBeenCalled();
    });
  });

  describe('toggleCheckbox()', () => {
    it('should click checkbox when state differs', async () => {
      mockElement.getAttribute.mockResolvedValue('false');

      await mainScreen.toggleCheckbox('mocked-selector', true);

      await expect(global.$).toHaveBeenCalledWith('mocked-selector');
      await expect(mockElement.getAttribute).toHaveBeenCalledWith('checked');
      await expect(mockElement.click).toHaveBeenCalled();
      await expect(getCheckBoxSelector).toHaveBeenCalledWith(true);
    });

    it('should not click if checkbox already in desired state', async () => {
      mockElement.getAttribute.mockResolvedValue('true');

      const result = await mainScreen.toggleCheckbox('mocked-selector', true);

      await expect(mockElement.getAttribute).toHaveBeenCalledWith('checked');
      await expect(mockElement.click).not.toHaveBeenCalled();
      await expect(utils.logger.log).toHaveBeenCalledWith('Checkbox already in desired state');
      await expect(result).toBe(mockElement);
    });

    it('should toggle from checked to unchecked', async () => {
      mockElement.getAttribute.mockResolvedValue('true');

      await mainScreen.toggleCheckbox('selector', false);

      await expect(mockElement.click).toHaveBeenCalled();
      await expect(getCheckBoxSelector).toHaveBeenCalledWith(false);
    });
  });
});
