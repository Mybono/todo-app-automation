import { TaskScreen, MainScreen, SettingsScreen } from '../screens';

class ScreenFactory {
  private static _task: TaskScreen;
  private static _mainScreen: MainScreen;
  private static _settings: SettingsScreen;

  static get task(): TaskScreen {
    if (!this._task) this._task = new TaskScreen();

    return this._task;
  }

  static get main(): MainScreen {
    if (!this._mainScreen) this._mainScreen = new MainScreen();

    return this._mainScreen;
  }

  static get settings(): SettingsScreen {
    if (!this._settings) this._settings = new SettingsScreen();

    return this._settings;
  }
}

export const screens = ScreenFactory;
