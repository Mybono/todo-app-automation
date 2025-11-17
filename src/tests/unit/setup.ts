// Mock WebDriverIO driver globally
global.driver = {
  $: jest.fn(),
  $$: jest.fn(),
  pause: jest.fn(),
  waitUntil: jest.fn().mockResolvedValue(true),
  getPageSource: jest.fn().mockResolvedValue("<mock>Page Source</mock>"),
} as any;

// Mock browser object
global.browser = {
  $: jest.fn(),
  $$: jest.fn(),
  waitUntil: jest.fn().mockResolvedValue(true),
} as any;

// Mock global $ and $$ functions
global.$ = jest.fn() as any;
global.$$ = jest.fn() as any;

// Create mock functions that we'll export
export const mockFillTask = jest.fn().mockResolvedValue(undefined);
export const mockSelectTask = jest.fn().mockResolvedValue(undefined);

// Mock constants module
jest.mock("../../constants", () => ({
  mainScreenLocators: {
    addTaskBtn: '//android.view.View[@content-desc="New Task"]/..',
    allTaskTitle: '//android.widget.TextView[@text="All Tasks"]',
    checkBoxUnchecked: "//android.widget.CheckBox",
    filterActive: '//android.widget.TextView[@text="Active"]',
    filterAll: '//android.widget.TextView[@text="All"]',
    filterBtn: "~Filter",
    filterCompleted: '//android.widget.TextView[@text="Completed"]',
    moreOptionsMenu: "~More",
    taskDetailsHeader: '//android.widget.TextView[@text="Task Details"]',
    taskTextInput: '//android.widget.TextView[@text="Enter your task here."]',
    taskTitleInput: '//android.widget.TextView[@text="Title"]',
    todoTitle: '//android.widget.TextView[@text="Todo"]',
  },
  settingsScreenLocators: {
    burgerMenuBtn: "~Open Drawer",
    statisticsBtn: '//android.widget.TextView[@text="Statistics"]',
    taskListBtn: '//android.widget.TextView[@text="Task List"]',
    todoHeader: '//android.widget.TextView[@text="Todo"]',
  },
  taskScreenLocators: {
    backBtn: "~Back",
    deleteBtn: "~Delete task",
    editBtn: "~Edit Task",
    newTaskHeader: '//android.widget.TextView[@text="New Task"]',
    saveTaskBtn: "~Save task",
    taskDetailsHeader: '//android.widget.TextView[@text="Task Details"]',
    taskTextInput:
      '//android.widget.EditText[.//android.widget.TextView[@text="Enter your task here."]]',
    taskTitleInput:
      '//android.widget.EditText[.//android.widget.TextView[@text="Title"]]',
  },
  getTextSelector: jest.fn((text: string) => `mock-text-selector-${text}`),
  getCheckBoxSelector: jest.fn((isCompleted: boolean) =>
    isCompleted ? "mock-checkbox-true" : "mock-checkbox-false"
  ),
  fetchSource: jest.fn(),
  push: {
    taskMarkedActive: '//android.widget.TextView[@text="Task marked active"]',
    taskSaved: '//android.widget.TextView[@text="Task saved"]',
    taskAdded: '//android.widget.TextView[@text="Task added"]',
    taskMarkedComplete:
      '//android.widget.TextView[@text="Task marked complete"]',
    taskDeleted: '//android.widget.TextView[@text="Task was deleted"]',
  },
  headers: {
    activeTasks: '//android.widget.TextView[@text="Active Tasks"]',
    completedTasks: '//android.widget.TextView[@text="Completed Tasks"]',
    allTasks: '//android.widget.TextView[@text="All Tasks"]',
    noActiveTasks: '//android.widget.TextView[@text="You have no active tasks!"]',
    noCompletedTasks:
      '//android.widget.TextView[@text="You have no completed tasks!"]',
    noAllTasks: '//android.widget.TextView[@text="You have no tasks!"]',
  },
  editTextWidget: "android.widget.EditText",
  timeout: {
    elementAppear: 5000,
    elementClick: 3000,
    navigation: 10000,
  },
}));

// Mock utils module
jest.mock("../../utils", () => ({
  _: {
    getRandomText: jest.fn(() => ({
      title: "Random Title",
      text: "Random Description",
    })),
  },
  clickElement: jest.fn().mockResolvedValue(undefined),
  expectElement: jest.fn().mockResolvedValue(undefined),
  logger: {
    info: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock screensInit module - исправленная версия
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

/**
 * Creates a mock element with common WebDriverIO methods
 */
export function createMockElement(overrides?: Partial<any>): any {
  return {
    waitForDisplayed: jest.fn().mockResolvedValue(true),
    click: jest.fn().mockResolvedValue(undefined),
    isDisplayed: jest.fn().mockResolvedValue(true),
    getAttribute: jest.fn().mockResolvedValue("false"),
    setValue: jest.fn().mockResolvedValue(undefined),
    getText: jest.fn().mockResolvedValue(""),
    ...overrides,
  };
}

/**
 * Creates an array of mock elements for $$ calls
 */
export function createMockElements(count: number = 2): any[] {
  const elements: any[] = [];
  for (let i = 0; i < count; i++) {
    elements.push({
      waitForDisplayed: jest.fn().mockResolvedValue(true),
      setValue: jest.fn().mockResolvedValue(undefined),
      getText: jest.fn().mockResolvedValue(`Element ${i}`),
      click: jest.fn().mockResolvedValue(undefined),
    });
  }
  return elements;
}

/**
 * Resets all mocks to their default state
 */
export function resetAllMocks() {
  jest.clearAllMocks();

  const utils = require("../../utils");
  (utils.clickElement as jest.Mock).mockResolvedValue(undefined);
  (utils.expectElement as jest.Mock).mockResolvedValue(undefined);

  const mockElement = createMockElement();
  (global.driver.$ as jest.Mock).mockReturnValue(mockElement);
  (global.$ as jest.Mock).mockReturnValue(mockElement);

  const mockElements = createMockElements();
  (global.$$ as jest.Mock).mockResolvedValue(mockElements);
  (global.browser.waitUntil as jest.Mock).mockResolvedValue(true);
  
  // Reset our custom mocks
  mockFillTask.mockClear().mockResolvedValue(undefined);
  mockSelectTask.mockClear().mockResolvedValue(undefined);
}

// Initialize with default mocks
const mockElement = createMockElement();
(global.driver.$ as jest.Mock).mockReturnValue(mockElement);
(global.$ as jest.Mock).mockReturnValue(mockElement);

const mockElements = createMockElements();
(global.$$ as jest.Mock).mockResolvedValue(mockElements);