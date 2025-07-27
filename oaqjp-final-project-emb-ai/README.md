# 🧠 Emotion Detection App - IBM Watson NLU

Este proyecto forma parte del programa **IBM Full Stack Developer Professional Certificate**. Su objetivo es construir una aplicación web capaz de detectar emociones en texto utilizando la API de **IBM Watson Natural Language Understanding (NLU)**.

## 🚀 Descripción General

La aplicación recibe texto del usuario, lo envía al servicio de Watson NLU y retorna un análisis emocional detallado, incluyendo:

- Nivel de **anger**, **disgust**, **fear**, **joy**, **sadness**
- La **emoción dominante**
- Manejo de errores y validación de entrada
- Interfaz web integrada con HTML + JS

---

## 🗂️ Estructura del Proyecto

```
oaqjp-final-project-emb-ai/
├── EmotionDetection/
│   ├── __init__.py
│   └── emotion_detection.py
├── static/
│   └── mywebscript.js
├── templates/
│   └── index.html
├── test_emotion_detection.py
├── server.py
├── .env
├── README.md
└── LICENSE
```

---

## ⚙️ Tecnologías Utilizadas

- Python 3.10+
- Flask
- IBM Watson NLU (via SDK)
- JavaScript (XMLHttpRequest)
- HTML5 + Bootstrap 4
- Unittest para pruebas automáticas

---

## 🧪 Pruebas Unitarias

Las pruebas están implementadas en `test_emotion_detection.py` y verifican que el sistema detecte correctamente emociones como **joy**, **anger**, **sadness**, etc.

Ejecuta con:

```bash
python -m unittest test_emotion_detection.py
```

---

## 🌐 Aplicación Web

Accede a la interfaz web en `http://localhost:5000/` tras iniciar Flask:

```bash
python server.py
```

En el navegador podrás ingresar texto y ver el análisis emocional generado dinámicamente por JavaScript.

---

## 🧩 Funcionalidades Clave

- ✅ Análisis emocional con IBM Watson NLU
- ✅ Frontend reactivo con JS
- ✅ Detección de errores (400 / 500) con mensajes personalizados
- ✅ Modularización del código
- ✅ Empaquetado en carpeta `EmotionDetection/`
- ✅ Despliegue con Flask

---

## 🛡️ Seguridad y Buenas Prácticas

- Uso de variables de entorno (`.env`) para proteger las credenciales (`IBM_NLU_API_KEY`, `IBM_NLU_URL`)
- Manejo de errores y respuestas limpias en caso de entrada vacía o fallos de API

---

## 👨‍💻 Autor

**Katapentakill**  
Estudiante IBM Skills Network  
[GitHub Profile](https://github.com/Katapentakill)

---

## 📜 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso de IBM.  
Licencia MIT.
