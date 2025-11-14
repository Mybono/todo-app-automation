Feature: Task filtering
  Scenario: Filter active tasks
    Given I have tasks "Task1" (completed) and "Task2" (active)
    When I filter tasks by "Active"
    Then I should see only "Task2"