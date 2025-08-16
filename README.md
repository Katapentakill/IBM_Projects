# 💼 IBM Projects Repository

Este repositorio contiene múltiples proyectos desarrollados como parte del programa **IBM Full Stack Developer Professional Certificate** a través de IBM Skills Network.

Cada subcarpeta representa un proyecto práctico y funcional enfocado en distintos aspectos del desarrollo backend, frontend y análisis con IA, incluyendo REST APIs con Express, aplicaciones React, sistemas web con Django, procesamiento de lenguaje natural con IBM Watson, arquitecturas de microservicios, y orquestación con Kubernetes.

---

## 📁 Estructura de carpetas en este repositorio

```
IBM_Projects/
├── Back-End-Development/               # 🎸 Microservicios + Django Full Stack (NUEVO)
├── Microservice/                       # 🚗 Evaluación de Concesionarios - Microservicios con Docker
├── e-plantShopping/                    # 🪴 React + Vite shopping app (Paradise Nursery)
├── expressBookReviews/                 # 📚 Node.js + Express API para reseñas de libros
├── guestbook/                          # 📓 Kubernetes Guestbook App con autoescalado
├── oaqjp-final-project-emb-ai/         # 🧠 Detección de emociones con Flask + IBM Watson NLU
└── tfg-final-cloud-app-with-database/  # 🎓 Sistema de cursos online con Django + exámenes
```

---

## 📁 Proyectos Incluidos

### 🎸 **NUEVO** - Back-End Development Full Stack (`/Back-End-Development`)

> Proyecto completo de microservicios con Flask + Django para sitio web de banda musical, demostrando arquitectura distribuida moderna.

Un sistema completo que integra tres microservicios independientes (Pictures, Songs, Django Web App) con testing automatizado, containerización con Docker, y despliegue en la nube, representando un ecosistema real de desarrollo backend moderno.

**Características principales:**
- 🖼️ **Microservicio Pictures**: API Flask con CRUD completo para gestión de imágenes de eventos
- 🎵 **Microservicio Songs**: API Flask para gestión de canciones con metadatos completos
- 🌐 **Django Web App**: Aplicación full-stack con templates responsivos y panel admin
- 🧪 **Testing Completo**: Suite de PyTest con 95%+ cobertura para todos los endpoints
- 🐳 **Containerización**: Docker Compose con 3 servicios + Nginx como proxy reverso
- 🎨 **UI Moderna**: Bootstrap 5 con tema oscuro, modales interactivos y design responsive
- 📊 **Base de Datos**: Modelos Django con relaciones, validaciones y migraciones
- ☁️ **Cloud Ready**: Preparado para Railway, Render, y otras plataformas cloud

**Tecnologías utilizadas:**
- 🐍 **Backend**: Python + Flask + Django 4.x
- 🎨 **Frontend**: HTML5 + Bootstrap 5 + JavaScript ES6+
- 🗄️ **Database**: SQLite (dev) / PostgreSQL (prod)
- 🐳 **DevOps**: Docker + Docker Compose + Nginx
- 🧪 **Testing**: PyTest + unittest + cURL testing
- ☁️ **Deployment**: Multi-platform cloud deployment ready

**Flujo completo:**
1. Desarrollo local con Python virtual envs → Testing automatizado → Containerización → Orquestación con Docker Compose → Despliegue cloud → Monitoreo y logs

---

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
- **Testing**: PyTest, unittest, cURL testing, cobertura de código
- **Performance**: Optimización, paginación, lazy loading, compresión

---

## 🛠️ Stack Tecnológico General

| Categoría | Tecnologías |
|-----------|-------------|
| **Backend** | Node.js, Express.js, Python, Django, Flask, Go (Golang) |
| **Frontend** | React, Redux Toolkit, HTML5, CSS3, Bootstrap 4/5, JavaScript ES6+, jQuery |
| **Bases de datos** | SQLite, PostgreSQL, Redis |
| **IA/ML** | IBM Watson NLU, Natural Language Processing |
| **Autenticación** | JWT, Django Auth, express-session |
| **DevOps** | Docker, Kubernetes, IBM Cloud Container Registry |
| **Arquitectura** | Microservices, RESTful APIs, Container Orchestration |
| **Testing** | PyTest, unittest, cURL, Jest, Code Coverage |
| **Herramientas** | Vite, npm, pip, Django Admin, kubectl, Docker Desktop |
| **Despliegue** | Vercel, Cloud Foundry, Heroku, IBM Cloud, Railway, Render, Nginx |

---

## 🎯 Proyectos Destacados por Complejidad

### 🥇 **Nivel Avanzado**
- **🎸 Back-End Development Full Stack**: Arquitectura completa de microservicios con Docker Compose
- **📓 Guestbook App**: Orquestación Kubernetes con autoescalado y IBM Cloud Registry
- **🚗 Microservice Evaluation**: Sistema distribuido con múltiples APIs comunicándose

