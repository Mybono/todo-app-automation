import { task, MainScreen, SettingsScreen, StatisticsScreen } from "../screens";

class ScreenFactory {
  private static _task: task;
  private static _mainScreen: MainScreen;
  private static _settings: SettingsScreen;
  private static _statisticsScreen: StatisticsScreen;

  static get task() {
    if (!this._task) this._task = new task();
    return this._task;
  }

  static get main() {
    if (!this._mainScreen) this._mainScreen = new MainScreen();
    return this._mainScreen;
  }

  static get settings() {
    if (!this._settings) this._settings = new SettingsScreen();
    return this._settings;
  }

  static get statistics() {
    if (!this._statisticsScreen)
      this._statisticsScreen = new StatisticsScreen();
    return this._statisticsScreen;
  }
}

export const screens = ScreenFactory;
