Feature: Task Details
  Scenario: Edit a task
    Given I have a task "Buy milk"
    When I edit task "Buy milk" to "Buy almond milk"
    Then I should see the task "Buy almond milk" in the list

  Scenario: Delete a task
    Given I have a task "Go shopping"
    When I delete task "Go shopping"
    Then I should not see the task "Go shopping"
