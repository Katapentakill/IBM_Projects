# 📓 Guestbook App - Kubernetes Deployment Project

Una aplicación completa de libro de visitas desplegada en Kubernetes con autoescalado, rollback y gestión de imágenes Docker en IBM Cloud Container Registry.

![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![IBM Cloud](https://img.shields.io/badge/IBM%20Cloud-1261FE?style=for-the-badge&logo=IBM&logoColor=white)

## 🚀 Características

- ✅ **Frontend responsive** en HTML5 + CSS3 + jQuery
- ✅ **Backend robusto** en Go (Golang)
- ✅ **Containerización** con Docker multi-stage builds
- ✅ **Orquestación** con Kubernetes
- ✅ **Autoescalado** con Horizontal Pod Autoscaler (HPA)
- ✅ **Rollback automático** entre versiones
- ✅ **Registro de imágenes** en IBM Cloud Container Registry
- ✅ **Integración con Redis** para persistencia de datos

## 🏗️ Estructura del Proyecto

```
guestbook/
├── v1/
│   └── guestbook/
│       ├── public/
│       │   ├── index.html
│       │   ├── jquery.min.js
│       │   ├── script.js
│       │   └── style.css
│       ├── deployment.yml
│       ├── Dockerfile
│       └── main.go
└── v2/
    ├── analyzer/
    │   └── (archivos del analyzer)
    └── guestbook/
        ├── public/
        │   ├── index.html
        │   ├── jquery.min.js
        │   ├── script.js
        │   └── style.css
        ├── analyzer-deployment.yaml
        ├── analyzer-service.yaml
        ├── binding-hack.sh
        ├── Dockerfile
        ├── main.go
        ├── redis-master-deployment.yaml
        ├── redis-master-service.yaml
        ├── redis-slave-deployment.yaml
        └── redis-slave-service.yaml
├── .gitignore
├── LICENSE
└── README.md
```

## ⚙️ Stack Tecnológico

| Componente | Tecnología | Versión |
|------------|------------|---------|
| **Backend** | Go (Golang) | 1.18+ |
| **Frontend** | HTML5 + CSS3 + jQuery | - |
| **Base de datos** | Redis | Latest |
| **Contenedores** | Docker | 20.10+ |
| **Orquestación** | Kubernetes | 1.24+ |
| **Registry** | IBM Cloud Container Registry | - |
| **Load Testing** | BusyBox | 1.36.0 |

## 🛠️ Instalación y Configuración

### Prerrequisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) con Kubernetes habilitado
- [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cli-getting-started)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- Cuenta activa en [IBM Cloud](https://cloud.ibm.com/)

### 1. 🔧 Configuración de IBM Cloud

```bash
# Iniciar sesión en IBM Cloud
ibmcloud login

# Crear API Key
ibmcloud iam api-key-create guestbook-key

# Crear namespace en Container Registry
ibmcloud cr namespace-add sn-labs-katapentakill

# Crear secret para Kubernetes
kubectl create secret docker-registry icr-secret \
  --docker-server=us.icr.io \
  --docker-username=iamapikey \
  --docker-password=<YOUR_API_KEY> \
  --docker-email=your-email@example.com
```

### 2. 📦 Build y Push de Imágenes Docker

#### Guestbook v2
```bash
cd guestbook/v2/guestbook

# Build de la imagen
docker build -t us.icr.io/sn-labs-katapentakill/guestbook:v2 .

# Push al registry
docker push us.icr.io/sn-labs-katapentakill/guestbook:v2

# Verificar imágenes
ibmcloud cr images
```

#### Analyzer (Componente de análisis)
```bash
cd guestbook/v2/analyzer

# Build y push del analyzer
docker build -t us.icr.io/sn-labs-katapentakill/analyzer:latest .
docker push us.icr.io/sn-labs-katapentakill/analyzer:latest
```

### 3. 🚀 Despliegue en Kubernetes

#### Desplegar Redis (Master y Slave)
```bash
cd guestbook/v2/guestbook

kubectl apply -f redis-master-deployment.yaml
kubectl apply -f redis-master-service.yaml
kubectl apply -f redis-slave-deployment.yaml
kubectl apply -f redis-slave-service.yaml
```

#### Desplegar Guestbook v1
```bash
cd guestbook/v1/guestbook
kubectl apply -f deployment.yml
```

#### Desplegar Guestbook v2 y componentes
```bash
cd guestbook/v2/guestbook

# Desplegar analyzer
kubectl apply -f analyzer-deployment.yaml
kubectl apply -f analyzer-service.yaml

# Si necesitas usar el binding hack
chmod +x binding-hack.sh
./binding-hack.sh
```

### 4. 📊 Configurar Autoescalado

```bash
# Crear HPA para guestbook
kubectl autoscale deployment guestbook --cpu-percent=10 --min=1 --max=5

# Crear HPA para analyzer
kubectl autoscale deployment analyzer --cpu-percent=50 --min=1 --max=3

# Verificar HPAs
kubectl get hpa
```

## 🌐 Acceso a la Aplicación

### Port Forwarding (Desarrollo)
```bash
# Guestbook
kubectl port-forward deployment/guestbook 3000:3000

# Analyzer
kubectl port-forward deployment/analyzer 8080:8080
```

Acceder a:
- **Guestbook**: http://localhost:3000
- **Analyzer**: http://localhost:8080

### Usando Services (Producción)
```bash
# Obtener URL del servicio
kubectl get services
```

## 🧪 Testing y Validación

### Load Testing para Autoescalado
```bash
# Generar carga en guestbook
kubectl run -i --tty load-generator --rm --image=busybox:1.36.0 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://guestbook:3000; done"

# Observar escalado en tiempo real
kubectl get hpa guestbook --watch
```

### Verificar Pods y Servicios
```bash
# Ver estado de pods
kubectl get pods

# Ver logs de la aplicación
kubectl logs -f deployment/guestbook

# Ver servicios
kubectl get services
```

## 🔄 Gestión de Versiones y Rollback

### Ver Historial de Despliegues
```bash
# Historial completo
kubectl rollout history deployment/guestbook

# Detalles de una revisión específica
kubectl rollout history deployment/guestbook --revision=2
```

### Rollback
```bash
# Rollback a la versión anterior
kubectl rollout undo deployment/guestbook

# Rollback a una revisión específica
kubectl rollout undo deployment/guestbook --to-revision=1

# Verificar ReplicaSets
kubectl get rs
```

## 📂 Navegación por Versiones

### Versión 1 (v1)
- **Ubicación**: `guestbook/v1/guestbook/`
- **Características**: Versión básica con deployment local
- **Archivos principales**:
  - `deployment.yml` - Configuración de Kubernetes
  - `Dockerfile` - Imagen de contenedor
  - `main.go` - Aplicación backend
  - `public/` - Assets del frontend

### Versión 2 (v2)
- **Ubicación**: `guestbook/v2/`
- **Características**: Versión avanzada con componentes adicionales
- **Componentes**:
  - `guestbook/` - Aplicación principal mejorada
  - `analyzer/` - Componente de análisis (opcional)
- **Archivos de despliegue** (en v2/guestbook/):
  - Configuraciones Redis (master/slave)
  - Analyzer deployment y service
  - Scripts de binding

### deployment.yml (ubicado en v1/guestbook/)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: guestbook
spec:
  replicas: 1
  selector:
    matchLabels:
      app: guestbook
  template:
    metadata:
      labels:
        app: guestbook
    spec:
      containers:
      - name: guestbook
        image: us.icr.io/sn-labs-katapentakill/guestbook:v2
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: 5m
            memory: 128Mi
          requests:
            cpu: 2m
            memory: 64Mi
      imagePullSecrets:
      - name: icr-secret
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **ImagePullBackOff**
   ```bash
   # Verificar secret
   kubectl get secrets
   kubectl describe secret icr-secret
   ```

2. **Pod no inicia**
   ```bash
   # Ver logs detallados
   kubectl describe pod <pod-name>
   kubectl logs <pod-name>
   ```

3. **HPA no funciona**
   ```bash
   # Verificar metrics server
   kubectl top nodes
   kubectl top pods
   ```

### Comandos Útiles de Debug
```bash
# Estado general del cluster
kubectl cluster-info

# Eventos del sistema
kubectl get events --sort-by=.metadata.creationTimestamp

# Descripción completa de un deployment
kubectl describe deployment guestbook

# Acceso interactivo a un pod
kubectl exec -it <pod-name> -- /bin/bash
```

## 📈 Monitoreo y Métricas

### Comandos de Monitoreo
```bash
# CPU y memoria de pods
kubectl top pods

# Estado de HPAs
kubectl get hpa

# Métricas de nodes
kubectl top nodes

# Watch en tiempo real
kubectl get pods --watch
```

## 🔒 Seguridad

- ✅ **Secrets** para credenciales de IBM Cloud Registry
- ✅ **Resource limits** para prevenir consumo excesivo
- ✅ **ImagePullPolicy: Always** para usar imágenes actualizadas
- ✅ **Non-root containers** en producción

## 🚀 Despliegue en Producción

### Consideraciones Adicionales

1. **Persistent Volumes** para Redis
2. **Ingress Controller** para routing avanzado
3. **SSL/TLS** certificates
4. **Monitoring** con Prometheus/Grafana
5. **Logging** centralizado
6. **Backup** strategy para datos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Katapentakill**  
Big Data Analyst @ Living Stones Foundation  
GitHub: [@Katapentakill](https://github.com/Katapentakill)

---

## 📚 Recursos Adicionales

- [Documentación de Kubernetes](https://kubernetes.io/docs/)
- [IBM Cloud Container Registry](https://cloud.ibm.com/docs/Registry)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Go Web Development](https://golang.org/doc/)

---

⭐ **¡Dale una estrella si este proyecto te fue útil!** ⭐