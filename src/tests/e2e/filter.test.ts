import { expectElement } from '../../utils';
import { headers } from '../../constants';
import { screens } from '../../screens';
import { filter } from '../../types';

describe('Filter empty tasks @filter @regression', () => {
  it('[UITM-FE001]: Filter tasks between Active', async() => {
    await screens.main.applyFilter(filter.active);
    await expectElement(headers.noActiveTasks);
  });

  it('[UITM-FE002]: Filter tasks between Completed', async() => {
    await screens.main.applyFilter(filter.completed);
    await expectElement(headers.noCompletedTasks);
  });

  it('[UITM-FE003]: Filter tasks between All', async() => {
    await screens.main.applyFilter(filter.all);
    await expectElement(headers.noAllTasks);
  });
});
