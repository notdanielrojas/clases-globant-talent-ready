Feature: Saucedemo Login Authentication

  Background:
    Given the user is on the Saucedemo login page

  Scenario: Login with valid credentials
    When the user enters username "standard_user" and password "secret_sauce"
    And clicks the login button
    Then the user is redirected to the products page

  Scenario: Login with invalid credentials
    When the user enters username "invalid_user" and password "wrong_password"
    And clicks the login button
    Then the user should see the error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with empty fields
    When the user leaves username and password fields empty
    And clicks the login button
    Then the user should see the error message "Epic sadface: Username is required"

  Scenario: Login with empty username only
    When the user leaves username field empty and enters password "secret_sauce"
    And clicks the login button
    Then the user should see the error message "Epic sadface: Username is required"

  Scenario: Login with empty password only
    When the user enters username "standard_user" and leaves password field empty
    And clicks the login button
    Then the user should see the error message "Epic sadface: Password is required"

  Scenario: Login with locked out user
    When the user enters username "locked_out_user" and password "secret_sauce"
    And clicks the login button
    Then the user should see the error message "Epic sadface: Sorry, this user has been locked out."
