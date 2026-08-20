import { test, expect } from "@playwright/test";
import fs from "node:fs";

test("descarga CSV desde un iframe", async ({ page }) => {
  let solicitudInterceptada = false;

  // 1. Navegar a la aplicación
  await page.goto("http://localhost:3000");

  // 2. Acceder al iframe
  const frame = page.frameLocator("#custom-forms");

  // 3. Completar el formulario
  await frame.getByLabel("Nombre").fill("Daniel");
  await frame.getByLabel("Correo").fill("daniel@test.com");

  // 4. Interceptar la llamada GET a /assets
  await page.route("**/assets/**", async (route) => {
    const request = route.request();

    if (request.method() === "GET") {
      const token = request.headers()["api-token"];

      expect(token).toBeTruthy();

      solicitudInterceptada = true;
    }

    await route.continue();
  });

  // 5. Preparar la captura de la descarga
  const descargaPromise = page.waitForEvent("download");

  // 6. Hacer clic en el botón dentro del iframe
  await frame.locator("#generate-csv").click();

  // 7. Obtener la descarga
  const descarga = await descargaPromise;

  // Validar que la petición fue interceptada
  expect(solicitudInterceptada).toBe(true);

  // Validar la extensión
  expect(descarga.suggestedFilename()).toMatch(/\.csv$/i);

  // Obtener la ruta temporal
  const rutaArchivo = await descarga.path();

  expect(rutaArchivo).not.toBeNull();

  // Validar que el archivo tenga contenido
  const datosArchivo = fs.statSync(rutaArchivo);

  expect(datosArchivo.size).toBeGreaterThan(0);
});