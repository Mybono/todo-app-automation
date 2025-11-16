# 📝 Test Documentation

## 1. User Needs and Risk Inputs

| ID      | User Need / Risk Input                                           | Description / Notes                          | Priority | Severity |
| ------- | ---------------------------------------------------------------- | -------------------------------------------- | -------- | -------- |
| UN001   | User can view a list of all tasks                                | Main screen should show all tasks by default | <span style="color:#FF4500"><b>High </b></span>     | <span style="color:#FF4500"><b>Major</b></span>    |
| UN002   | User can create a new task                                       | Task can have title and description          | <span style="color:#FF0000"><b>Critical</b></span> | <span style="color:#FF0000"><b>Critical</b></span>  |
| UN003   | User can mark a task as completed                                | Both from main screen and task details       | <span style="color:#FF4500"><b>High </b></span>     | <span style="color:#FF4500"><b>Major</b></span>    |
| UN004   | User can edit a task                                             | Task details screen                          | <span style="color:#FF4500"><b>High </b></span>     | <span style="color:#FF4500"><b>Major</b></span>    |
| UN005   | User can delete a task                                           | Task details screen                          | <span style="color:#FF4500"><b>High </b></span>     | <span style="color:#FF4500"><b>Major</b></span>    |
| UN006   | User can filter tasks (All, Active, Completed)                   | Main screen filter button                    | <span style="color:#FFA500"><b>Medium</b></span>   | <span style="color:#FFA500"><b>Minor</b></span>    |
| UN007   | User can navigate between main, settings, and statistics screens | Navigation flow                              | <span style="color:#008000"><b>Low</b></span>      | <span style="color:#FFA500"><b>Minor</b></span>    |
| RISK001 | Tasks are accidentally deleted                                   | Push messages confirm deletion               | <span style="color:#FFA500"><b>Medium</b></span>   | <span style="color:#FF4500"><b>Major</b></span>    |
| RISK002 | Task completion state not updated correctly                      | Push messages confirm change                 | <span style="color:#FFA500"><b>Medium</b></span>   | <span style="color:#FF4500"><b>Major</b></span>    |
| RISK003 | Filters do not show correct tasks                                | Check empty states                           | <span style="color:#008000"><b>Low</b></span>      | <span style="color:#FFA500"><b>Minor</b></span>    |
| RISK004 | Navigation buttons do not work                                   | Test screen transitions                      | <span style="color:#FFA500"><b>Medium</b></span>   | <span style="color:#FF4500"><b>Major</b></span>    |

---

## 2. Requirements Mapping

