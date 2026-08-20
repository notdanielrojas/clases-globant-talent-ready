import {test, expect} from '@playwright/test';
import RegistroPage from './pages/RegisterPage';

let registroPage;

test.describe('Registro de usuario', () => {

    test.beforeEach(async ({page}) => {
        registroPage = new RegistroPage(page);
    });

    test('Registro con datos válidos', async ({page}) => {
        await registroPage.navegar();
        await registroPage.llenarFormularioRegistro('Daniel Rojas', 'notdanielrojas@gmail.com', 'cinematest', 'cinematest');
        await expect(page.getByText('Logout', {exact: true})).toHaveText('Logout');
    });
});