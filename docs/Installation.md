## Installation

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

## Alternative Installation via Docker

You can run all tests and the Appium server without installing Node.js, Appium, or Android SDK locally by using our prebuilt Docker image.

### Pull and Run the Docker Image

```bash
# Pull the image from Docker Hub
docker pull mybono/todo-app-automation:latest
```

### Run tests inside the container

```bash
docker run --rm -it \
  -v $(pwd)/reports:/usr/src/app/reports \
  -p 4723:4723 \
  mybono/todo-app-automation:latest
```

## 📘 Explanation of Flags

| Flag                                     | Description                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| `-v $(pwd)/reports:/usr/src/app/reports` | Mounts local reports folder so test reports persist outside the container |
| `-p 4723:4723`                           | Exposes Appium default port                                               |
| `--rm`                                   | Removes container after execution                                         |
| `-it`                                    | Interactive mode (shows logs in real time)                                |

---

🔍 Note about `--rm`

- `--rm` deletes the container after tests finish, but the Docker image remains on your machine.
  You will NOT need to download it again unless you manually delete the image.

## 📦 [Docker Hub Image](https://hub.docker.com/r/mybono/todo-app-automation)

## ✅ Benefits

- No need to install **Node.js**, **Appium**, **Android SDK**
- Fully isolated test environment
- Consistent behavior across all machines
- Ready-to-run **CI/CD friendly** setup

## Running Tests

### Build & Run All Tests

```bash
npm test
```

This command:

1. Compiles TypeScript (`npm run build`)
2. Starts Appium server automatically
3. Executes all tests in `src/tests/`


### 📸 Screenshots on Test Failure

All failed E2E tests automatically capture screenshots for easier debugging.  
Screenshots are saved to: reports/screenshots

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
