import { AddEditTaskScreen, MainScreen } from "../screens";

class ScreenFactory {
  private static _addEditScreen: AddEditTaskScreen;
  private static _mainScreen: MainScreen;

  static get main() {
    if (!this._mainScreen) this._mainScreen = new MainScreen();
    return this._mainScreen;
  }

  static get addEdit() {
    if (!this._addEditScreen) this._addEditScreen = new AddEditTaskScreen();
    return this._addEditScreen;
  }
}

export const screens = ScreenFactory;
