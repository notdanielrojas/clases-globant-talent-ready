import { test, expect } from '@playwright/test';

const BASE_URL = 'https://e2e-ecommerce-app.vercel.app/';
const API_URL = 'https://fakestoreapi.com/products';

test.describe('Probando escenarios de backend', () => {
    test('0 productos', async ({ page }) => {
        await page.route(API_URL, route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([])
            });
        });

        await page.goto(BASE_URL);
        // console.log(await page.locator('body').innerText());
        await expect(page.getByText('No hay productos disponibles')).toBeVisible();
    });

    test('Error 403', async ({ page }) => {
        await page.route(API_URL, route => {
            route.fulfill({
                status: 403,
                body: '{}'
            });
        });

        await page.goto(BASE_URL);
        // console.log(await page.locator('body').innerText());
        await expect(page.getByText('Se intentó acceso no autorizado')).toBeVisible();
    });

    test('Error 500', async ({ page }) => {
        await page.route(API_URL, route => {
            route.fulfill({
                status: 500,
                body: '{}'
            });
        });

        await page.goto(BASE_URL);
        // console.log(await page.locator('body').innerText());
        await expect(page.getByText('Error general de la aplicación')).toBeVisible();
    });
});