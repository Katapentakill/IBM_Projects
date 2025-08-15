# Usar imagen base oficial de Python
FROM python:3.10-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivo de requirements
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fuente
COPY . .

# Crear directorios necesarios
RUN mkdir -p static media staticfiles

# Ejecutar migraciones y collectstatic
RUN python manage.py collectstatic --noinput || true

# Exponer puerto 8000
EXPOSE 8000

# Variables de entorno
ENV DJANGO_SETTINGS_MODULE=bandsite.settings
ENV PYTHONPATH=/app

# Comando para ejecutar la aplicación
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]