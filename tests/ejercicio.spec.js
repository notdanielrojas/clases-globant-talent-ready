import { test, expect } from "@playwright/test";
import usuarios from "./data/usuarios.json";

const BASE_URL = "https://www.saucedemo.com/";

test.describe("Ejercicio de selectores, acciones y validaciones", () => {

  for (const datos of usuarios) {

    test(datos.nombre, async ({ page }) => {

      await page.goto(BASE_URL);

      await page.locator('[data-test="username"]').fill(datos.usuario);
      await page.locator('[data-test="password"]').fill(datos.password);
      await page.locator('[data-test="login-button"]').click();

      if (datos.loginExitoso) {

        await expect(page).toHaveURL(/inventory\.html/);

        await expect(page.locator(".title")).toHaveText("Products");

      } else {

        const mensajeError = page.locator('[data-test="error"]');

        await expect(mensajeError).toBeVisible();

        await expect(mensajeError).toContainText(datos.mensaje);

      }

    });

  }

});