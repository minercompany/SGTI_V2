# SGTI Enterprise - Guía de Inicio Rápido

## Prerrequisitos
- Java 21 JDK
- Node.js 18+ y npm
- Docker y Docker Compose
- Maven (incluido en wrapper)

## Paso 1: Iniciar Servicios con Docker

```bash
cd /home/SGTI_V2
docker-compose up -d
```

Esperar a que todos los servicios estén listos (~30 segundos).

**Verificar:**
```bash
docker-compose ps
```

Todos los servicios deben estar "Up".

## Paso 2: Crear Base de Datos

```bash
# Conectar a PostgreSQL
docker exec -it sgti-postgres psql -U sgti -d sgti_db

# Ejecutar dentro de psql:
\i /path/to/seed.sql

# O manualmente desde fuera:
docker exec -i sgti-postgres psql -U sgti -d sgti_db < backend/src/main/resources/db/seed.sql
```

**Nota:** Las tablas se crearán automáticamente por Hibernate al iniciar el backend (ddl-auto: update).

## Paso 3: Iniciar Backend

```bash
cd backend

# Compilar
./mvnw clean install -DskipTests

# Ejecutar
./mvnw spring-boot:run
```

El backend estará disponible en: **http://localhost:8081/api**

**Endpoints disponibles:**
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuario actual
- Swagger UI: `http://localhost:8081/swagger-ui.html`

## Paso 4: Iniciar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en: **http://localhost:3000**

## Paso 5: Probar Login

**Credenciales de prueba:**
- Email: `admin@cooperativa.com.py`
- Password: `admin123`

### Desde el navegador:
1. Abrir http://localhost:3000
2. Iniciar sesión con las credenciales

### Desde curl:
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cooperativa.com.py",
    "password": "admin123"
  }'
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "user": {
    "id": "...",
    "email": "admin@cooperativa.com.py",
    "nombreCompleto": "Administrador del Sistema",
    "rol": "SUPER_ADMIN"
  }
}
```

## Servicios Auxiliares

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Adminer** (DB GUI) | http://localhost:8080 | Server: postgres, User: sgti, Password: sgti_secret_2024, DB: sgti_db |
| **MinIO Console** | http://localhost:9001 | User: sgti_admin, Password: sgti_minio_secret_2024 |
| **RabbitMQ Management** | http://localhost:15672 | User: sgti, Password: sgti_rabbit_2024 |

## Solución de Problemas

### Puerto 8081 ya en uso
```bash
# Encontrar proceso
lsof -i :8081

# Matar proceso
kill -9 <PID>
```

### Backend no conecta a PostgreSQL
1. Verificar que el contenedor esté corriendo: `docker ps`
2. Verificar logs: `docker logs sgti-postgres`
3. Verificar `application.yml` tiene la URL correcta

### Frontend no conecta al backend
1. Verificar `next.config.js` tiene proxy a puerto 8081
2. Verificar CORS en `SecurityConfig.java`

## Comandos Útiles

```bash
# Ver logs del backend
./mvnw spring-boot:run | grep -i error

# Ver logs de Docker Compose
docker-compose logs -f

# Reiniciar un servicio
docker-compose restart postgres

# Parar todo
docker-compose down

# Limpiar volúmenes (CUIDADO: borra datos)
docker-compose down -v
```

## Próximos Pasos

1. ✅ Sistema funcionando
2. Crear más usuarios desde el dashboard
3. Crear tickets de prueba
4. Configurar SLAs
5. Probar workflow completo
