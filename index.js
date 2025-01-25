const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

// Ruta para recibir solicitudes desde Google Sheets
app.post('/run', async (req, res) => {
  const { prompt } = req.body; // Recibe el contenido de la celda
  try {
    // Configuración de Puppeteer
    const browser = await puppeteer.launch({
      headless: false, // Cambiar a true si no quieres ver el navegador
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necesario en Railway
    });
    const page = await browser.newPage();

    // Abrir ChatGPT
    await page.goto('https://chat.openai.com/');

    // Esperar a que la página cargue
    await page.waitForSelector('textarea');

    // Escribir el mensaje en el chat
    await page.type('textarea', prompt);
    await page.keyboard.press('Enter'); // Simular presionar Enter

    // Opcional: Esperar unos segundos para verificar
    await page.waitForTimeout(5000);

    // Cerrar el navegador
    await browser.close();

    res.json({ success: true, message: 'Mensaje enviado a ChatGPT' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
