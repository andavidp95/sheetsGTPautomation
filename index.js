const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

// Ruta principal para recibir solicitudes
app.post('/run', async (req, res) => {
  const { prompt } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true, // Cambia a false para depuración
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://chat.openai.com/');

    await page.waitForSelector('textarea');
    await page.type('textarea', prompt);
    await page.keyboard.press('Enter');

    await page.waitForTimeout(5000); // Esperar a que se cargue la respuesta
    await browser.close();

    res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
