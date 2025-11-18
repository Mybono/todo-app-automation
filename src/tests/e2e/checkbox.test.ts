import { taskStatuses, filter } from '../../types';
import { headers, push } from '../../constants';
import { expectElement } from '../../utils';
import { screens } from '../../screens';

describe('Task Checkbox Actions @checkbox @regression', () => {
  it('[UITM-CA001]: Marks a task as completed from the task details screen', async() => {
    const titleSelector = await screens.main.addTask({
      status: taskStatuses.active,
    });
    await screens.task.selectTask(titleSelector);
    await screens.main.markTaskComplete(true, titleSelector);

    await expectElement(push.taskMarkedComplete);
    await screens.task.backToMain();
  });

  it('[UITM-CA002]: Marks a task as active from the task details screen', async function() {
    const titleSelector = await screens.main.addTask({
      status: taskStatuses.completed,
    });
    await screens.main.markTaskComplete(false, titleSelector);

    await expectElement(push.taskMarkedActive);
    await screens.task.backToMain();
  });

  it('[UITM-CA003]: Marks a task as completed directly from the main task list', async() => {
    await screens.main.addTask({ status: taskStatuses.active });
    await screens.main.markTaskComplete(true);

    await expectElement(push.taskMarkedComplete);
  });

  it('[UITM-CA004]: Marks a task as active directly from the main task list', async() => {
    await screens.main.addTask({ status: taskStatuses.completed });
    await screens.main.markTaskComplete(false);

    await expectElement(push.taskMarkedActive);
  });

  it('[UITM-FH001]: Filter tasks between Active @filter @regression', async() => {
    await screens.main.applyFilter(filter.active);

    await expectElement(headers.activeTasks);
  });

  it('[UITM-FH002]: Filter tasks between Completed @filter @regression', async() => {
    await screens.main.applyFilter(filter.completed);

    await expectElement(headers.completedTasks);
  });

  it('[UITM-FH002]: Filter tasks between All @filter @regression', async() => {
    await screens.main.applyFilter(filter.all);

    await expectElement(headers.allTasks);
  });
});
