# 📱 Todo App - Mobile Test Automation

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)](https://github.com/yourusername/todo-app-automation/actions)
[![Test Framework](https://img.shields.io/badge/Framework-WebDriverIO-orange)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-v3.1.1-purple)](https://appium.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Testing-Jest-brightgreen)](https://jestjs.io/)
[![Mocha](https://img.shields.io/badge/Testing-Mocha-red)](https://mochajs.org/)
[![Chai](https://img.shields.io/badge/Assertion-Chai-yellow)](https://www.chaijs.com/)
[![WebDriverIO](https://img.shields.io/badge/E2E-WebDriverIO-blueviolet)](https://webdriver.io/)
[![Docker Image](https://img.shields.io/badge/Docker-Latest%20Image-2496ED?logo=docker&logoColor=white)](https://hub.docker.com/r/mybono/todo-app-automation)
[![Hits](https://hits.sh/github.com/Mybono/todo-app-automation.svg?label=views)](https://hits.sh/github.com/Mybono/todo-app-automation/)

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Technology Stack](./docs/STACK.md)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Test Documentation](./docs/TEST_PLAN.md)
- [Project Structure](./docs/STRUCTURE.md)
- [Test Reports](#test-reports)
- [API Documentation](#api-documentation)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [Contributing](./CONTRIBUTING.md)
- [TODO](#todo)
- [Notes](#notes)

## Overview

This project implements automated tests for a Todo mobile application covering:

- ✅ Task creation and management (add, edit, delete)
- ✅ Task editing with validation
- ✅ Task deletion with confirmation
- ✅ Task completion/activation (checkbox functionality)
- ✅ Task filtering (All, Active, Completed)
- ✅ Navigation between screens (Tasks, Settings, Statistics)
- ✅ UI validation and push notifications

## [Prerequisites](./docs/PREREQUISITES.md)

## [Installation](./docs/INSTALL.md)

## [Technology Stack](./docs/STACK.md)

## [Project Structure](./docs/STRUCTURE.md)

## Running Tests

### All Tests

```bash
npm test
```

### Specific Suite

```bash
# Build first (if not built)
npm run build

# Then run specific test
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/main.test.js       # Task Management
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/checkbox.test.js   # Checkbox Actions
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/filter.test.js     # Filters
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/navigate.test.js   # Navigation
```

## CI/CD Pipeline

![Pipeline Example](./assets/pipelineExample.png)

GitHub Actions automatically runs on every Pull Request:

1. **✅ Unit Tests** - Runs unit tests with Jest
2. **🧹 Lint** - ESLint checks code quality
3. **📦 Dependencies** - Checks for security issues
4. **🎨 Auto Format** - Auto-formats with Prettier
5. **🔤 Spellcheck** - Checks spelling in documentation and code comments

View pipeline: [`.github/workflows/pr-quality-check.yml`](.github/workflows/pr-quality-check.yml)

## [Test Documentation](./docs/TEST_PLAN.md)

**📄 Complete test documentation is available at: [docs/TEST_PLAN.md](./docs/TEST_PLAN.md)**

The test plan includes:

- **User Needs & Risk Analysis** - 7 user needs and 4 identified risks
- **Requirements Mapping** - 10 functional requirements with priorities
- **Detailed Test Cases** - 17 test cases across 4 test suites:
  - **Task Management** (4 tests): UITM-TA001 - UITM-TA004
  - **Checkbox Actions** (4 tests): UITM-CA001 - UITM-CA004
  - **Filters** (6 tests): UITM-FE001 - UITM-FE003, UITM-FH001 - UITM-FH003
  - **Navigation** (4 tests): UITM-NA001 - UITM-NA004
- **Priority & Severity Definitions** - P1-P4 and S1-S4 classifications
- **Traceability Matrix** - Complete mapping from inputs to test cases

## Test Reports

### Console Output

Tests output to console with colored logs:
[Full Console Logs](./docs/test.logs.md)

### Allure Reports

```bash
npm run report
```

![Allure Report Example](./assets/allureReportExample1.png)
![Allure Report Example](./assets/allureReportExample2.png)

## API Documentation

#### Main Screen

```typescript
// Add task
const taskSelector = await screens.main.addTask({
  title: "Buy milk",
  text: "From store",
  status: taskStatuses.active,
});

// Apply filter
await screens.main.applyFilter(filter.completed);

// Mark task complete
await screens.main.markTaskComplete(true, taskSelector);
```

#### Task Screen

```typescript
// Edit task
await screens.task.editTask({
  selector: taskSelector,
  title: "New title",
  text: "New description",
});

// Delete task
await screens.task.deleteTask(taskSelector);
```

## [Troubleshooting](./docs/TROUBLESHOOTING.md)

## TODO

- Develop test scenarios and implement tests to verify the app's behavior under unexpected device events:
  - Network loss (Wi-Fi / mobile data)
  - Screen rotation (portrait ↔ landscape)
  - Device lock and unlock
  - Background app interruptions
  - Low battery simulation
  - Sudden screen off
- Develop Slack notification service
- Add iOS support
- Implement parallel test execution

## [NOTES](./docs/NOTES.md)

### Best Practices Implemented

- ✅ Page Object Model for maintainability
- ✅ Factory pattern for screen initialization
- ✅ Custom logger with log levels
- ✅ Unit tests
- ✅ Timeout constants for consistency
- ✅ Random test data generation
- ✅ Error handling with descriptive messages
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Prettier for consistent formatting

## Resources

- [WebDriverIO Documentation](https://webdriver.io/)
- [Appium Documentation](https://appium.io/docs/en/latest/)
- [UiAutomator2 Driver](https://github.com/appium/appium-uiautomator2-driver)
- [Android Debug Bridge (ADB)](https://developer.android.com/tools/adb)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Mocha Test Framework](https://mochajs.org/)

---

_Last updated: November 2025_
