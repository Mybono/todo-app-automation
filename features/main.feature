Feature: Main Screen
  As a user
  I want to manage tasks from the main screen
  So that I can track my work efficiently

  Scenario: Create a new task
    Given I am on the main screen
    When I add a new task "Buy milk"
    Then I should see the task "Buy milk" in the list

  Scenario: Mark a task as completed
    Given I have a task "Buy milk"
    When I mark task "Buy milk" as completed
    Then task "Buy milk" should be marked as completed

  Scenario: Filter tasks by Active
    Given I have tasks "Buy milk" (completed) and "Go shopping" (active)
    When I filter tasks by "Active"
    Then I should see only "Go shopping"
