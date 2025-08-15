@echo off
echo 🎸 Configurando proyecto Back-End Development Full Stack...

REM Crear estructura de directorios
echo 📁 Creando estructura de directorios...

REM Directorio principal
mkdir Back-End-Development 2>nul
cd Back-End-Development

REM Módulo 1 - Pictures Service
echo 🖼️  Creando servicio Pictures...
mkdir Back-End-Development-Pictures\tests 2>nul
cd Back-End-Development-Pictures

REM Crear app.py del servicio Pictures
(
echo from flask import Flask, jsonify, request
echo from datetime import datetime
echo import uuid
echo.
echo app = Flask^(__name__^)
echo.
echo # Datos simulados para las imágenes
echo pictures_data = [
echo     {
echo         "id": str^(uuid.uuid4^(^)^),
echo         "pic_url": f"https://picsum.photos/200/300?random={i}",
echo         "event_country": ["USA", "Spain", "Japan", "Brazil", "France"][i %% 5],
echo         "event_state": ["California", "Madrid", "Tokyo", "São Paulo", "Paris"][i %% 5],
echo         "event_city": ["Los Angeles", "Madrid", "Tokyo", "São Paulo", "Paris"][i %% 5],
echo         "event_date": f"2024-0{^(i %% 9^) + 1}-{10 + i}",
echo         "created_at": datetime.now^(^).isoformat^(^),
echo         "updated_at": datetime.now^(^).isoformat^(^)
echo     }
echo     for i in range^(10^)
echo ]
echo.
echo @app.route^('/health', methods=['GET']^)
echo def health^(^):
echo     """Endpoint para verificar el estado del servicio"""
echo     return jsonify^({
echo         "status": "OK",
echo         "service": "Pictures Service",
echo         "timestamp": datetime.now^(^).isoformat^(^)
echo     }^), 200
echo.
echo @app.route^('/count', methods=['GET']^)
echo def count^(^):
echo     """Endpoint para obtener el número total de imágenes"""
echo     return jsonify^({
echo         "count": len^(pictures_data^)
echo     }^), 200
echo.
echo @app.route^('/pictures', methods=['GET']^)
echo def get_pictures^(^):
echo     """Endpoint para obtener todas las imágenes"""
echo     return jsonify^({
echo         "pictures": pictures_data,
echo         "total": len^(pictures_data^)
echo     }^), 200
echo.
echo if __name__ == '__main__':
echo     app.run^(debug=True, host='0.0.0.0', port=5000^)
) > app.py

REM Crear requirements.txt
(
echo Flask==2.3.3
echo pytest==7.4.2
echo pytest-flask==1.2.0
echo Werkzeug==2.3.7
echo uuid==1.30
) > requirements.txt

REM Crear Dockerfile
(
echo # Usar imagen base oficial de Python
echo FROM python:3.10-slim
echo.
echo # Establecer directorio de trabajo
echo WORKDIR /app
echo.
echo # Copiar archivo de requirements
echo COPY requirements.txt .
echo.
echo # Instalar dependencias
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo # Copiar código fuente
echo COPY . .
echo.
echo # Exponer puerto 5000
echo EXPOSE 5000
echo.
echo # Variables de entorno
echo ENV FLASK_APP=app.py
echo ENV FLASK_ENV=production
echo.
echo # Comando para ejecutar la aplicación
echo CMD ["python", "app.py"]
) > Dockerfile

REM Crear test básico
(
echo import pytest
echo import json
echo from app import app
echo.
echo @pytest.fixture
echo def client^(^):
echo     """Fixture para crear un cliente de prueba"""
echo     app.config['TESTING'] = True
echo     with app.test_client^(^) as client:
echo         yield client
echo.
echo def test_health^(client^):
echo     """Test para verificar el endpoint de salud del servicio"""
echo     response = client.get^('/health'^)
echo     assert response.status_code == 200
echo.
echo def test_count^(client^):
echo     """Test para verificar el conteo de imágenes"""
echo     response = client.get^('/count'^)
echo     assert response.status_code == 200
echo.
echo def test_get_pictures^(client^):
echo     """Test para verificar que devuelve imágenes"""
echo     response = client.get^('/pictures'^)
echo     assert response.status_code == 200
) > tests\test_app.py

cd ..

REM Módulo 2 - Songs Service
echo 🎵 Creando servicio Songs...
mkdir Back-End-Development-Songs 2>nul
cd Back-End-Development-Songs

REM Crear app.py del servicio Songs
(
echo from flask import Flask, jsonify, request
echo from datetime import datetime
echo import uuid
echo.
echo app = Flask^(__name__^)
echo.
echo # Datos simulados para las canciones
echo songs_data = [
echo     {
echo         "id": str^(uuid.uuid4^(^)^),
echo         "lyrics": "Yesterday, all my troubles seemed so far away...",
echo         "title": "Yesterday",
echo         "artist": "The Beatles",
echo         "album": "Help!",
echo         "genre": "Pop Rock",
echo         "year": 1965,
echo         "duration": "2:05",
echo         "created_at": datetime.now^(^).isoformat^(^),
echo         "updated_at": datetime.now^(^).isoformat^(^)
echo     }
echo ]
echo.
echo @app.route^('/health', methods=['GET']^)
echo def health^(^):
echo     """Endpoint para verificar el estado del servicio"""
echo     return jsonify^({
echo         "status": "OK",
echo         "service": "Songs Service",
echo         "timestamp": datetime.now^(^).isoformat^(^)
echo     }^), 200
echo.
echo @app.route^('/songs', methods=['GET']^)
echo def get_songs^(^):
echo     """Endpoint para obtener todas las canciones"""
echo     return jsonify^({
echo         "songs": songs_data,
echo         "total": len^(songs_data^)
echo     }^), 200
echo.
echo if __name__ == '__main__':
echo     app.run^(debug=True, host='0.0.0.0', port=5001^)
) > app.py

