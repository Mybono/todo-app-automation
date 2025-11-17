
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

[⬅️ Back to README](../README.md#table-of-contents)
