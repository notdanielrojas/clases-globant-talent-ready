import {
    Before,
    After,
    AfterStep,
    Status,
    setDefaultTimeout
} from '@cucumber/cucumber';

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';

import LoginPage from '../../pages/LoginPage.js';

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