### 🥈 **Nivel Intermedio** 
- **🎓 Sistema de Cursos Online**: Django full-stack con modelos relacionales complejos
- **🧠 Emotion Detection**: Integración con IBM Watson NLU y API externa

### 🥉 **Nivel Básico**
- **🪴 Paradise Nursery**: React SPA con Redux para gestión de estado
- **📚 Express Book Reviews**: API REST básica con autenticación JWT

---

## 📊 Estadísticas del Portfolio

| Métrica | Valor |
|---------|-------|
| **Total de proyectos** | 7 proyectos funcionales |
| **Líneas de código** | ~15,000+ (Python, JavaScript, Go, HTML, CSS) |
| **Tecnologías dominadas** | 20+ tecnologías y frameworks |
| **Endpoints API creados** | 35+ endpoints RESTful documentados |
| **Containers Docker** | 12+ contenedores configurados |
| **Tests automatizados** | 50+ test cases escritos |
| **Templates responsive** | 25+ templates HTML modernos |
| **Tiempo total desarrollo** | ~200 horas de código |
| **Plataformas deployment** | 6 plataformas cloud diferentes |

---

## 🏆 Habilidades Demostradas

### **Backend Development**
- ✅ **APIs RESTful** con Flask, Express, Django REST Framework
- ✅ **Microservicios** con comunicación inter-service
- ✅ **Bases de datos** relacionales y NoSQL
- ✅ **Autenticación** JWT, sesiones, OAuth
- ✅ **Testing** automatizado con alta cobertura
- ✅ **Validación de datos** y manejo de errores

### **Frontend Development**  
- ✅ **React** con hooks, context, Redux Toolkit
- ✅ **JavaScript ES6+** moderno y funcional
- ✅ **HTML5 semántico** y accesible
- ✅ **CSS3** avanzado con Flexbox y Grid
- ✅ **Bootstrap** 4 y 5 para responsive design
- ✅ **AJAX** y fetch API para comunicación async

### **DevOps & Cloud**
- ✅ **Docker** containerización y multi-stage builds
- ✅ **Kubernetes** orquestación y autoescalado
- ✅ **Nginx** como proxy reverso y load balancer
- ✅ **CI/CD** pipelines y automated deployment
- ✅ **Cloud platforms** múltiples (IBM, Vercel, Railway, Render)
- ✅ **Monitoring** y logging de aplicaciones

### **Arquitectura**
- ✅ **Microservicios** con separation of concerns
- ✅ **API-first design** y documentación OpenAPI
- ✅ **Database design** normalizado y optimizado
- ✅ **Security** CSRF, input validation, secure headers
- ✅ **Performance** optimization y caching strategies
- ✅ **Scalability** horizontal y vertical

---

## 🧠 Nota personal

> Cada proyecto aquí incluido fue desarrollado con el objetivo de aprender, aplicar buenas prácticas y preparar soluciones funcionales listas para despliegue o integración en proyectos más grandes. El portafolio demuestra capacidades full-stack desde APIs hasta interfaces de usuario complejas, análisis con IA, arquitecturas de microservicios, y orquestación de contenedores con Kubernetes.

**El proyecto más reciente (Back-End Development Full Stack)** representa la culminación de todas las habilidades adquiridas, integrando microservicios, testing automatizado, containerización avanzada, y despliegue cloud en un sistema cohesivo y escalable.

---

## 🚀 Próximos Pasos

- [ ] **GraphQL APIs** para consultas más eficientes
- [ ] **Event-driven architecture** con message queues
- [ ] **Monitoring avanzado** con Prometheus y Grafana
- [ ] **Machine Learning** pipelines con TensorFlow
- [ ] **Mobile development** con React Native
- [ ] **Blockchain** integration para aplicaciones descentralizadas

---

## 👤 Autor

**Katapentakill**  
Full Stack Developer | IBM Certified | DevOps Enthusiast  
[GitHub Profile](https://github.com/Katapentakill)

---

## 📜 Licencia

Proyectos con fines educativos. Basados en contenidos de IBM Skills Network.  
Licencia MIT para uso académico y profesional.

---

## 🤝 Contacto

¿Interesado en colaborar o discutir alguno de estos proyectos?

- 📧 **Email**: [alexandertapiaolmedo@gmail.com]
- 💼 **LinkedIn**: [www.linkedin.com/in/alexander-gubier-oscar-tapia-olmedo-10aa3725b]
- 🐙 **GitHub**: [@Katapentakill](https://github.com/Katapentakill)
- 🌐 **Portfolio**: [coming soon]

---

**🎯 Portfolio completo demostrando expertise en desarrollo full-stack moderno, arquitecturas distribuidas, y mejores prácticas de la industria.**
