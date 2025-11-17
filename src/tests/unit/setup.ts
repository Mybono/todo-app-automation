// src/tests/unit/setup.ts
// Shared mocks configuration for all unit tests

// Mock WebDriverIO driver globally
global.driver = {
  $: jest.fn(),
  $$: jest.fn(),
  pause: jest.fn(),
} as any;

// Mock global $ and $$ functions
global.$ = jest.fn() as any;
global.$$ = jest.fn() as any;


// Mock all utils
jest.mock("../../utils", () => ({
  _: {
    getRandomText: jest.fn(() => ({
      title: "Random Title",
      text: "Random Description",
    })),
  },
  clickElement: jest.fn().mockResolvedValue(undefined),
  editTextWidget: "//android.widget.EditText",
  expectElement: jest.fn().mockResolvedValue(undefined),
  getCheckBoxSelector: jest.fn((isCompleted: boolean) =>
    isCompleted ? "mock-checkbox-true" : "mock-checkbox-false",
  ),
  getTextSelector: jest.fn((text: string) => `mock-text-selector-${text}`),
  logger: {
    info: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
  timeout: {
    elementAppear: 5000,
    elementClick: 3000,
    navigation: 10000,
  },
  push: {
    taskAdded: '//android.widget.TextView[@text="Task added"]',
    taskSaved: '//android.widget.TextView[@text="Task saved"]',
    taskDeleted: '//android.widget.TextView[@text="Task was deleted"]',
    taskMarkedComplete:
      '//android.widget.TextView[@text="Task marked complete"]',
    taskMarkedActive: '//android.widget.TextView[@text="Task marked active"]',
  },
}));

// Mock screens module - use static values instead of references
jest.mock("../../screens", () => ({
  screens: {
    main: {
      todoTitle: '//android.widget.TextView[@text="Todo"]',
      allTaskTitle: '//android.widget.TextView[@text="All Tasks"]',
      toggleCheckbox: jest.fn().mockResolvedValue({
        waitForDisplayed: jest.fn().mockResolvedValue(undefined),
      }),
    },
    task: {
            fillTask: jest.fn(),
      selectTask: jest.fn(),
      // fillTask: jest.fn().mockResolvedValue(undefined),
      // selectTask: jest.fn().mockResolvedValue(undefined),
    },
    statistics: {
      statisticHeader: '//android.widget.TextView[@text="Statistics"]',
    },
  },
}));

// Mock screensInit separately for MainScreen tests
jest.mock("../../screens/screensInit", () => ({
  screens: {
    task: {
      fillTask: jest.fn().mockResolvedValue(undefined),
      selectTask: jest.fn().mockResolvedValue(undefined),
    },
  },
}));

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
}
