import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is on the Saucedemo login page', async function () {
  await this.loginPage.navigate();
});

When(
  'the user enters username {string} and password {string}',
  async function (username, password) {
    await this.loginPage.fillUsername(username);
    await this.loginPage.fillPassword(password);
  }
);

When('the user leaves username and password fields empty', async function () {
  await this.loginPage.fillUsername('');
  await this.loginPage.fillPassword('');
});

When(
  'the user leaves username field empty and enters password {string}',
  async function (password) {
    await this.loginPage.fillUsername('');
    await this.loginPage.fillPassword(password);
  }
);

When(
  'the user enters username {string} and leaves password field empty',
  async function (username) {
    await this.loginPage.fillUsername(username);
    await this.loginPage.fillPassword('');
  }
);

When('clicks the login button', async function () {
  await this.loginPage.clickLogin();
});

Then('the user is redirected to the products page', async function () {
  await expect(this.page).toHaveURL(/inventory\.html/);
});

Then(
  'the user should see the error message {string}',
  async function (message) {
    await expect(this.loginPage.errorMessage).toHaveText(message);
  }
);

Then(
  'the user should see the expected outcome {string} with the message {string}',
  async function (outcome, message) {
    if (outcome === 'success') {
      await expect(this.page).toHaveURL(/inventory\.html/);
      return;
    }

    await expect(this.loginPage.errorMessage).toHaveText(message);
  }
);