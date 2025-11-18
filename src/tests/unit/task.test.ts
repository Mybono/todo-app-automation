import './setup'; // Import shared mocks
import { TaskScreen } from '../../screens/task.screen';
import { taskStatuses, MockElement } from '../../types';
import * as utils from '../../utils';
import { screens } from '../../screens';
import { createMockElement, createMockElements } from './setup';

// Import mocked constants
const {
  taskScreenLocators,
  getCheckBoxSelector,
  getTextSelector,
  editTextWidget,
  timeout,
} = require('../../constants');

describe('TaskScreen Unit Tests', () => {
  let taskScreen: TaskScreen;
  let mockElement: MockElement;
  let mockElements: MockElement[];

  beforeEach(() => {
    taskScreen = new TaskScreen();
    mockElement = createMockElement();
    mockElements = createMockElements();

    // Setup mocks
    (global.driver.$ as jest.Mock).mockReturnValue(mockElement);
    (global.$ as jest.Mock).mockReturnValue(mockElement);
    (global.$$ as jest.Mock).mockResolvedValue(mockElements);
    (global.browser.waitUntil as jest.Mock).mockResolvedValue(true);
    (utils.clickElement as jest.Mock).mockResolvedValue(undefined);
    (utils.expectElement as jest.Mock).mockResolvedValue(undefined);

    jest.clearAllMocks();
  });

  describe('fillTask()', () => {
    it('should fill task with title and text', async() => {
      const task = {
        title: 'Test Task',
        text: 'Test Description',
      };

      await taskScreen.fillTask(task);

      await expect(global.$$).toHaveBeenCalledWith(editTextWidget);
      await expect(mockElements[0].setValue).toHaveBeenCalledWith('Test Task');
      await expect(mockElements[1].setValue).toHaveBeenCalledWith(
        'Test Description',
      );
      await expect(utils.clickElement).toHaveBeenCalledWith(
        taskScreenLocators.saveTaskBtn,
      );
      await expect(screens.main.toggleCheckbox).not.toHaveBeenCalled();
    });

    it('should fill task and mark as completed if status is completed', async() => {
      const task = {
        title: 'Completed Task',
        text: 'Description',
        status: taskStatuses.completed,
      };

      const mockCheckedCheckbox = {
        waitForDisplayed: jest.fn().mockResolvedValue(undefined),
      };
      (screens.main.toggleCheckbox as jest.Mock).mockResolvedValue(
        mockCheckedCheckbox,
      );

      await taskScreen.fillTask(task);

      await expect(mockElements[0].setValue).toHaveBeenCalledWith(
        'Completed Task',
      );
      await expect(mockElements[1].setValue).toHaveBeenCalledWith(
        'Description',
      );
      await expect(utils.clickElement).toHaveBeenCalledWith(
        taskScreenLocators.saveTaskBtn,
      );
      await expect(getCheckBoxSelector).toHaveBeenCalledWith(false);
      await expect(screens.main.toggleCheckbox).toHaveBeenCalledWith(
        'mock-checkbox-false',
        true,
      );
      await expect(mockCheckedCheckbox.waitForDisplayed).toHaveBeenCalledWith({
        timeout: timeout.elementAppear,
      });
    });
  });

  describe('editTask()', () => {
    it('should edit task with new title and text', async() => {
      const task = {
        title: 'Updated Title',
        text: 'Updated Description',
        selector: 'mock-selector',
      };

      const result = await taskScreen.editTask(task);

      await expect(utils.clickElement).toHaveBeenCalledWith('mock-selector');
      await expect(utils.expectElement).toHaveBeenCalledWith(
        taskScreenLocators.taskDetailsHeader,
      );
      await expect(utils.clickElement).toHaveBeenCalledWith(
        taskScreenLocators.editBtn,
      );
      await expect(mockElements[0].setValue).toHaveBeenCalledWith(
        'Updated Title',
      );
      await expect(mockElements[1].setValue).toHaveBeenCalledWith(
        'Updated Description',
      );
      await expect(utils.clickElement).toHaveBeenCalledWith(
        taskScreenLocators.saveTaskBtn,
      );
      await expect(getTextSelector).toHaveBeenCalledWith('Updated Title');
      await expect(result).toBe('mock-text-selector-Updated Title');
    });

    it('should generate random data when title and text not provided', async() => {
      const task = {
        selector: 'mock-selector',
      };

      const result = await taskScreen.editTask(task);

      await expect(utils._.getRandomText).toHaveBeenCalled();
      await expect(mockElements[0].setValue).toHaveBeenCalledWith(
        'Random Title',
      );
      await expect(mockElements[1].setValue).toHaveBeenCalledWith(
        'Random Description',
      );
      await expect(result).toBe('mock-text-selector-Random Title');
    });

    it('should throw error when selectTask fails', async() => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error('Task not found'),
      );

      const task = {
        title: 'Test Task',
        text: 'Test Description',
        selector: 'invalid-selector',
      };

      await await expect(taskScreen.editTask(task)).rejects.toThrow(
        '[editTask]: [selectTask]: Task not found',
      );
    });
  });

  describe('deleteTask()', () => {
    it('should delete task by selector', async() => {
      const titleSelector = 'mock-task-selector';

      await taskScreen.deleteTask(titleSelector);

      await expect(utils.clickElement).toHaveBeenCalledWith(titleSelector);
      await expect(utils.expectElement).toHaveBeenCalledWith(
        taskScreenLocators.taskDetailsHeader,
      );
      await expect(utils.clickElement).toHaveBeenCalledWith(
        taskScreenLocators.deleteBtn,
      );
    });

    it('should throw error when task selection fails', async() => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error('Task not found'),
      );

      await await expect(
        taskScreen.deleteTask('invalid-selector'),
      ).rejects.toThrow('[deleteTask]: [selectTask]: Task not found');
    });

    it('should throw error when expectElement fails', async() => {
      (utils.expectElement as jest.Mock).mockRejectedValueOnce(
        new Error('Task details not displayed'),
      );

      await await expect(
        taskScreen.deleteTask('mock-selector'),
      ).rejects.toThrow(
        '[deleteTask]: [selectTask]: Task details not displayed',
      );
    });
  });

  describe('fillField()', () => {
    it('should fill only title field', async() => {
      await taskScreen.fillField({ title: 'New Title' });

      await expect(global.$$).toHaveBeenCalledWith(editTextWidget);
      await expect(mockElements[0].waitForDisplayed).toHaveBeenCalledWith({
        timeout: timeout.elementAppear,
      });
      await expect(mockElements[0].setValue).toHaveBeenCalledWith('New Title');
      await expect(mockElements[1].setValue).not.toHaveBeenCalled();
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[fillField] Title edited to "New Title" successfully.',
      );
    });

    it('should fill only text field', async() => {
      await taskScreen.fillField({ text: 'New Description' });

      await expect(global.$$).toHaveBeenCalledWith(editTextWidget);
      await expect(mockElements[1].waitForDisplayed).toHaveBeenCalledWith({
        timeout: timeout.elementAppear,
      });
      await expect(mockElements[1].setValue).toHaveBeenCalledWith(
        'New Description',
      );
      await expect(mockElements[0].setValue).not.toHaveBeenCalled();
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[fillField] Text edited to "New Description" successfully.',
      );
    });

    it('should fill both title and text fields', async() => {
      await taskScreen.fillField({
        title: 'Updated Title',
        text: 'Updated Description',
      });

      await expect(mockElements[0].setValue).toHaveBeenCalledWith(
        'Updated Title',
      );
      await expect(mockElements[1].setValue).toHaveBeenCalledWith(
        'Updated Description',
      );
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[fillField] Title edited to "Updated Title" successfully.',
      );
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[fillField] Text edited to "Updated Description" successfully.',
      );
    });

    it('should handle undefined title field', async() => {
      await taskScreen.fillField({ text: 'Only text' });

      await expect(mockElements[0].setValue).not.toHaveBeenCalled();
      await expect(mockElements[1].setValue).toHaveBeenCalledWith('Only text');
    });

    it('should handle undefined text field', async() => {
      await taskScreen.fillField({ title: 'Only title' });

      await expect(mockElements[0].setValue).toHaveBeenCalledWith('Only title');
      await expect(mockElements[1].setValue).not.toHaveBeenCalled();
    });
  });

  describe('selectTask()', () => {
    it('should select task and wait for details header', async() => {
      const selector = 'mock-task-selector';

      await taskScreen.selectTask(selector);

      await expect(utils.clickElement).toHaveBeenCalledWith(selector);
      await expect(utils.expectElement).toHaveBeenCalledWith(
        taskScreenLocators.taskDetailsHeader,
      );
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[selectTask] Task selected successfully. mock-task-selector',
      );
    });

    it('should throw error when task click fails', async() => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error('Element not clickable'),
      );

      await await expect(
        taskScreen.selectTask('invalid-selector'),
      ).rejects.toThrow('[selectTask]: Element not clickable');
    });

    it('should throw error when details header not displayed', async() => {
      (utils.expectElement as jest.Mock).mockRejectedValueOnce(
        new Error('Header not found'),
      );

      await await expect(
        taskScreen.selectTask('mock-selector'),
      ).rejects.toThrow('[selectTask]: Header not found');
    });
  });

  describe('backToMain()', () => {
    it('should navigate back to main screen', async() => {
      await taskScreen.backToMain();

      await expect(utils.clickElement).toHaveBeenCalledWith(
        taskScreenLocators.backBtn,
      );
      await expect(utils.logger.info).toHaveBeenCalledWith(
        '[backToMain] Navigated to main screen successfully.',
      );
    });

    it('should throw error when back button click fails', async() => {
      (utils.clickElement as jest.Mock).mockRejectedValueOnce(
        new Error('Back button not found'),
      );

      await await expect(taskScreen.backToMain()).rejects.toThrow(
        '[backToMain]: Back button not found',
      );
    });
  });
});
