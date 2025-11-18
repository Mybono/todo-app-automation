import {
  mainScreenLocators,
  settingsScreenLocators,
  taskScreenLocators,
  push,
  headers,
  timeout,
} from '../../constants';

// Mock WebDriverIO driver globally
global.driver = {
  $: jest.fn(),
  $$: jest.fn(),
  pause: jest.fn(),
  waitUntil: jest.fn().mockResolvedValue(true),
  getPageSource: jest.fn().mockResolvedValue('<mock>Page Source</mock>'),
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
jest.mock('../../constants', () => {
  const actualConstants = jest.requireActual('../../constants');

  return {
    ...actualConstants,
    getTextSelector: jest.fn((text: string) => `mock-text-selector-${text}`),
    getCheckBoxSelector: jest.fn((isCompleted: boolean) =>
      isCompleted ? 'mock-checkbox-true' : 'mock-checkbox-false',
    ),
    fetchSource: jest.fn(),
  };
});

// Mock utils module
jest.mock('../../utils', () => ({
  _: {
    getRandomText: jest.fn(() => ({
      title: 'Random Title',
      text: 'Random Description',
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

// Mock screensInit module
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

export {
  mainScreenLocators,
  settingsScreenLocators,
  taskScreenLocators,
  push,
  headers,
  timeout,
};

/**
 * Creates a mock element with common WebDriverIO methods
 */
export function createMockElement(overrides?: Partial<any>): any {
  return {
    waitForDisplayed: jest.fn().mockResolvedValue(true),
    click: jest.fn().mockResolvedValue(undefined),
    isDisplayed: jest.fn().mockResolvedValue(true),
    getAttribute: jest.fn().mockResolvedValue('false'),
    setValue: jest.fn().mockResolvedValue(undefined),
    getText: jest.fn().mockResolvedValue(''),
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

  const utils = require('../../utils');
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

  // Reset mocked functions from constants
  const constants = require('../../constants');
  constants.getTextSelector.mockClear();
  constants.getCheckBoxSelector.mockClear();
  constants.fetchSource.mockClear();
}

// Initialize with default mocks
const mockElement = createMockElement();
(global.driver.$ as jest.Mock).mockReturnValue(mockElement);
(global.$ as jest.Mock).mockReturnValue(mockElement);

const mockElements = createMockElements();
(global.$$ as jest.Mock).mockResolvedValue(mockElements);
