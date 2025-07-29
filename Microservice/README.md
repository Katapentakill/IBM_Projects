# 🚗 Evaluación de Concesionarios – Microservicios Locales con Docker

Bienvenido al proyecto de Evaluación de Concesionarios, una aplicación basada en **microservicios** desplegada localmente mediante **Docker Desktop**.  
El sistema integra una interfaz web Flask con dos microservicios de backend (Python y Node.js) para gestionar productos, concesionarios y precios.

---

## 🌟 Funcionalidades Clave

### 🔧 Microservicio de Productos (Python - Flask)
- `GET /products` → Lista de productos disponibles
- Puerto: `5000`

### 🔧 Microservicio de Concesionarios (Node.js - Express)
- `GET /dealers/<product_id>` → Concesionarios que venden un producto
- `GET /price/<dealer_id>` → Precio de un producto ofrecido por un concesionario
- Puerto: `8080`

### 🎨 Frontend (Flask + HTML Templates)
- Interfaz web con templates HTML para seleccionar productos y ver precios por concesionario
- Servido por Flask con contenedor Nginx
- Puerto: `5001`

---

## 🧱 Estructura del Proyecto

```
IBM/
└── Microservice/
    └── Dealer/
        ├── dealer_evaluation_backend/
        │   ├── products_list/        # Flask - Microservicio de Productos
        │   └── dealer_details/       # Node.js - Microservicio de Concesionarios
        └── dealer_evaluation_frontend/
            └── html/                 # Frontend Flask + HTML Templates
                ├── app.py           # Aplicación Flask
                ├── templates/       # Templates HTML
                │   └── index.html
                └── static/          # Archivos estáticos (CSS, JS)
                    └── script.js
```

---

## 🚀 Guía de Despliegue

### 1. Clonar los repositorios

```bash
git clone https://github.com/ibm-developer-skills-network/dealer_evaluation_backend.git
git clone https://github.com/ibm-developer-skills-network/dealer_evaluation_frontend.git
```

### 2. Backend – Productos (Flask)

```bash
cd dealer_evaluation_backend/products_list
docker build -t prodlist .
docker run -d -p 5000:5000 --name prodlist prodlist
```

### 3. Backend – Concesionarios (Node.js)

```bash
cd ../dealer_details
docker build -t dealerdetails .
docker run -d -p 8080:8080 --name dealerdetails dealerdetails
```

### 4. Frontend – Flask + Nginx

```bash
cd ../../dealer_evaluation_frontend/html
docker build -t frontend .
docker run -d -p 5001:80 --name frontend frontend
```

**Nota**: El frontend utiliza Flask con templates HTML para renderizar la interfaz, servido a través de Nginx dentro del contenedor.

---

## 📸 Capturas de Pantalla Requeridas

| Archivo                          | Descripción                                                         |
|----------------------------------|----------------------------------------------------------------------|
| `product_details_deploy.png`     | Contenedor `prodlist` corriendo (`docker ps`)                       |
| `dealer_details_deploy.png`      | Contenedor `dealerdetails` corriendo                                |
| `git_clone.png`                  | Clonación del frontend (`git clone`)                                |
| `index_urlchanges.png`           | Templates HTML con URLs a localhost                                 |
| `frontend_deploy.png`            | Contenedor `frontend` activo                                        |
| `homepage.png`                   | Productos visibles en dropdown                                      |
| `product_dealer.png`             | Concesionarios listados por producto                                |
| `product_dealer_price.png`       | Precio mostrado de un concesionario específico                      |
| `product_all_dealers_prices.png` | Todos los precios mostrados para un producto con múltiples dealers  |

---

## 🔍 Verificación de Servicios

```bash
# Verificar contenedores activos
docker ps

# Ver logs de cada servicio
docker logs prodlist
docker logs dealerdetails  
docker logs frontend
```

**Acceso a la aplicación:**  
Abrir el navegador en: [http://localhost:5001](http://localhost:5001)

---

## 🏗️ Arquitectura de Microservicios

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Products      │    │   Dealers       │
│   Flask + HTML  │────│   Microservice  │────│   Microservice  │
│   Port: 5001    │    │   Port: 5000    │    │   Port: 8080    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                               │
                    ┌─────────────────┐
                    │   Docker        │
                    │   Network       │
                    └─────────────────┘
```

### Comunicación entre Servicios:
1. **Frontend Flask** → Solicita lista de productos → **Products API**
2. **Frontend Flask** → Consulta concesionarios por producto → **Dealers API**  
3. **Frontend Flask** → Obtiene precios por concesionario → **Dealers API**
4. **Templates HTML** → Renderizan datos dinámicamente con JavaScript

---

## 🛑 Detener y Limpiar Contenedores

```bash
# Detener contenedores
docker stop prodlist dealerdetails frontend

# Eliminar contenedores
docker rm prodlist dealerdetails frontend

# Eliminar imágenes (opcional)
docker rmi prodlist dealerdetails frontend
```

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Puerto | Función |
|------------|------------|--------|---------|
| **Frontend** | Flask + HTML Templates + Nginx | 5001 | Interfaz de usuario |
| **Products API** | Python + Flask | 5000 | Gestión de productos |
| **Dealers API** | Node.js + Express | 8080 | Gestión de concesionarios y precios |
| **Containerización** | Docker Desktop | - | Orquestación de servicios |

---

## 📌 Créditos

Adaptado del proyecto IBM Developer Skills Network para práctica local con Docker y arquitectura de microservicios.

---

## 📫 Contacto

Desarrollado por [Katapentakill](https://github.com/Katapentakill) como parte del programa IBM Full Stack Developer Professional Certificate.