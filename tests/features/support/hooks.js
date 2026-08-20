import {
    Before,
    After,
    AfterStep,
    Status,
    setDefaultTimeout
} from '@cucumber/cucumber';

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { LoginPage } from '../../pages/LoginPage';
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

setDefaultTimeout(60 * 1000);

const screenshotDir = 'reports/screenshots';

if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
}

Before(async function () {
  
    this.browser = await chromium.launch({
        headless: false
    });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
});

AfterStep(async function ({ pickle, result }) {
    if (
        result?.status === Status.FAILED &&
        this.page &&
        !this.page.isClosed()
    ) {
        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');

        const scenarioName = pickle.name.replace(
            /[^a-zA-Z0-9]/g,
            '_'
        );

        const screenshot = await this.page.screenshot({
            path: `${screenshotDir}/${scenarioName}-${timestamp}.png`,
            fullPage: true
        });

        await this.attach(screenshot, 'image/png');
    }
});

After(async function () {
    await this.context?.close();
    await this.browser?.close();
});