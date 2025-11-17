## Notes

### Test Data Generation

The framework generates random test data for flexible testing:

```typescript
import { _ } from "./utils";

const { title, text } = _.getRandomText();
// title: 4-10 alphanumeric characters
// text: 8-20 characters with spaces
```

### [Emulator Configuration](./docs/emulator.config.md)

Current configuration in `capabilities.ts`:

### Page Object Model Pattern

All screen interactions are abstracted through Page Objects:

```typescript
// Using screen factory
import { screens } from "./screens";

// Add task
const taskSelector = await screens.main.addTask("Title", "Description");

// Edit task
await screens.addEdit.editTask({ titleSelector, title: "New Title" });

// Delete task
await screens.addEdit.deleteTask(taskSelector);
```

[⬅️ Back to README](../README.md#overview)
