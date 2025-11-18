# Contributing to Todo App Automation

Thank you for your interest in contributing to our mobile test automation framework! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## 📜 Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### [Prerequisites](./docs/PREREQUISITES.md)

### [Installation](./docs/INSTALL.md)

### Reporting Bugs

Found a bug? Help us fix it!

1. **Check existing issues** to avoid duplicates
2. [Use the bug report template](./docs/bug_report.yml) when creating a new issue
3. **Include these details:**
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, Appium version)
   - Screenshots or logs (if applicable)

### Suggesting Features 💡

Have an idea for improvement?

1. **Check existing feature requests** first
2. **Open a new issue** with the `enhancement` label
3. **Describe:**
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions you've considered
   - How it benefits the project

### Improving Documentation 📚

Documentation improvements are always welcome!

- Fix typos or unclear explanations
- Add examples or use cases
- Improve code comments
- Update outdated information

## Development Setup

### Running Tests

```bash
# Run all E2E tests
npm test

# Run unit tests only
npm run test:unit

# Run specific test suite
npx wdio run wdio.conf.ts --spec ./dist/tests/e2e/main.test.js

# Generate coverage report
npm run test:unit
```

### Code Quality

Automatically executed when opening the PR 🚀

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Build TypeScript
npm run build

# Clean build artifacts
npm run clean
```

## Coding Standards

### TypeScript Guidelines

- **Use TypeScript strict mode** for type safety
- **Document public APIs** with JSDoc comments
- **Avoid `any` type** - use proper typing
- **Export types** for reusable interfaces

**Example:**

```typescript
/**
 * Adds a new task to the application
 * @param {Task} task - Task data with title and optional description
 * @returns {Promise<string>} Selector for the created task
 */
async addTask(task: Task): Promise<string> {
  // Implementation
}
```

### Code Style

- **Indentation:** 2 spaces
- **Line length:** Max 100 characters
- **Naming conventions:**
  - Classes: `PascalCase` (e.g., `MainScreen`)
  - Functions: `camelCase` (e.g., `addTask`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `ELEMENT_TIMEOUT`)
  - Files: `camelCase.ts` (e.g., `main.screen.ts`)

### Project Patterns

We use the **Page Object Model (POM)** pattern:

```typescript
// ✅ Good - Page Object
export class MainScreen {
  async addTask(task: Task): Promise<string> {
    await clickElement(mainScreenLocators.addTaskBtn);
    await this.fillTaskForm(task);
    return taskSelector;
  }
}

// ❌ Bad - Direct element interaction in tests
it("should add task", async () => {
  const button = await $('//button[@id="add"]');
  await button.click();
});
```

## Testing Guidelines

### Unit Tests

- **Test utilities and helpers** in `src/tests/unit/`
- **Mock WebDriver dependencies** using Jest
- **Aim for 70%+ coverage**
- **Test edge cases** and error handling

**Example:**

```typescript
describe("MainScreen Unit Tests", () => {
  beforeEach(() => {
    mainScreen = new MainScreen();
    jest.clearAllMocks();
  });

  it("should add task with title and text", async () => {
    const task = { title: "Test", text: "Description" };
    await mainScreen.addTask(task);

    expect(utils.clickElement).toHaveBeenCalled();
    expect(screens.task.fillTask).toHaveBeenCalledWith(task);
  });
});
```

### E2E Tests

- **Follow test plan** in [`docs/TEST_PLAN.md`](./docs/TEST_PLAN.md)
- **Use descriptive test IDs** (e.g., `[UITM-TA001]`)
- **One assertion per test** when possible
- **Clean up test data** after each test

**Example:**

```typescript
it("[UITM-TA001]: Adds a new task with title and description", async () => {
  await screens.main.addTask({
    title: "Buy milk",
    text: "Remember to buy milk from the store",
  });

  await expectElement(push.taskAdded);
});
```

### Test Coverage Requirements

| File Type     | Coverage Target |
| ------------- | --------------- |
| Screens (POM) | 70%+            |
| Utils/Helpers | 80%+            |
| Constants     | 100%            |

## Pull Request Process

follow the [pull_reuest_template](./docs/pull_request_template.md)

### 1. Create a Branch

Use descriptive branch names:

```bash
git checkout -b feature/add-swipe-gesture
git checkout -b fix/checkbox-not-working
git checkout -b docs/update-readme
```

### 2. Make Your Changes

- Write clean, documented code
- Add tests for new features
- Update documentation if needed
- Follow existing code style
- Write down the changes in the [CHANGELOG.md](./docs/CHANGELOG.MD)

### 3. Test Your Changes

```bash
npm run lint        # Check code style
npm run format      # Format code
npm run build       # Compile TypeScript
npm test            # Run E2E tests
npm run test:unit   # Run unit tests
```

### 4. Commit Your Changes

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add swipe gesture support"
git commit -m "fix: resolve checkbox state issue"
git commit -m "docs: update installation guide"
git commit -m "test: add unit tests for MainScreen"
git commit -m "refactor: improve error handling"
git commit -m "chore: update dependencies"
```

**Commit types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting (no logic change)
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Build, dependencies, tooling

### 5. Push and Create PR

```bash
git push origin feature/add-swipe-gesture
```

Then:

1. Go to GitHub and create a Pull Request
2. Fill out the [PR template](./docs/pull_request_template.md)
3. Link related issues
4. Request review from maintainers

### 6. PR Review Process

- **CI/CD checks must pass** (lint, format, tests)
- **At least one approval** required
- **Address review comments** promptly
- **Keep PR focused** - one feature/fix per PR

## [Project Structure](./docs/STRUCTURE.md)

### Key Files

- `wdio.conf.ts` - WebDriverIO configuration
- `jest.config.js` - Jest configuration for unit tests
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint rules
- `.prettierrc` - Prettier formatting rules

## Good First Issues

Looking for a good starting point? Check out issues labeled:

- `good first issue` - Perfect for newcomers
- `help wanted` - We need your expertise
- `documentation` - Improve our docs

## Questions?

- **Open an issue** for general questions
- **Check existing discussions** first
- **Review documentation** in `docs/` and `README.md`

## 🙏 Thank You!

Every contribution, no matter how small, makes a difference. Thank you for helping improve this project!

---

**Happy Testing! 🧪✨**
