# 📘 Installation & Setup Guide
- **Local environment** (Node.js + Appium + Android Studio), or  
- **Docker environment** (no local installations required)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/todo-app-automation.git
cd todo-app-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Android Studio Setup (Required for Local Testing)

If you want to run tests locally (without Docker), you must install and configure Android Studio.

#### 3.1 Install Android Studio

- Download: https://developer.android.com/studio

- Ensure the following components are installed:

  - Android SDK

  - SDK Platform Tools

  - Android Emulator

  - Android System Images

#### 3.2 Create an Android Virtual Device (AVD)

- Open Tools → Device Manager

- Create a device:

  - Device: emulator-5554

  - System Image: Android 16

- Start the AVD from Device Manager.

### 4. Install Appium Globally

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
emulator -avd emulator-5554 -no-snapshot-load
```
Or start via Android Studio AVD Manager.

### 6. Verify Device Connection
```bash
adb devices
# Output should show: emulator-5554    device
```

## Alternative Installation via Docker 🐳
This image is prebuilt and extremely small. It contains:
- Node.js runtime
- Compiled TypeScript tests
- Minimal project files

```Appium and drivers are installed dynamically at runtime, so you don’t need them in the image itself.```

### Install Docker (Required)
To run the container, you must have **Docker Desktop** installed.

- **Windows / macOS:**  
  Download here → https://www.docker.com/products/docker-desktop/

- **Linux:**  
  Follow the official installation guide: https://docs.docker.com/engine/install/

Verify Docker is installed:
```bash
docker --version
```

### Pull and Run the Docker Image

```bash
# Pull the image from Docker Hub
docker pull mybono/todo-app-automation:latest
```
The image works correctly on macOS and Windows.

### Run tests inside the container
macOS:
```bash
docker run --rm -it \
  -v $(pwd)/reports:/usr/src/app/reports \
  -p 4723:4723 \
  mybono/todo-app-automation:latest
```
Windows:
```bash
docker run --rm -it `
  -v "${PWD}\reports:/usr/src/app/reports" `
  -p 4723:4723 `
  mybono/todo-app-automation:latest
```

🔍 Note about `--rm`
- `--rm` deletes the container after tests finish, but the Docker image remains on your machine.
  You will NOT need to download it again unless you manually delete the image.


<br>

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

[⬅️ Back to README](../README.md#table-of-contents)