REM Crear requirements.txt
(
echo Flask==2.3.3
echo pytest==7.4.2
echo pytest-flask==1.2.0
echo Werkzeug==2.3.7
echo uuid==1.30
) > requirements.txt

REM Crear Dockerfile
(
echo # Usar imagen base oficial de Python
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo COPY . .
echo EXPOSE 5001
echo ENV FLASK_APP=app.py
echo CMD ["python", "app.py"]
) > Dockerfile

cd ..

REM Módulo 3 - Django App
echo 🐍 Creando aplicación Django...
mkdir Back-End-Development-Capstone\bandsite 2>nul
mkdir Back-End-Development-Capstone\songs 2>nul
mkdir Back-End-Development-Capstone\photos 2>nul
mkdir Back-End-Development-Capstone\templates 2>nul
mkdir Back-End-Development-Capstone\static 2>nul
cd Back-End-Development-Capstone

REM Crear manage.py
(
echo #!/usr/bin/env python
echo """Django's command-line utility for administrative tasks."""
echo import os
echo import sys
echo.
echo if __name__ == '__main__':
echo     """Run administrative tasks."""
echo     os.environ.setdefault^('DJANGO_SETTINGS_MODULE', 'bandsite.settings'^)
echo     try:
echo         from django.core.management import execute_from_command_line
echo     except ImportError as exc:
echo         raise ImportError^(
echo             "Couldn't import Django."
echo         ^) from exc
echo     execute_from_command_line^(sys.argv^)
) > manage.py

REM Crear __init__.py files
echo. > bandsite\__init__.py
echo. > songs\__init__.py
echo. > photos\__init__.py

REM Crear settings.py básico
(
echo from pathlib import Path
echo.
echo BASE_DIR = Path^(__file__^).resolve^(^).parent.parent
echo SECRET_KEY = 'django-insecure-change-in-production'
echo DEBUG = True
echo ALLOWED_HOSTS = ['*']
echo.
echo INSTALLED_APPS = [
echo     'django.contrib.admin',
echo     'django.contrib.auth',
echo     'django.contrib.contenttypes',
echo     'django.contrib.sessions',
echo     'django.contrib.messages',
echo     'django.contrib.staticfiles',
echo     'songs',
echo     'photos',
echo ]
echo.
echo DATABASES = {
echo     'default': {
echo         'ENGINE': 'django.db.backends.sqlite3',
echo         'NAME': BASE_DIR / 'db.sqlite3',
echo     }
echo }
echo.
echo STATIC_URL = '/static/'
echo DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
) > bandsite\settings.py

REM Crear requirements.txt
(
echo Django==4.2.5
echo pillow==10.0.0
echo gunicorn==21.2.0
) > requirements.txt

REM Crear Dockerfile
(
echo FROM python:3.10-slim
echo WORKDIR /app
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo COPY . .
echo EXPOSE 8000
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
) > Dockerfile

cd ..

REM Crear docker-compose.yml
(
echo version: '3.8'
echo.
echo services:
echo   pictures-service:
echo     build: ./Back-End-Development-Pictures
echo     ports:
echo       - "5000:5000"
echo.
echo   songs-service:
echo     build: ./Back-End-Development-Songs
echo     ports:
echo       - "5001:5001"
echo.
echo   django-app:
echo     build: ./Back-End-Development-Capstone
echo     ports:
echo       - "8000:8000"
echo     depends_on:
echo       - pictures-service
echo       - songs-service
) > docker-compose.yml

echo.
echo ✅ Estructura del proyecto creada exitosamente!
echo.
echo 📁 Estructura creada:
echo Back-End-Development/
echo ├── Back-End-Development-Pictures/
echo │   ├── app.py
echo │   ├── requirements.txt
echo │   ├── Dockerfile
echo │   └── tests/test_app.py
echo ├── Back-End-Development-Songs/
echo │   ├── app.py
echo │   ├── requirements.txt
echo │   └── Dockerfile
echo ├── Back-End-Development-Capstone/
echo │   ├── manage.py
echo │   ├── bandsite/settings.py
echo │   ├── requirements.txt
echo │   └── Dockerfile
echo └── docker-compose.yml
echo.
echo 🚀 Próximos pasos:
echo 1. cd Back-End-Development
echo 2. docker-compose up --build
echo.
echo 📋 URLs de los servicios:
echo    - Pictures Service: http://localhost:5000
echo    - Songs Service: http://localhost:5001
echo    - Django App: http://localhost:8000
echo.
echo 🎉 ¡Proyecto configurado y listo!

pause