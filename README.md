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


## 📋 Table of Contents
- [Overview](#overview)
- [Technology Stack](./docs/stack.md)
- [Project Structure](./docs/structure.md)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Test Documentation](./docs/TestPlan.md)
- [Test Reports](#test-reports)
- [API Documentation](#)
- [Troubleshooting](./docs/troubleshooting.md)
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

## [Technology Stack](./docs/stack.md)

## [Project Structure](./docs/structure.md)

## [Prerequisites](./docs/prerequisites.md)

## [Installation](./docs/Installation.md)

## CI/CD Pipeline

### GitHub Actions Workflow
The project includes automated PR quality checks in `.github/workflows/pr-quality-check.yml`:

```yaml
name: 🔍 PR Checks

on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]
```

### Pipeline Stages

![Pipeline Example](./assets/pipelineExample.png)

#### 1. **Unit Tests** 🧪

- Runs unit tests using **Jest** with coverage.
- Jest unit tests cover the **core logic** of the main application classes:
  - **MainScreen** – task creation, selection, and completion logic.
  - **SettingsScreen** – applying filters, navigating menus, opening statistics.
  - **TaskScreen** – task editing, saving, and deletion workflows.

![Unit Example](./assets/unitTestEx.png)

#### 2. **Lint TypeScript** 🧹

- Runs ESLint on all `.ts` files
- Checks code quality and standards
- Non-blocking (warnings only)

```bash
npm run lint
```

#### 3. **Dependency Check** 📦

- Detects changes in `package.json` or `package-lock.json`
- Alerts reviewers about:
  - Security vulnerabilities
  - License compliance
  - Bundle size impact

#### 4. **Auto-format with Prettier** 🎨

- Automatically formats code
- Commits changes back to PR
- Excludes `.github/` workflows
- Only commits if changes detected

**Auto-commit behavior:**

```bash
git commit -m "style: auto-format code with Prettier"
git push origin HEAD:<branch-name>
```

### How It Works

1. **Developer creates PR** → Pipeline triggers
2. **Linting runs** → Shows code quality issues
3. **Dependency check** → Alerts on package changes
4. **Prettier runs** → Automatically formats & commits
5. **Tests run locally** → Manual verification before merge

## [Test Documentation](./docs/TestPlan.md)

**📄 Complete test documentation is available at: [docs/TestPlan.md](./docs/TestPlan.md)**

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
[Full Console Logs](./docs/test-logs.md)

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
  status: taskStatuses.active
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
  text: "New description"
});

// Delete task
await screens.task.deleteTask(taskSelector);
```
## [Troubleshooting](./docs/troubleshooting.md)

## TODO

- Develop test scenarios and implement tests to verify the app's behavior under unexpected device events:
  - Network loss (Wi-Fi / mobile data)
  - Screen rotation (portrait ↔ landscape)
  - Device lock and unlock
  - Background app interruptions
  - Sudden screen off
  - Battery drain / low battery simulation
- Develop & Implement Slack notification servise

## [NOTES](./docs/notes.md)

### Best Practices Implemented

- ✅ Page Object Model for maintainability
- ✅ Factory pattern for screen initialization
- ✅ Custom logger with log levels
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

_Last Updated: November 2025_
