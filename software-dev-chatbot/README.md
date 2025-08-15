
# 💬 Software Dev Chatbot - Node.js + OpenAI

Bienvenido a **Software Dev Chatbot**, una aplicación interactiva construida con **Node.js**, **Express.js** y **HTML/CSS**, que simula un asistente capaz de responder preguntas técnicas relacionadas con el desarrollo de software 🧑‍💻.

Este proyecto fue diseñado para integrar una API de lenguaje natural (OpenAI GPT-3.5), pero también puede usarse sin conexión a la API, con respuestas simuladas.

---

## 🌟 Funcionalidades Clave

- 🖼️ **Interfaz visual** amigable con campo de entrada, botón de envío y registro de conversación.
- 💬 **Simulación de respuestas** o integración real con OpenAI API.
- 🔧 **Backend Express** para manejar solicitudes y respuestas del usuario.
- 📦 Proyecto modular y fácil de extender o desplegar.
- 🌐 Ideal para practicar integración front-back usando JavaScript puro.

---

## 🧱 Estructura del Proyecto

```
software-dev-chatbot/
├── public/
│   ├── index.html         # Interfaz HTML principal
│   ├── style.css          # Estilos visuales
│   ├── main.js            # Lógica frontend de interacción
│   └── chat.png           # Logo del chatbot
├── server.js              # Servidor Express y rutas de API
├── openai.js              # Módulo de conexión con OpenAI
├── .env                   # Variables de entorno (clave API)
├── .env.example           # Plantilla sin clave para distribución
├── package.json           # Configuración del proyecto
└── README.md              # Documentación del proyecto
```

---

## 🚀 Tecnologías Utilizadas

- ⚙️ Node.js
- 🚀 Express.js
- 🎨 HTML + CSS + JavaScript Vanilla
- 🤖 OpenAI API (GPT-3.5-turbo)
- 🔐 dotenv

---

## ⚙️ Scripts útiles

### Instalar dependencias

```bash
npm install
```

### Ejecutar servidor de desarrollo

```bash
node server.js
```

Accede en: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Modo sin conexión (sin API Key)

Si no deseas usar una API real, puedes comentar la línea que llama a `askGPT()` en `server.js` y reemplazarla por una respuesta falsa:

```js
// const answer = await askGPT(userMessage);
const answer = `Tú dijiste: "${userMessage}"`;
```

Esto te permite seguir probando la interfaz y flujo del chatbot sin costos ni autenticación.

---

## 🌐 Deployment

Este proyecto puede desplegarse fácilmente en servicios como:

- 🔸 [Render](https://render.com/)
- 🔸 [Railway](https://railway.app/)
- 🔸 VPS o servidor personal

Solo asegúrate de configurar la variable `OPENAI_API_KEY` en el entorno de despliegue.

---

## 🧠 Nota personal

> Este proyecto fue creado como parte de un laboratorio práctico de IBM Skills Network.  
> Es ideal para quienes comienzan con Node.js y desean integrar APIs modernas como OpenAI.

---

## 📫 Contacto

Desarrollado por [Alexander Tapia](https://github.com/Katapentakill)  
Sugerencias, forks y contribuciones son bienvenidos 💻✨
