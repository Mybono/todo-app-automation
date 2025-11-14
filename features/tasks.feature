Feature: Todo app main flows

  Scenario: Create a new task
    Given I am on the main screen
    When I add a new task "Buy milk"
    Then I should see the task "Buy milk" in the list

  Scenario: Complete a task
    Given I have a task "Buy milk"
    When I mark the task as completed
    Then the task "Buy milk" should be marked as completed
