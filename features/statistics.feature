Feature: Statistics Screen
  Scenario: Navigate to Statistics
    Given I am on the main screen
    When I open the statistics screen
    Then I should see statistics for all tasks
