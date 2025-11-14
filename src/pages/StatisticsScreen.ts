import { ChainablePromiseElement } from "webdriverio";

export class StatisticsScreen {
  get totalTasks(): ChainablePromiseElement<WebdriverIO.Element> {
    return $("~total-tasks");
  }

  get completedTasks(): ChainablePromiseElement<WebdriverIO.Element> {
    return $("~completed-tasks");
  }

  async getStatistics() {
    return {
      total: await this.totalTasks.getText(),
      completed: await this.completedTasks.getText(),
    };
  }
}