| Requirement ID | Description                                                | User Need / Risk Covered | Priority | Automated Test                                                  |
| -------------- | ---------------------------------------------------------- | ------------------------ | -------- | --------------------------------------------------------------- |
| REQ-001        | Display all tasks on the main screen                       | UN001                    | <span style="color:#FF4500"><b>High</b></span>      | [UITM-TA001, UITM-CA003, UITM-CA004](#31-task-management)       |
| REQ-002        | Allow creating a task with title and optional description  | UN002                    | <span style="color:#FF0000"><b>Critical</b></span>  | [UITM-TA001, UITM-TA002](#31-task-management)                   |
| REQ-003        | Allow deleting a task and show confirmation message        | UN005, RISK001           | <span style="color:#FF4500"><b>High</b></span>      | [UITM-TA003](#31-task-management)                               |
| REQ-004        | Allow editing a task and show confirmation message         | UN004                    | <span style="color:#FF4500"><b>High</b></span>      | [UITM-TA004](#31-task-management)                               |
| REQ-005        | Mark task completed from main and task details screens     | UN003, RISK002           | <span style="color:#FF4500"><b>High</b></span>      | [UITM-CA001, UITM-CA003](#32-task-checkbox-actions)             |
| REQ-006        | Mark task active from main and task details screens        | UN003, RISK002           | <span style="color:#FF4500"><b>High</b></span>      | [UITM-CA002, UITM-CA004](#32-task-checkbox-actions)             |
| REQ-007        | Filter tasks by All, Active, Completed                     | UN006, RISK003           | <span style="color:#FFA500"><b>Medium</b></span>   | [UITM-FE001 – UITM-FE003, UITM-FH001 – UITM-FH003](#33-filters) |
| REQ-007.1      | Filter tasks when no matching tasks exist, display message | UN006, RISK003           | <span style="color:#008000"><b>Low</b></span>      | [UITM-FE001 – UITM-FE003](#33-filters)                          |
| REQ-007.2      | Filter tasks after marking tasks complete/active           | UN006, RISK003           | <span style="color:#FFA500"><b>Medium</b></span>   | [UITM-FH001 – UITM-FH003](#33-filters)                          |
| REQ-008        | Navigate between main, settings, and statistics screens    | UN007, RISK004           | <span style="color:#FFA500"><b>Medium</b></span>    | [UITM-NA001 – UITM-NA004](#34-navigation)                       |

## 3. Test Cases

### 3.1 [Task Management](.../src/tests/main.test.ts)

| Test ID                                 | Description                                | Priority | Severity | Preconditions                  | Steps                                                         | Expected Result                    |
| --------------------------------------- | ------------------------------------------ | -------- | -------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------- |
| [UITM-TA001](../src/tests/main.test.ts) | Adds a new task with title and description | <span style="color:#FF0000"><b>Critical</b></span>  | <span style="color:#FF0000"><b>Critical</b></span>  | App launched, main screen open | 1. Click add task<br>2. Fill title and description<br>3. Save | Task added, push message displayed |
| [UITM-TA002](../src/tests/main.test.ts) | Adds a new task with only title            | <span style="color:#FF4500"><b>High</b></span>      | <span style="color:#FF4500"><b>Major</b></span>    | App launched, main screen open | 1. Click add task<br>2. Fill title<br>3. Save                 | Task added, push message displayed |
| [UITM-TA003](../src/tests/main.test.ts) | Deletes an existing task                   | <span style="color:#FF4500"><b>High</b></span>      | <span style="color:#FF4500"><b>Major</b></span>    | Task exists                    | 1. Open task details<br>2. Click delete                       | Push message "Task deleted" shown  |
| [UITM-TA004](../src/tests/main.test.ts) | Edits a task                               | <span style="color:#FF4500"><b>High</b></span>      | <span style="color:#FF4500"><b>Major</b></span>    | Task exists                    | 1. Open task details<br>2. Edit task<br>3. Save               | Push message "Task saved" shown    |

### 3.2 [Task Checkbox Actions](../src/tests/checkbox.test)

| Test ID                                     | Description                            | Priority | Severity | Preconditions         | Steps                             | Expected Result                     |
| ------------------------------------------- | -------------------------------------- | -------- | -------- | --------------------- | --------------------------------- | ----------------------------------- |
| [UITM-CA001](../src/tests/checkbox.test.ts) | Marks task completed from task details | <span style="color:#FF4500"><b>High</b></span>     | <span style="color:#FF4500"><b>Major</b></span>    | Active task exists    | 1. Open task<br>2. Click checkbox | Push message "Task marked complete" |
| [UITM-CA002](../src/tests/checkbox.test.ts) | Marks task active from task details    | <span style="color:#FF4500"><b>High</b></span>      | <span style="color:#FF4500"><b>Major</b></span>    | Completed task exists | 1. Open task<br>2. Click checkbox | Push message "Task marked active"   |
| [UITM-CA003](../src/tests/checkbox.test.ts) | Marks task completed from main list    | <span style="color:#FF0000"><b>Critical</b></span>  | <span style="color:#FF4500"><b>Major</b></span>    | Active task exists    | 1. Click checkbox in main list    | Push message "Task marked complete" |
| [UITM-CA004](../src/tests/checkbox.test.ts) | Marks task active from main list       | <span style="color:#FF4500"><b>High</b></span>      | <span style="color:#FF4500"><b>Major</b></span>    | Completed task exists | 1. Click checkbox in main list    | Push message "Task marked active"   |

### 3.3 Filters

| Test ID                                     | Description                                                  | Priority | Severity | Preconditions         | Steps                                         | Expected Result                                 |
| ------------------------------------------- | ------------------------------------------------------------ | -------- | -------- | --------------------- | --------------------------------------------- | ----------------------------------------------- |
| [UITM-FE001](../src/tests/filter.test.ts)   | Filter tasks between Active (no tasks exist)                 | <span style="color:#008000"><b>Low</b></span>      | <span style="color:#FFA500"><b>Minor</b></span>     | No active tasks       | 1. Click filter button<br>2. Select Active    | Header "You have no active tasks!" displayed    |
| [UITM-FE002](../src/tests/filter.test.ts)   | Filter tasks between Completed (no tasks exist)              | <span style="color:#008000"><b>Low</b></span>      | <span style="color:#FFA500"><b>Minor</b></span>     | No completed tasks    | 1. Click filter button<br>2. Select Completed | Header "You have no completed tasks!" displayed |
| [UITM-FE003](../src/tests/filter.test.ts)   | Filter tasks between All (no tasks exist)                    | <span style="color:#008000"><b>Low</b></span>      | <span style="color:#FFA500"><b>Minor</b></span>     | No tasks              | 1. Click filter button<br>2. Select All       | Header "You have no tasks!" displayed           |
| [UITM-FH001](../src/tests/checkbox.test.ts) | Filter tasks between Active after adding tasks               | <span style="color:#FFA500"><b>Medium</b></span>   | <span style="color:#FF4500"><b>Major</b></span>    | Active task exists    | 1. Click filter button<br>2. Select Active    | Header "Active Tasks" displayed                 |
| [UITM-FH002](../src/tests/checkbox.test.ts) | Filter tasks between Completed after marking tasks completed | <span style="color:#FFA500"><b>Medium</b></span>    | <span style="color:#FF4500"><b>Major</b></span>    | Completed task exists | 1. Click filter button<br>2. Select Completed | Header "Completed Tasks" displayed              |
| [UITM-FH003](../src/tests/checkbox.test.ts) | Filter tasks between All after adding tasks                  | <span style="color:#FFA500"><b>Medium</b></span>    | <span style="color:#FFA500"><b>Minor</b></span>     | Tasks exist           | 1. Click filter button<br>2. Select All       | Header "All Tasks" displayed                    |

## 3.4 [Navigation](../src/tests/navigate.test.ts)

| Test ID                                     | Description                    | Priority | Severity | Preconditions   | Steps              | Expected Result                          |
| ------------------------------------------- | ------------------------------ | -------- | -------- | --------------- | ------------------ | ---------------------------------------- |
| [UITM-NA001](../src/tests/navigate.test.ts) | Navigate Tasks → Settings      | <span style="color:#FFA500"><b>Medium</b></span>   | <span style="color:#FFA500"><b>Minor</b></span>    | App launched    | 1. Open Settings   | Statistics and Task List buttons visible |
| [UITM-NA002](../src/tests/navigate.test.ts) | Navigate Settings → Statistics | <span style="color:#008000"><b>Low</b></span>      | <span style="color:#FFA500"><b>Minor</b></span>    | Settings open   | 1. Open Statistics | Statistics header visible                |
| [UITM-NA003](../src/tests/navigate.test.ts) | Navigate Statistics → Settings | <span style="color:#008000"><b>Low</b></span>      | <span style="color:#FFA500"><b>Minor</b></span>     | Statistics open | 1. Open Settings   | Statistics and Task List buttons visible |
| [UITM-NA004](../src/tests/navigate.test.ts) | Navigate Settings → Tasks      | <span style="color:#FFA500"><b>Medium</b></span>   | <span style="color:#FFA500"><b>Minor</b></span>     | Settings open   | 1. Open Tasks      | Filter button visible                    |

---

## 4. Priority and Severity Definitions

### Priority Levels
- <span style="color:#FF0000"><b>Critical (P1)</b></span>: Must be fixed immediately. Blocks core functionality.
- <span style="color:#FF4500"><b>High (P2)</b></span>: Should be fixed ASAP. Affects important features.
- <span style="color:#FFA500"><b>Medium (P3)</b></span>: Should be fixed in current sprint/release.
- <span style="color:#008000"><b>Low (P4)</b></span>: Can be deferred to future releases.

### Severity Levels
- <span style="color:#FF0000"><b>Critical (S1)</b></span>: Complete system failure or data loss. App unusable.
- <span style="color:#FF4500"><b>Major (S2)</b></span>: Major feature broken, but workaround exists.
- <span style="color:#FFA500"><b>Minor (S3)</b></span>: Minor feature issue, doesn't affect core functionality.
- <span style="color:#008000"><b>Trivial (S4)</b></span>: Cosmetic issue, typos, UI inconsistencies.


---

## 5. Notes

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
