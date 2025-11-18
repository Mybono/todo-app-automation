# 📱 Todo App - Mobile Test Automation

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)](https://github.com/Mybono/todo-app-automation/actions)
[![Test Framework](https://img.shields.io/badge/Framework-WebDriverIO-orange)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-v3.1.1-purple)](https://appium.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Contributor%20Covenant-blue)](CODE_OF_CONDUCT.md)

Automated testing framework for Todo mobile application using Appium and WebDriverIO with TypeScript.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Quick Start](#-quick-start)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Running Tests](#-running-tests)
- [Test Reports](#-test-reports)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## Overview

This project implements comprehensive automated tests for a Todo mobile application, covering:

- ✅ **Task Management** - Create, edit, delete tasks
- ☑️ **Checkbox Actions** - Mark tasks complete/active
- 🔍 **Filtering** - Filter by All, Active, Completed
- 🧭 **Navigation** - Screen transitions and UI validation
- 📊 **Push Notifications** - Verify user feedback

**Test Coverage:** 18 automated test cases | **Code Coverage:** 70%+ target

📖 **[View Complete Test Plan](./docs/TestPlan.md)**

---

## Quick Start

### [Prerequisites](./docs/prerequisites.md)

### [Installation](./docs/Installation.md)

### Run Tests

```bash
# Build and run all tests
npm test

# Run unit tests
npm run test:unit

# Generate Allure report
npm run report
```

That's it! 🎉

---

## [Technology Stack](./docs/stack.md)

## [Project Structure](./docs/structure.md)


**Key Design Patterns:**
- ✅ Page Object Model (POM)
- ✅ Factory Pattern for screens
- ✅ Custom logger with levels
- ✅ Random test data generation

---

## Running Tests

### All Test Suites

```bash
npm test
```

### Specific Test Suite

```bash
# Task Management
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/main.test.js

# Checkbox Actions
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/checkbox.test.js

# Filters
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/filter.test.js

# Navigation
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/navigate.test.js
```

### Unit Tests
```bash
# Run unit tests with coverage
npm run test:unit

# Watch mode
npm run test:unit -- --watch
```

### Development Commands

```bash
npm run lint        # Check code quality
npm run lint:fix    # Auto-fix issues
npm run format      # Format with Prettier
npm run build       # Compile TypeScript
npm run clean       # Remove build artifacts
```

---

## Test Reports

### Allure Reports

Generate interactive HTML reports:

```bash
npm run report
```

![Allure Report](./assets/allureReportExample1.png)

### Console Output

```
Todo App - Task Management
  ✅ should add a task (3.2s)
  ✅ should edit a task (2.8s)
  ✅ should delete a task (2.5s)

Todo App - Checkbox Actions
  ✅ should mark task complete (2.9s)
  ✅ should mark task active (2.7s)

18 passing (45.6s)
```


---

## Documentation

| Document | Description |
|----------|-------------|
| **[Test Plan](./docs/TestPlan.md)** | Complete test cases, requirements, traceability matrix |
| **[Contributing Guide](CONTRIBUTING.md)** | How to contribute, development setup, coding standards |
| **[Code of Conduct](CODE_OF_CONDUCT.md)** | Community guidelines and enforcement |
| **[Security Policy](SECURITY.md)** | Reporting vulnerabilities, security best practices |
| **[License](LICENSE)** | MIT License details |

### API Documentation

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

---

## Contributing
We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## Security
Found a security vulnerability? Please review our [Security Policy](SECURITY.md) and report it responsibly.
**DO NOT** open public issues for security vulnerabilities.

---

## [Troubleshooting](./docs/troubleshooting.md)
## CI/CD Pipeline

Our GitHub Actions workflow automatically:
- Lints TypeScript code
- Checks dependencies for security issues
- Auto-formats code with Prettier
- Runs all unit tests on Pull Requests

See [`.github/workflows/pr-quality-check.yml`](.github/workflows/pr-quality-check.yml) for details.

## 🌟 Features

- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Page Object Model** - Maintainable test structure
- ✅ **Parallel Execution** - Fast test runs (future)
- ✅ **Visual Reports** - Allure integration
- ✅ **CI/CD Ready** - GitHub Actions workflows
- ✅ **Cross-Platform** - Supports Android (iOS future)
- ✅ **Random Test Data** - Built-in data generator
- ✅ **Custom Logger** - Colored console output

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [WebDriverIO](https://webdriver.io/) - Amazing test automation framework
- [Appium](https://appium.io/) - Cross-platform mobile automation
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

---

## 📧 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/Mybono/todo-app-automation/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Mybono/todo-app-automation/discussions)
- **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Security:** See [SECURITY.md](SECURITY.md)

---

<div align="center">

**Made with ❤️ by the testing community**

[![Star this repo](https://img.shields.io/github/stars/Mybono/todo-app-automation?style=social)](https://github.com/Mybono/todo-app-automation)
[![Fork this repo](https://img.shields.io/github/forks/Mybono/todo-app-automation?style=social)](https://github.com/Mybono/todo-app-automation/fork)

</div>
