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
│   ├── TEST_PLAN.md                # 📋 Complete test documentation
│   ├── INSTALL.md
│   ├── PREREQUISITES.md
│   ├── TROUBLESHOOTING.md
│   ├── STACK.md
│   ├── CHANGELOG.md
│   └── emulator.config.md
│
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
│   │   │   ├── main.test.ts        # Task management
│   │   │   ├── checkbox.test.ts.   # Task completion/activation
│   │   │   ├── filter.test.ts      # Task filtering
│   │   │   └── navigate.test.ts.   # Screen navigation
│   │   └── unit/                   # unit tests (Jest)
│   │       ├── main.test.ts
│   │       ├── settings.test.ts
│   │       └── task.test.ts
│   │
│   ├── constants/                             # Locators
│   │   ├── mainScreen.locators.screen.ts      # Main Screen
│   │   ├── settingsScreen.locators.screen.ts  # Settings Screen locators
│   │   ├── taskScreen.locators.test.ts       # TaskScreen locators
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

[⬅️ Back to README](../README.md#project-structure)
