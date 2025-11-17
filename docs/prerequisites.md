## Prerequisites

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

[⬅️ Back to README](../README.md#overview)
