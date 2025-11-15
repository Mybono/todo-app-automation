export const capabilities = [
    {
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '11.0',
        'appium:app': './app/apk/app-debug.apk',
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300,
        'appium:disableWindowAnimation': true,
        'appium:skipDeviceInitialization': false,
        'appium:skipServerInstallation': false,
        'appium:uiautomator2ServerLaunchTimeout': 90000,
        'appium:uiautomator2ServerInstallTimeout': 90000,
        'appium:androidInstallTimeout': 90000
    }
];
