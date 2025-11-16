import {
  AddEditTaskScreen,
  MainScreen,
  SettingsScreen,
  StatisticsScreen,
} from "../screens";

class ScreenFactory {
  private static _addEditScreen: AddEditTaskScreen;
  private static _mainScreen: MainScreen;
  private static _settings: SettingsScreen;
  private static _statisticsScreen: StatisticsScreen;

  static get addEdit() {
    if (!this._addEditScreen) this._addEditScreen = new AddEditTaskScreen();
    return this._addEditScreen;
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
