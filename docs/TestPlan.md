# 📝 Test Documentation

## 1. User Needs and Risk Inputs

| ID      | User Need / Risk Input                                           | Description / Notes                          |
| ------- | ---------------------------------------------------------------- | -------------------------------------------- |
| UN001   | User can view a list of all tasks                                | Main screen should show all tasks by default |
| UN002   | User can create a new task                                       | Task can have title and description          |
| UN003   | User can mark a task as completed                                | Both from main screen and task details       |
| UN004   | User can edit a task                                             | Task details screen                          |
| UN005   | User can delete a task                                           | Task details screen                          |
| UN006   | User can filter tasks (All, Active, Completed)                   | Main screen filter button                    |
| UN007   | User can navigate between main, settings, and statistics screens | Navigation flow                              |
| RISK001 | Tasks are accidentally deleted                                   | Push messages confirm deletion               |
| RISK002 | Task completion state not updated correctly                      | Push messages confirm change                 |
| RISK003 | Filters do not show correct tasks                                | Check empty states                           |
| RISK004 | Navigation buttons do not work                                   | Test screen transitions                      |

---

## 2. Requirements Mapping

| Requirement ID | Description                                                | User Need / Risk Covered | Automated Test                                                  |
| -------------- | ---------------------------------------------------------- | ------------------------ | --------------------------------------------------------------- |
| REQ-001        | Display all tasks on the main screen                       | UN001                    | [UITM-TA001, UITM-CA003, UITM-CA004](#31-task-management)       |
| REQ-002        | Allow creating a task with title and optional description  | UN002                    | [UITM-TA001, UITM-TA002](#31-task-management)                   |
| REQ-003        | Allow deleting a task and show confirmation message        | UN005, RISK001           | [UITM-TA003](#31-task-management)                               |
| REQ-004        | Allow editing a task and show confirmation message         | UN004                    | [UITM-TA004](#31-task-management)                               |
| REQ-005        | Mark task completed from main and task details screens     | UN003, RISK002           | [UITM-CA001, UITM-CA003](#32-task-checkbox-actions)             |
| REQ-006        | Mark task active from main and task details screens        | UN003, RISK002           | [UITM-CA002, UITM-CA004](#32-task-checkbox-actions)             |
| REQ-007        | Filter tasks by All, Active, Completed                     | UN006, RISK003           | [UITM-FE001 – UITM-FE003, UITM-FH001 – UITM-FH003](#33-filters) |
| REQ-007.1      | Filter tasks when no matching tasks exist, display message | UN006, RISK003           | [UITM-FE001 – UITM-FE003](#33-filters)                          |
| REQ-007.2      | Filter tasks after marking tasks complete/active           | UN006, RISK003           | [UITM-FH001 – UITM-FH003](#33-filters)                          |
| REQ-008        | Navigate between main, settings, and statistics screens    | UN007, RISK004           | [UITM-NA001 – UITM-NA004](#34-navigation)                       |

## 3. Test Cases

### 3.1 [Task Management](.../src/tests/main.test.ts)

| Test ID                                 | Description                                | Preconditions                  | Steps                                                         | Expected Result                    |
| --------------------------------------- | ------------------------------------------ | ------------------------------ | ------------------------------------------------------------- | ---------------------------------- |
| [UITM-TA001](../src/tests/main.test.ts) | Adds a new task with title and description | App launched, main screen open | 1. Click add task<br>2. Fill title and description<br>3. Save | Task added, push message displayed |
| [UITM-TA002](../src/tests/main.test.ts) | Adds a new task with only title            | App launched, main screen open | 1. Click add task<br>2. Fill title<br>3. Save                 | Task added, push message displayed |
| [UITM-TA003](../src/tests/main.test.ts) | Deletes an existing task                   | Task exists                    | 1. Open task details<br>2. Click delete                       | Push message "Task deleted" shown  |
| [UITM-TA004](../src/tests/main.test.ts) | Edits a task                               | Task exists                    | 1. Open task details<br>2. Edit task<br>3. Save               | Push message "Task saved" shown    |

### 3.2 [Task Checkbox Actions](../src/tests/checkbox.test)

| Test ID                                     | Description                            | Preconditions         | Steps                             | Expected Result                     |
| ------------------------------------------- | -------------------------------------- | --------------------- | --------------------------------- | ----------------------------------- |
| [UITM-CA001](../src/tests/checkbox.test.ts) | Marks task completed from task details | Active task exists    | 1. Open task<br>2. Click checkbox | Push message "Task marked complete" |
| [UITM-CA002](../src/tests/checkbox.test.ts) | Marks task active from task details    | Completed task exists | 1. Open task<br>2. Click checkbox | Push message "Task marked active"   |
| [UITM-CA003](../src/tests/checkbox.test.ts) | Marks task completed from main list    | Active task exists    | 1. Click checkbox in main list    | Push message "Task marked complete" |
| [UITM-CA004](../src/tests/checkbox.test.ts) | Marks task active from main list       | Completed task exists | 1. Click checkbox in main list    | Push message "Task marked active"   |

### 3.3 Filters

| Test ID                                     | Description                                                  | Preconditions         | Steps                                         | Expected Result                                 |
| ------------------------------------------- | ------------------------------------------------------------ | --------------------- | --------------------------------------------- | ----------------------------------------------- |
| [UITM-FE001](../src/tests/filter.test.ts)   | Filter tasks between Active (no tasks exist)                 | No active tasks       | 1. Click filter button<br>2. Select Active    | Header "You have no active tasks!" displayed    |
| [UITM-FE002](../src/tests/filter.test.ts)   | Filter tasks between Completed (no tasks exist)              | No completed tasks    | 1. Click filter button<br>2. Select Completed | Header "You have no completed tasks!" displayed |
| [UITM-FE003](../src/tests/filter.test.ts)   | Filter tasks between All (no tasks exist)                    | No tasks              | 1. Click filter button<br>2. Select All       | Header "You have no tasks!" displayed           |
| [UITM-FH001](../src/tests/checkbox.test.ts) | Filter tasks between Active after adding tasks               | Active task exists    | 1. Click filter button<br>2. Select Active    | Header "Active Tasks" displayed                 |
| [UITM-FH002](../src/tests/checkbox.test.ts) | Filter tasks between Completed after marking tasks completed | Completed task exists | 1. Click filter button<br>2. Select Completed | Header "Completed Tasks" displayed              |
| [UITM-FH003](../src/tests/checkbox.test.ts) | Filter tasks between All after adding tasks                  | Tasks exist           | 1. Click filter button<br>2. Select All       | Header "All Tasks" displayed                    |

## 3.4 [Navigation](../src/tests/navigate.test.ts)

| Test ID                                     | Description                    | Preconditions   | Steps              | Expected Result                          |
| ------------------------------------------- | ------------------------------ | --------------- | ------------------ | ---------------------------------------- |
| [UITM-NA001](../src/tests/navigate.test.ts) | Navigate Tasks → Settings      | App launched    | 1. Open Settings   | Statistics and Task List buttons visible |
| [UITM-NA002](../src/tests/navigate.test.ts) | Navigate Settings → Statistics | Settings open   | 1. Open Statistics | Statistics header visible                |
| [UITM-NA003](../src/tests/navigate.test.ts) | Navigate Statistics → Settings | Statistics open | 1. Open Settings   | Statistics and Task List buttons visible |
| [UITM-NA004](../src/tests/navigate.test.ts) | Navigate Settings → Tasks      | Settings open   | 1. Open Tasks      | Filter button visible                    |

---

## 4. Notes

- All automated tests are implemented in **TypeScript + Appium + WebdriverIO**.
- Test IDs (`UITM-XX###`) follow a convention:
  - `TA` – Task Management
  - `CA` – Checkbox Actions
  - `FE` – Filter Empty
  - `FH` – Filter Header
  - `NA` – Navigation
- Push messages are validated using `expectElement(push.message)` helper.
- Screens are abstracted via `screens` page objects.
- This document covers inputs, requirements, test cases, and links them to automated tests for full traceability.
