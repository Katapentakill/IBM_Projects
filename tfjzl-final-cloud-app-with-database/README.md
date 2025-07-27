# 🎓 Sistema de Cursos Online con Exámenes - Django

Este proyecto es una **aplicación web completa** construida con Django que permite gestionar cursos online con sistema de exámenes integrado. Los usuarios pueden registrarse, inscribirse en cursos, tomar exámenes y ver sus resultados con retroalimentación detallada.

## 🚀 Descripción General

La plataforma incluye funcionalidades completas para:

- **Gestión de usuarios** con registro, login y logout
- **Cursos con lecciones** organizadas por orden
- **Sistema de inscripciones** para estudiantes
- **Exámenes de opción múltiple** con calificación automática
- **Resultados detallados** con retroalimentación por pregunta
- **Panel administrativo** para gestión de contenido
- **Interfaz responsive** con Bootstrap 4

---

## 🗂️ Estructura del Proyecto

```
tfg-final-cloud-app-with-database/
├── myproject/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── onlinecourse/
│   ├── migrations/
│   ├── templates/onlinecourse/
│   │   ├── course_detail_bootstrap.html
│   │   ├── course_list_bootstrap.html
│   │   ├── exam_result_bootstrap.html
│   │   ├── user_login_bootstrap.html
│   │   └── user_registration_bootstrap.html
│   ├── static/
│   │   └── .gitignore
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── .gitignore
├── LICENSE
├── Procfile
├── README.md
├── manifest.yml
├── requirements.txt
└── runtime.txt
```

---

## ⚙️ Tecnologías Utilizadas

- **Backend**: Python 3.x + Django 4.x
- **Base de datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Frontend**: HTML5 + Bootstrap 4 + JavaScript
- **Autenticación**: Django Auth System
- **Media**: Django ImageField para imágenes de cursos
- **Despliegue**: Preparado para Cloud Foundry/Heroku

---

## 📋 Requisitos e Instalación

### 1. Instalar dependencias

```bash
pip install -r requirements.txt
```

**Contenido de `requirements.txt`:**
```
Django>=4.0,<5.0
Pillow>=8.0.0
gunicorn
psycopg2-binary
whitenoise
```

### 2. Configurar base de datos

```bash
# Crear migraciones para los nuevos modelos
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate
```

### 3. Crear superusuario

```bash
python manage.py createsuperuser
```

### 4. Ejecutar servidor de desarrollo

```bash
python manage.py runserver
```

La aplicación estará disponible en `http://127.0.0.1:8000/onlinecourse/`

---

## 🗄️ Modelos de Base de Datos

### Modelos Principales:

- **Course**: Información del curso (nombre, descripción, imagen, instructores)
- **Lesson**: Lecciones individuales dentro de cada curso
- **Enrollment**: Registro de inscripción usuario-curso
- **Question**: Preguntas de examen vinculadas a cursos
- **Choice**: Opciones de respuesta para cada pregunta
- **Submission**: Envíos de examen de los estudiantes
- **Instructor**: Perfil de instructores
- **Learner**: Perfil de estudiantes

### Relaciones Clave:
- `Course` ↔ `User` (Many-to-Many through `Enrollment`)
- `Question` → `Course` (ForeignKey)
- `Choice` → `Question` (ForeignKey)
- `Submission` → `Enrollment` (ForeignKey)
- `Submission` ↔ `Choice` (Many-to-Many)

---

## 🌐 Funcionalidades Web

### URLs Principales:

- `/onlinecourse/` - Lista de cursos disponibles
- `/onlinecourse/registration/` - Registro de usuarios
- `/onlinecourse/login/` - Inicio de sesión
- `/onlinecourse/<course_id>/` - Detalle del curso y examen
- `/onlinecourse/<course_id>/enroll/` - Inscripción en curso
- `/onlinecourse/<course_id>/submit/` - Envío de examen
- `/onlinecourse/<course_id>/submission/<submission_id>/result/` - Resultados

### Flujo de Usuario:

1. **Registro/Login** → Crear cuenta o iniciar sesión
2. **Explorar cursos** → Ver lista de cursos disponibles
3. **Inscribirse** → Enrollarse en cursos de interés
4. **Estudiar** → Acceder a lecciones del curso
5. **Tomar examen** → Responder preguntas de opción múltiple
6. **Ver resultados** → Revisar calificación y retroalimentación

---

## 🔧 Panel de Administración

Accede en `/admin/` con credenciales de superusuario para:

### Gestión de Contenido:
- ✅ **Cursos** con lecciones y preguntas inline
- ✅ **Preguntas** con opciones de respuesta inline
- ✅ **Instructores y estudiantes**
- ✅ **Inscripciones y envíos de examen**

### Configuración Recomendada:
1. Crear **Instructores** primero
2. Crear **Cursos** asignando instructores
3. Agregar **Lecciones** ordenadas
4. Crear **Preguntas de examen** con opciones
5. Marcar **respuestas correctas** en las opciones

---

## 🧪 Sistema de Exámenes

### Características:
- **Preguntas de opción múltiple** por curso
- **Calificación automática** basada en respuestas correctas
- **Puntaje mínimo del 80%** para aprobar
- **Retroalimentación detallada** por pregunta
- **Posibilidad de retomar** exámenes fallidos

### Lógica de Calificación:
```python
# Cálculo automático del puntaje
total_score = sum(question.grade for question in correct_answers)
total_possible = sum(question.grade for question in all_questions)
grade_percentage = (total_score / total_possible) * 100
```

---

## 🚀 Despliegue

### Configuración para Cloud Foundry:
```yaml
# manifest.yml
applications:
- name: onlinecourse-app
  memory: 128M
  buildpack: python_buildpack
  command: gunicorn myproject.wsgi
```

### Variables de Entorno Necesarias:
```bash
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://...
```

---

## 🛡️ Seguridad y Buenas Prácticas

- ✅ **CSRF Protection** habilitado en todos los formularios
- ✅ **Autenticación requerida** para inscripciones y exámenes
- ✅ **Validación de datos** en modelos y vistas
- ✅ **Manejo de errores** con mensajes informativos
- ✅ **Permisos de usuario** correctamente implementados

---

## 🎯 Comandos Rápidos de Desarrollo

```bash
# Resetear base de datos
python manage.py flush

# Crear datos de ejemplo
python manage.py shell
>>> from django.contrib.auth.models import User
>>> from onlinecourse.models import *

# Ejecutar pruebas
python manage.py test

# Colectar archivos estáticos
python manage.py collectstatic

# Crear respaldo de BD
python manage.py dumpdata > backup.json
```

---

## 📚 Próximas Mejoras

- [ ] Sistema de certificados automáticos
- [ ] Integración con pasarelas de pago
- [ ] Dashboard de progreso del estudiante
- [ ] Sistema de calificaciones por instructores
- [ ] API REST para acceso móvil
- [ ] Notificaciones por email

---

## 👨‍💻 Autor

**Katapentakill**  
Desarrollador Full Stack  
[GitHub Profile](https://github.com/Katapentakill)

---

## 📜 Licencia

Este proyecto fue desarrollado con fines educativos.  
Licencia MIT - Ver archivo `LICENSE` para más detalles.