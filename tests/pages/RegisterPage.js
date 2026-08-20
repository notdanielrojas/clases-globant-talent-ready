import { test, expect } from "@playwright/test";

class RegistroPage {
  constructor(page) {
    this.page = page;
    this.nombreCompleto = this.page.getByPlaceholder("Juan García", { exact: true });
    this.correo = this.page.getByRole("textbox", { name: "tu@correo.com", exact: true });
    this.contraseña = this.page.getByRole("textbox", { name: "••••••••", exact: true });
    this.verificarContraseña = this.page.getByRole("textbox", { name: "••••••••", exact: true });
    this.aceptarTerminos = this.page.getByRole("checkbox", { name: "Acepto los Términos de", exact: true });
    this.crearCuenta = this.page.getByRole("button", { name: "Crear Cuenta", exact: true });
  }

  async navegarARegistro() {
    await this.page.goto(`https://creative-choux-407b2c.netlify.app/`);
    await this.page.getByRole("link", { name: "Registro" }).click();
  }

  async llenarNombreCompleto(nombre) {
    await this.nombreCompleto.fill(nombre);
  }

  async llenarCorreo(correo) {
    await this.correo.fill(correo);
  }

  async llenarContraseña(contraseña) {
    await this.contraseña.fill(contraseña);
  }

  async verificarContraseña(contraseña) {
    await this.verificarContraseña.fill(contraseña);
  }

  async aceptarTerminos() {
    await this.aceptarTerminos.check();
  }

  async crearCuenta() {
    await this.crearCuenta.click();
  }

  async llenarFormularioRegistro(nombre, correo, contraseña, verificarContraseña) {
    await this.llenarNombreCompleto(nombre);
    await this.llenarCorreo(correo);
    await this.llenarContraseña(contraseña);
    await this.verificarContraseña(verificarContraseña);
    await this.aceptarTerminos();
    await this.crearCuenta();
  }
}

export default RegistroPage;
