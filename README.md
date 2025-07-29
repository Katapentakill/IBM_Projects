# 💼 IBM Projects Repository

Este repositorio contiene múltiples proyectos desarrollados como parte del programa **IBM Full Stack Developer Professional Certificate** a través de IBM Skills Network.

Cada subcarpeta representa un proyecto práctico y funcional enfocado en distintos aspectos del desarrollo backend, frontend y análisis con IA, incluyendo REST APIs con Express, aplicaciones React, sistemas web con Django, procesamiento de lenguaje natural con IBM Watson, arquitecturas de microservicios, y orquestación con Kubernetes.

---

## 📁 Estructura de carpetas en este repositorio

```
IBM_Projects/
├── Microservice/                       # Evaluación de Concesionarios - Microservicios con Docker
├── e-plantShopping/                    # React + Vite shopping app (Paradise Nursery)
├── expressBookReviews/                 # Node.js + Express API para reseñas de libros
├── guestbook/                          # Kubernetes Guestbook App con autoescalado
├── oaqjp-final-project-emb-ai/         # Detección de emociones con Flask + IBM Watson NLU
└── tfg-final-cloud-app-with-database/  # Sistema de cursos online con Django + exámenes
```

---

## 📁 Proyectos Incluidos

### 🚗 1. Evaluación de Concesionarios - Microservicios (`/Microservice`)

> Sistema de evaluación de concesionarios basado en arquitectura de microservicios desplegada localmente con Docker Desktop.

Una aplicación distribuida que integra múltiples servicios independientes para gestionar productos, concesionarios y precios, demostrando principios de arquitectura de microservicios, containerización y comunicación entre servicios.

**Características principales:**
- 🔧 **Microservicio de Productos**: API Flask en Python para gestión de productos
- 🏪 **Microservicio de Concesionarios**: API Express en Node.js para dealers y precios
- 🎨 **Frontend Flask**: Template HTML servido por Flask con Nginx
- 🐳 **Containerización completa**: Cada servicio en su propio contenedor Docker
- 🔗 **Comunicación entre servicios**: APIs RESTful independientes
- 📊 **Interfaz integrada**: Dropdown de productos con precios por concesionario

**Tecnologías utilizadas:**
- 🐍 **Backend Productos**: Python + Flask (Puerto 5000)
- 🟢 **Backend Concesionarios**: Node.js + Express (Puerto 8080)
- 🎨 **Frontend**: Python + Flask + HTML Templates + Nginx (Puerto 5001)
- 🐳 **Contenedores**: Docker Desktop + docker-compose
- 🌐 **Arquitectura**: RESTful microservices pattern

**Flujo de despliegue:**
1. Clone de repositorios → Build de imágenes Docker → Deploy de contenedores → Verificación de servicios → Testing de integración

- 📦 Tecnologías: Docker, Flask, Express, Nginx, Microservices Architecture
- 📄 Documentación completa con comandos Docker en su `README.md`

---

### 📚 2. Express Book Reviews (`/expressBookReviews`)

> Proyecto final del curso **"Developing APIs with Node.js and Express"**

Una API REST para la gestión de reseñas de libros, con autenticación JWT, sesiones, operaciones CRUD, promesas y async/await.

- 📦 Tecnologías: Node.js, Express, JWT, express-session
- ▶️ Instrucciones de ejecución local incluidas en su `README.md`

---

### 🪴 3. Paradise Nursery - React Shopping App (`/e-plantShopping`)

> Aplicación de tienda de plantas construida con React, Redux Toolkit y Vite.

Un e-commerce SPA con carrito de compras, manejo de estado con Redux, categorías de plantas, navegación entre vistas, y despliegue en Vercel.

