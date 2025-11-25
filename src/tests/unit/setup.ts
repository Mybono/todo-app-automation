/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  mainScreenLocators,
  settingsScreenLocators,
  taskScreenLocators,
  push,
  headers,
  timeout,
} from '../../constants';

// --------------------
// Helper to create a single mock element
// --------------------
export function createMockElement(overrides?: Partial<any>): any {
  return {
    waitForDisplayed: jest.fn().mockResolvedValue(true),
    waitUntil: jest.fn().mockResolvedValue(true),
    click: jest.fn().mockResolvedValue(undefined),
    isDisplayed: jest.fn().mockResolvedValue(true),
    getAttribute: jest.fn().mockResolvedValue('false'),
    setValue: jest.fn().mockResolvedValue(undefined),
    getText: jest.fn().mockResolvedValue(''),
    ...overrides,
  };
}

// --------------------
// Helper to create multiple mock elements for $$
// --------------------
export function createMockElements(count: number = 2): any[] {
  const elements = Array.from({ length: count }, (_, i) =>
    createMockElement({
      getText: jest.fn().mockResolvedValue(`Element ${i}`),
    }),
  );

  return elements;
}

// --------------------
// Mock @wdio/globals
// --------------------
jest.mock('@wdio/globals', () => {
  const mockElement = {
    waitForDisplayed: jest.fn().mockResolvedValue(true),
    waitUntil: jest.fn().mockResolvedValue(true),
    click: jest.fn().mockResolvedValue(undefined),
    isDisplayed: jest.fn().mockResolvedValue(true),
    getAttribute: jest.fn().mockResolvedValue('false'),
    setValue: jest.fn().mockResolvedValue(undefined),
    getText: jest.fn().mockResolvedValue(''),
  };

  const mockElementsArray = [
    {
      waitForDisplayed: jest.fn().mockResolvedValue(true),
      setValue: jest.fn().mockResolvedValue(undefined),
      getText: jest.fn().mockResolvedValue('Element 0'),
    },
    {
      waitForDisplayed: jest.fn().mockResolvedValue(true),
      setValue: jest.fn().mockResolvedValue(undefined),
      getText: jest.fn().mockResolvedValue('Element 1'),
    },
  ];

  const mock$$ = jest.fn().mockReturnValue(mockElementsArray);

  const mockBrowser = {
    $: jest.fn().mockReturnValue(mockElement),
    $$: mock$$,
    waitUntil: jest.fn().mockImplementation(async (condition: any) => {
      return await condition();
    }),
  };

  const mockDriver = {
    $: jest.fn().mockReturnValue(mockElement),
    $$: mock$$,
    pause: jest.fn(),
    waitUntil: jest.fn().mockImplementation(async (condition: any) => {
      return await condition();
    }),
    getPageSource: jest.fn().mockResolvedValue('<mock>Page Source</mock>'),
  };

  return {
    $: jest.fn().mockReturnValue(mockElement),
    $$: mock$$,
    browser: mockBrowser,
    driver: mockDriver,
  };
});

// --------------------
// Global WebDriverIO mocks
// --------------------
const { browser, driver, $, $$ } = require('@wdio/globals');

global.driver = driver;
global.browser = browser;
global.$ = $;
global.$$ = $$;

// --------------------
// Custom mock functions
// --------------------
export const mockFillTask = jest.fn().mockResolvedValue(undefined);
export const mockSelectTask = jest.fn().mockResolvedValue(undefined);

// --------------------
// Mock constants
// --------------------
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

// --------------------
// Mock utils
// --------------------
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

// --------------------
// Mock screensInit
// --------------------
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

// --------------------
// Export constants
// --------------------
export { mainScreenLocators, settingsScreenLocators, taskScreenLocators, push, headers, timeout };

// --------------------
// Reset all mocks
// --------------------
export function resetAllMocks(): void {
  jest.clearAllMocks();

  const utils = require('../../utils');
  (utils.clickElement as jest.Mock).mockResolvedValue(undefined);
  (utils.expectElement as jest.Mock).mockResolvedValue(undefined);

  const mockElement = createMockElement();
  (global.driver.$ as jest.Mock).mockReturnValue(mockElement);
  (global.$ as jest.Mock).mockReturnValue(mockElement);
  (global.browser.$ as jest.Mock).mockReturnValue(mockElement);

  const mockElements = createMockElements();
  (global.driver.$$ as jest.Mock).mockReturnValue(mockElements);
  (global.$$ as jest.Mock).mockReturnValue(mockElements);
  (global.browser.$$ as jest.Mock).mockReturnValue(mockElements);

  (global.browser.waitUntil as jest.Mock).mockImplementation(async (condition: any) => {
    return await condition();
  });

  mockFillTask.mockClear().mockResolvedValue(undefined);
  mockSelectTask.mockClear().mockResolvedValue(undefined);

  const constants = require('../../constants');
  constants.getTextSelector.mockClear();
  constants.getCheckBoxSelector.mockClear();
  constants.fetchSource.mockClear();
}
