Feature: Saucedemo Login Authentication

  As a registered user of the platform
  I want to enter my credentials on the login page
  To access the application product catalog

  Background:
    Given the user is on the Saucedemo login page

  Scenario Outline: Verify login behavior with various user profiles
    When the user enters username "<username>" and password "<password>"
    And clicks the login button
    Then the user should see the expected outcome "<outcome>" with the message "<message>"

    Examples:

      | username                | password     | outcome | message                                                                     |
      | standard_user           | secret_sauce | success | N/A                                                                         |
      | locked_out_user         | secret_sauce | error   | Epic sadface: Sorry, this user has been locked out.                         |
      | problem_user            | secret_sauce | success | N/A                                                                         |
      | performance_glitch_user | secret_sauce | success | N/A                                                                         |
      | error_user              | secret_sauce | success | N/A                                                                         |
      | visual_user             | secret_sauce | success | N/A                                                                         |
      | invalid_user            | secret_sauce | error   | Epic sadface: Username and password do not match any user in this service   |
      |                         |              | error   | Epic sadface: Username is required                                          |
      | standard_user           |              | error   | Epic sadface: Password is required                                          |
      |                         | secret_sauce | error   | Epic sadface: Username is required                                          |