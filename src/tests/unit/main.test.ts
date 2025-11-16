import { MainScreen, screens } from "../../screens";
import { Task, taskStatuses } from "../../types";
import { _ } from "../../utils";

describe("MainScreen", () => {
  let mainScreen: MainScreen;
  let mockElement: any;

  beforeEach(() => {
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it("should add a task", async () => {
    const task: Task = {
      title: "Test",
      text: "Desc",
      status: taskStatuses.active,
    };
    const result = await mainScreen.addTask(task);
    expect(result).toContain("Test");
    expect(mockElement.click).toHaveBeenCalled();
  });

  it("should toggle checkbox", async () => {
    const res = await mainScreen.toggleCheckbox("selector", true);
    expect(mockElement.click).toHaveBeenCalled();
    expect(res).toBe(mockElement);
  });

  it("should generate random data if title/text not provided", async () => {
    jest
      .spyOn(_, "getRandomText")
      .mockReturnValue({ title: "Random", text: "RandomDesc" });
    const task: Task = { status: taskStatuses.active };
    const result = await mainScreen.addTask(task);
    expect(result).toContain("Random");
  });

  it("should handle error in addTask", async () => {
    global.$ = jest.fn().mockImplementation(() => {
      throw new Error("Click failed");
    });
    const task: Task = { title: "T", text: "D", status: taskStatuses.active };
    await expect(mainScreen.addTask(task)).rejects.toThrow("Click failed");
  });

  it('should apply "all" filter', async () => {
    const spyClick = jest
      .spyOn(global, "clickElement" as any)
      .mockResolvedValue(undefined);
    await mainScreen.applyFilter("all");
    expect(spyClick).toHaveBeenCalledWith(mainScreen.filterAll);
  });

  it("should throw error if filter fails", async () => {
    const spyClick = jest
      .spyOn(global, "clickElement" as any)
      .mockRejectedValue(new Error("Fail"));
    await expect(mainScreen.applyFilter("active")).rejects.toThrow("Fail");
  });

  it("should mark task complete with titleSelector", async () => {
    screens.task.selectTask = jest.fn().mockResolvedValue(undefined);
    const spyClick = jest
      .spyOn(global, "clickElement" as any)
      .mockResolvedValue(undefined);
    await mainScreen.markTaskComplete(true, "selector");
    expect(screens.task.selectTask).toHaveBeenCalledWith("selector");
    expect(spyClick).toHaveBeenCalled();
  });

  it("should not click if checkbox already in desired state", async () => {
    (mockElement.getAttribute as jest.Mock).mockResolvedValue("true");
    const res = await mainScreen.toggleCheckbox("selector", true);
    expect(mockElement.click).not.toHaveBeenCalled();
    expect(res).toBe(mockElement);
  });

  it("should click if checkbox state differs", async () => {
    (mockElement.getAttribute as jest.Mock).mockResolvedValue("false");
    const res = await mainScreen.toggleCheckbox("selector", true);
    expect(mockElement.click).toHaveBeenCalled();
  });
});
