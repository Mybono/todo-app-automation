import { AddEditTaskScreen, MainScreen, NavigateScreen, StatisticsScreen } from "../screens";

class ScreenFactory {
  private static _addEditScreen: AddEditTaskScreen;
  private static _mainScreen: MainScreen;
  private static _navigate: NavigateScreen;
  private static _statisticsScreen: StatisticsScreen;

  static get addEdit() {
    if (!this._addEditScreen) this._addEditScreen = new AddEditTaskScreen();
    return this._addEditScreen;
  }

  static get main() {
    if (!this._mainScreen) this._mainScreen = new MainScreen();
    return this._mainScreen;
  }

  static get navigate() {
    if (!this._navigate) this._navigate = new NavigateScreen();
    return this._navigate;
  }

  static get statistics() {
    if (!this._statisticsScreen) this._statisticsScreen = new StatisticsScreen();
    return this._statisticsScreen;
  }
}

export const screens = ScreenFactory;
