# 📱 Todo App - Mobile Test Automation

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)](https://github.com/yourusername/todo-app-automation/actions)
[![Test Framework](https://img.shields.io/badge/Framework-WebDriverIO-orange)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-v3.1.1-purple)](https://appium.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

Automated testing framework for Todo mobile application using Appium and WebDriverIO with TypeScript.

## 📋 Table of Contents

- [Overview](#-overview)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Test Documentation](#-test-documentation)
- [Test Reports](#-test-reports)
- [Troubleshooting](#-troubleshooting)

## 🎯 Overview

This project implements automated tests for a Todo mobile application covering:

- ✅ Task creation and management (add, edit, delete)
- ✏️ Task editing with validation
- 🗑️ Task deletion with confirmation
- ☑️ Task completion/activation (checkbox functionality)
- 🔍 Task filtering (All, Active, Completed)
- 🧭 Navigation between screens (Tasks, Settings, Statistics)
- 📊 UI validation and push notifications

## 🛠 Technology Stack

| Technology       | Version | Purpose                        |
| ---------------- | ------- | ------------------------------ |
| **Node.js**      | 20.x    | Runtime environment            |
| **TypeScript**   | 5.9.3   | Type-safe programming language |
| **WebDriverIO**  | 8.40.0  | Test automation framework      |
| **Appium**       | 3.1.1   | Mobile automation server       |
| **UiAutomator2** | 6.1.1   | Android automation driver      |
| **Mocha**        | -       | Test framework                 |
| **Chai**         | 4.3.8   | Assertion library              |
| **ESLint**       | 9.39.1  | Code linting                   |
| **Prettier**     | 3.0.0   | Code formatting                |

## 📁 Project Structure

```
todo-app-automation/
├── .github/
│   └── workflows/
│       └── pr-quality-check.yml    # CI/CD pipeline configuration
├── app/
│   └── apk/
│       └── app-debug.apk           # Android application (not in repo)
├── docs/
│   └── TestPlan.md                 # 📋 Complete test documentation
├── src/
│   ├── config/
│   │   ├── capabilities.ts         # Appium capabilities configuration
│   │   └── index.ts
│   ├── screens/                    # Page Object Models
│   │   ├── task.screen.ts          # Add/Edit task screen
│   │   ├── main.screen.ts          # Main screen with task list
│   │   ├── Settings.screen.ts      # Settings screen list
│   │   ├── statistic.screen.ts     # Statistic screen list
│   │   ├── screensInit.ts          # Screen factory pattern
│   │   └── index.ts
│   ├── tests/
│   │   ├── e2e/                    # Test Suites (Appium/WDIO)
│   │   │   ├── main.test.ts        # ✅ Task management (add, edit, delete)
│   │   │   ├── checkbox.test.ts.   # ☑️ Task completion/activation
│   │   │   ├── filter.test.ts      # 🔍 Task filtering
│   │   │   └── navigate.test.ts.   # 🧭 Screen navigation        
│   │   └── unit/                   # unit tests Jest
│   │       ├── main.test.ts
│   │       ├── settings.test.ts
│   │       └── task.test.ts
│   │ 
│   ├── constants/                             # Locators
│   │   ├── mainScreen.locators.screen.ts      # Main Screen
│   │   ├── settingsScreen.locators.screen.ts  # Settings Screen locators
│   │   ├── taskScreen.locataros.test.ts       # TaskScreen locators
│   │   ├── common.test.ts                     # generic locators
│   │   └── index.ts
│   └── utils/
│       ├── logger.ts               # Custom logger with colors
│       ├── services.ts             # Services
│       ├── testDataGenerator.ts    # Random test data generation
│       └── index.ts
├── dist/                           # Compiled TypeScript output
├── wdio.conf.ts                    # WebDriverIO configuration
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.mjs               # ESLint configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## 📋 Prerequisites

### Required Software

1. **Java Development Kit (JDK)**
   - Version: 11 or higher
   - Required for Android SDK

   ```bash
   java -version
   ```

2. **Android SDK & Platform Tools**
   - Android SDK Platform 34 (Android 14)
   - Android SDK Build-Tools
   - Android Emulator

   Set environment variables:

   ```bash
   export ANDROID_HOME=/path/to/android-sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

3. **Node.js & npm**
   - Version: 20.x or higher

   ```bash
   node -v
   npm -v
   ```

4. **Android Emulator**
   - Device: Any Android device/emulator
   - Platform: Android 16 (API 34) or higher
   - Resolution: 1080x2400 recommended

### Environment Setup

1. **Verify Android Debug Bridge (ADB)**

   ```bash
   adb version
   adb devices
   ```

2. **Check Appium Installation**

   ```bash
   npm install -g appium-doctor
   appium-doctor --android
   ```

   Ensure all checks pass ✅

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/todo-app-automation.git
cd todo-app-automation
```

### 2. Install Dependencies

```bash
npm install
```

This installs:

- WebDriverIO and Appium drivers
- TypeScript compiler
- Testing frameworks (Mocha, Chai)
- Linting tools (ESLint, Prettier)

### 3. Install Appium Globally (Optional)

```bash
npm install -g appium
appium driver install uiautomator2
```

### 4. Prepare APK

Place your application APK in:

```
app/apk/app-debug.apk
```

### 5. Start Android Emulator

```bash
# List available emulators
emulator -list-avds

# Start emulator
appium
OR
emulator -avd <emulator_name> -no-snapshot-load
```

Or start via Android Studio AVD Manager.

### 6. Verify Device Connection

```bash
adb devices
# Output should show: emulator-5554    device
```

## 🧪 Running Tests

### Build & Run All Tests

```bash
npm test
```

This command:

1. Compiles TypeScript (`npm run build`)
2. Starts Appium server automatically
3. Executes all tests in `src/tests/`

### Run Specific Test Suite

```bash
# Task Management Tests
npm run build
npx wdio run wdio.conf.ts --spec ./dist/tests/main.test.js

# Checkbox Functionality Tests
npx wdio run wdio.conf.ts --spec ./dist/tests/checkbox.test.js

# Filter Tests
npx wdio run wdio.conf.ts --spec ./dist/tests/filter.test.js

# Navigation Tests
npx wdio run wdio.conf.ts --spec ./dist/tests/navigate.test.js
```

### Generate Report

```bash
npm report
```

### Development Commands

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Clean build artifacts
npm run clean

# Build TypeScript
npm run build
```

### Manual Appium Server (Optional)

If you want to control Appium server manually:

```bash
# Terminal 1: Start Appium
appium --log-level debug:debug --relaxed-security

# Terminal 2: Run tests
npx wdio run wdio.conf.ts
```

## 🔄 CI/CD Pipeline

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

#### 1. **Lint TypeScript** 🧹

- Runs ESLint on all `.ts` files
- Checks code quality and standards
- Non-blocking (warnings only)

```bash
npm run lint
```

#### 2. **Dependency Check** 📦

- Detects changes in `package.json` or `package-lock.json`
- Alerts reviewers about:
  - Security vulnerabilities
  - License compliance
  - Bundle size impact

#### 3. **Auto-format with Prettier** 🎨

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

### Running Pipeline Checks Locally

Before pushing:

```bash
# Run all checks
npm run lint && npm run format

# Verify build
npm run build
npm test
```

## 📊 Test Documentation

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

### Test Coverage Overview

| Test Suite           | Test Cases | Status             | Automation |
| -------------------- | ---------- | ------------------ | ---------- |
| **Task Management**  | 4          | ✅ All Implemented | 100%       |
| **Checkbox Actions** | 4          | ✅ All Implemented | 100%       |
| **Filters**          | 6          | ✅ All Implemented | 100%       |
| **Navigation**       | 4          | ✅ All Implemented | 100%       |
| **Total**            | **18**     | **18 Automated**   | **100%**   |

### Test Case Summary by Priority

| Priority          | Count | Automated | Description                                                    |
| ----------------- | ----- | --------- | -------------------------------------------------------------- |
| **Critical (P1)** | 2     | 2 ✅      | Core functionality: task creation, completion from main screen |
| **High (P2)**     | 8     | 8 ✅      | Important features: edit, delete, checkbox actions             |
| **Medium (P3)**   | 6     | 6 ✅      | Filtering, navigation with tasks                               |
| **Low (P4)**      | 2     | 2 ✅      | Empty states, statistics navigation                            |

## 📈 Test Reports

### Console Output

Tests output to console with colored logs:


```
Todo App - Task Management
  ✅ should add a task (3.2s)
  ✅ should edit a task (2.8s)
  ✅ should delete a task (2.5s)

Todo App - Checkbox Actions
  ✅ should mark task complete from task details (2.9s)
  ✅ should mark task active from task details (2.7s)
  ✅ should mark task complete from main screen (2.4s)
  ✅ should mark task active from main screen (2.6s)

Todo App - Filters
  ✅ should show empty state for active filter (2.1s)
  ✅ should show empty state for completed filter (2.0s)
  ✅ should show empty state for all filter (1.9s)
  ✅ should filter active tasks correctly (3.1s)
  ✅ should filter completed tasks correctly (3.0s)
  ✅ should show all tasks in all filter (2.8s)

Todo App - Navigation
  ✅ should navigate from tasks to settings (1.8s)
  ✅ should navigate from settings to statistics (1.7s)
  ✅ should navigate from statistics to settings (1.6s)
  ✅ should navigate from settings back to tasks (1.5s)

18 passing (45.6s)
```
## 📈 Allure Reports
![Allure Report Example](./assets/allureReportExample1.png)
![Allure Report Example](./assets/allureReportExample2.png)


## 🐛 Troubleshooting

### Common Issues

#### 1. **Appium Server Won't Start**

```bash
# Kill existing Appium processes
pkill -9 node

# Clean Appium packages
adb shell pm clear io.appium.uiautomator2.server
adb uninstall io.appium.uiautomator2.server
adb uninstall io.appium.uiautomator2.server.test
adb uninstall io.appium.settings
```

#### 2. **Emulator Not Detected**

```bash
# Restart ADB
adb kill-server
adb start-server
adb devices
```

#### 3. **Session Creation Failed**

```bash
# Clear logs and retry
adb logcat -c

# Increase timeouts in capabilities.ts:
"appium:newCommandTimeout": 300
"appium:uiautomator2ServerLaunchTimeout": 90000
```

#### 4. **Element Not Found**

Enable debug mode to see page source:

```typescript
const source = await driver.getPageSource();
console.log(source);
```

Or use the debug test file:

```bash
npm run build
npx wdio run wdio.conf.ts --spec ./dist/tests/debug.test.js
```

#### 5. **TypeScript Compilation Errors**

```bash
npm run clean
npm run build
```

### Debug Commands

```bash
# View Appium logs with verbosity
appium --log-level debug:debug

# View device logs filtered
adb logcat | grep -iE "appium|uiautomator"

# Clear device logs
adb logcat -c

# Take screenshot from device
adb shell screencap /sdcard/screen.png
adb pull /sdcard/screen.png

# Check installed packages
adb shell pm list packages | grep appium
```

### Appium Doctor

Run diagnostics to verify setup:

```bash
appium-doctor --android
```

Ensure all required checks pass:

- ✅ ANDROID_HOME is set
- ✅ JAVA_HOME is set
- ✅ adb exists
- ✅ android exists
- ✅ emulator exists

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/new-tests`
2. Make changes and ensure tests pass: `npm test`
3. Run linting: `npm run lint:fix`
4. Format code: `npm run format`
5. Commit: `git commit -m "feat: add new test cases"`
6. Push: `git push origin feature/new-tests`
7. Create Pull Request

The CI pipeline will automatically:

- Lint your code
- Check dependencies
- Auto-format with Prettier

## 📝 Notes

### Test Data Generation

The framework generates random test data for flexible testing:

```typescript
import { _ } from "./utils";

const { title, text } = _.getRandomText();
// title: 4-10 alphanumeric characters
// text: 8-20 characters with spaces
```

### Emulator Configuration

Current configuration in `capabilities.ts`:

- **Device**: emulator-5554
- **Platform**: Android 16.0 (API 34)
- **Automation**: UiAutomator2
- **Auto-grant permissions**: Enabled
- **Window animation**: Disabled (for faster test execution)
- **Command timeout**: 300 seconds

### Page Object Model Pattern

All screen interactions are abstracted through Page Objects:

```typescript
// Using screen factory
import { screens } from "./screens";

// Add task
const taskSelector = await screens.main.addTask("Title", "Description");

// Edit task
await screens.addEdit.editTask({ titleSelector, title: "New Title" });

// Delete task
await screens.addEdit.deleteTask(taskSelector);
```

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

## 📚 Resources

- [WebDriverIO Documentation](https://webdriver.io/)
- [Appium Documentation](https://appium.io/docs/en/latest/)
- [UiAutomator2 Driver](https://github.com/appium/appium-uiautomator2-driver)
- [Android Debug Bridge (ADB)](https://developer.android.com/tools/adb)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Mocha Test Framework](https://mochajs.org/)

## 📧 Support

For questions, issues, or contributions:

- Open an issue on GitHub
- Check the [Test Documentation](./docs/TestPlan.md)
- Review the [Troubleshooting](#-troubleshooting) section

---

_Last Updated: November 2025_