- ⚛️ Tecnologías: React, Redux Toolkit, Vite
- 🌐 Deployment: [ibm-projects.vercel.app](https://ibm-projects.vercel.app)
- 🧾 Más información en su `README.md`

---

### 📓 4. Guestbook App - Kubernetes Deployment (`/guestbook`)

> Aplicación de libro de visitas desplegada en Kubernetes con autoescalado, rollback y gestión de imágenes Docker.

Una aplicación completa desarrollada en Go con frontend responsivo, desplegada en clúster Kubernetes con integración a IBM Cloud Container Registry, incluyendo componentes Redis para persistencia y características avanzadas de orquestación.

**Características principales:**
- 🐹 **Backend robusto**: Aplicación en Go con manejo de sesiones y persistencia
- 🎨 **Frontend responsive**: HTML5 + CSS3 + jQuery con diseño moderno
- 🐳 **Containerización**: Docker multi-stage builds optimizados
- ⚙️ **Orquestación**: Kubernetes con deployments, services y secrets
- 📈 **Autoescalado**: Horizontal Pod Autoscaler (HPA) basado en CPU
- 🔄 **Rollback automático**: Gestión de versiones con kubectl rollout
- 🗄️ **Persistencia**: Integración Redis master-slave para datos
- ☁️ **Cloud Registry**: Imágenes gestionadas en IBM Cloud Container Registry

**Tecnologías utilizadas:**
- 🐹 **Backend**: Go (Golang) 1.18+
- 🎨 **Frontend**: HTML5 + CSS3 + jQuery
- 🐳 **Contenedores**: Docker + Docker Desktop con Kubernetes
- ☸️ **Orquestación**: Kubernetes (deployments, services, HPA)
- 🗄️ **Base de datos**: Redis (master-slave configuration)
- ☁️ **Registry**: IBM Cloud Container Registry
- 🧪 **Load Testing**: BusyBox para pruebas de escalado

**Flujo de despliegue:**
1. Build de imágenes Docker → Push a IBM Cloud Registry → Deploy en Kubernetes → Configurar autoescalado → Testing de carga → Rollback si es necesario

- 📄 Documentación completa con comandos step-by-step en su `README.md`

---

### 🧠 5. Emotion Detection App (`/oaqjp-final-project-emb-ai`)

> Aplicación web de detección de emociones usando IBM Watson Natural Language Understanding (NLU).

Permite analizar texto ingresado por el usuario e identificar la emoción dominante (alegría, tristeza, miedo, disgusto o ira), integrando una API de Flask con frontend dinámico en JavaScript y backend conectado a Watson NLU.

- 🤖 Tecnologías: Python, Flask, IBM Watson NLU, JavaScript, Bootstrap
- 💻 Interfaz: Web interactiva + API
- 🧪 Pruebas unitarias: Incluidas con `unittest`
- 📄 Detalles completos en su `README.md`

---

### 🎓 6. Sistema de Cursos Online (`/tfg-final-cloud-app-with-database`)

> Plataforma web completa de educación online con sistema de exámenes integrado construida con Django.

Una aplicación web full-stack que permite gestionar cursos, inscripciones de estudiantes, lecciones organizadas y exámenes de opción múltiple con calificación automática y retroalimentación detallada.

**Características principales:**
- 👥 **Gestión de usuarios**: Registro, login, perfiles de estudiantes e instructores
- 📚 **Cursos con lecciones**: Contenido organizado por orden y temas
- 📝 **Sistema de exámenes**: Preguntas de opción múltiple con calificación automática
- 📊 **Resultados detallados**: Retroalimentación por pregunta y puntaje general
- 🔐 **Panel administrativo**: Gestión completa de contenido desde Django Admin
- 📱 **Interfaz responsive**: Bootstrap 4 para experiencia móvil optimizada

**Tecnologías utilizadas:**
- 🐍 **Backend**: Python + Django 4.x
- 🗄️ **Base de datos**: SQLite (desarrollo) / PostgreSQL (producción)
- 🎨 **Frontend**: HTML5 + Bootstrap 4 + JavaScript
- 🔐 **Autenticación**: Django Auth System integrado
- ☁️ **Despliegue**: Preparado para Cloud Foundry/Heroku

**Flujo de usuario:**
1. Registro/Login → Inscripción en cursos → Estudio de lecciones → Examen final → Resultados con retroalimentación

- 📄 Documentación completa y comandos en su `README.md`

---

## 📌 Propósito

Este repositorio agrupa proyectos educativos y prácticos realizados durante la certificación de IBM para reforzar habilidades en:

- **Backend Development**: APIs RESTful (Express.js), aplicaciones web full-stack (Django), microservicios (Go, Python, Node.js)
- **Frontend Development**: SPAs modernas con React, interfaces responsivas con Bootstrap
- **Arquitecturas Distribuidas**: Microservicios, comunicación entre servicios, containerización
- **Bases de datos**: Modelado relacional, NoSQL (Redis), migraciones, administración de contenido
- **Autenticación y seguridad**: JWT, sesiones, CSRF protection, validación de datos
- **Inteligencia Artificial**: Análisis de lenguaje natural (NLP) con IBM Watson
- **Gestión del estado**: Redux Toolkit para aplicaciones complejas
- **DevOps y Orquestación**: Docker, Kubernetes, autoescalado, rollback, CI/CD
- **Cloud Computing**: IBM Cloud services, Container Registry, despliegue en la nube

---

## 🛠️ Stack Tecnológico General

| Categoría | Tecnologías |
|-----------|-------------|
| **Backend** | Node.js, Express.js, Python, Django, Flask, Go (Golang) |
| **Frontend** | React, Redux Toolkit, HTML5, CSS3, Bootstrap 4, JavaScript ES6+, jQuery |
| **Bases de datos** | SQLite, PostgreSQL, Redis |
| **IA/ML** | IBM Watson NLU, Natural Language Processing |
| **Autenticación** | JWT, Django Auth, express-session |
| **DevOps** | Docker, Kubernetes, IBM Cloud Container Registry |
| **Arquitectura** | Microservices, RESTful APIs, Container Orchestration |
| **Herramientas** | Vite, npm, pip, Django Admin, kubectl, Docker Desktop |
| **Despliegue** | Vercel, Cloud Foundry, Heroku, IBM Cloud, Nginx |

---

## 🧠 Nota personal

> Cada proyecto aquí incluido fue desarrollado con el objetivo de aprender, aplicar buenas prácticas y preparar soluciones funcionales listas para despliegue o integración en proyectos más grandes. El portafolio demuestra capacidades full-stack desde APIs hasta interfaces de usuario complejas, análisis con IA, arquitecturas de microservicios, y orquestación de contenedores con Kubernetes.

---

## 👤 Autor

**Katapentakill**  
Full Stack Developer | IBM Certified | DevOps Enthusiast  
[GitHub Profile](https://github.com/Katapentakill)

---

## 📜 Licencia

Proyectos con fines educativos. Basados en contenidos de IBM Skills Network.  
Licencia MIT para uso académico y profesional.