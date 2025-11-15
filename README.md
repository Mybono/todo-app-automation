# todo-app-automation

assignment
appium --log-level debug:debug --relaxed-security
adb logcat -d | grep -iE "uiautomator|appium|instrument|fatal|exception"
npm install -g appium-doctor
appium-doctor --android


adb shell am force-stop io.appium.uiautomator2.server
adb shell am force-stop io.appium.uiautomator2.server.test
adb uninstall io.appium.uiautomator2.server
adb uninstall io.appium.uiautomator2.server.test
adb uninstall io.appium.settings
adb kill-server
adb start-server
adb logcat -c