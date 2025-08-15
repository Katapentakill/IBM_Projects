require('dotenv').config();               // ← Lee .env
const express  = require('express');
const path     = require('path');
const { askGPT } = require('./openai');

const app  = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// Endpoint de chat
app.post('/getChatbotResponse', async (req, res) => {
  try {
    const { userMessage } = req.body;
    const answer = await askGPT(userMessage);
    res.json({ chatbotResponse: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ chatbotResponse: 'Error interno 😢' });
  }
});

app.listen(port, () => console.log(`✔️  Server ready on http://localhost:${port}`));
