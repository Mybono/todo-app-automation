import { ChainablePromiseElement } from "webdriverio";

export class TaskDetailsScreen {
  get title(): ChainablePromiseElement<WebdriverIO.Element> {
    return $("~task-title");
  }

  get description(): ChainablePromiseElement<WebdriverIO.Element> {
    return $("~task-description");
  }

  get markCompletedButton(): ChainablePromiseElement<WebdriverIO.Element> {
    return $("~mark-completed-btn");
  }

  async markCompleted() {
    await this.markCompletedButton.click();
  }
}
