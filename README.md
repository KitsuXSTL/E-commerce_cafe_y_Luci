# ☕ Casa Matriarcada — E-commerce

Plataforma de comercio electrónico full-stack para **Casa Matriarcada**, un negocio
local ubicado en Bogotá D.C., Colombia, dedicado a la venta de productos artesanales de
marca colombiana —mochilas wayú, sombreros vueltiaos, lanchetas y souvenirs— junto a café
de origen.

El objetivo del proyecto es ofrecer a los clientes un canal de venta en línea que permita
explorar el catálogo, gestionar un carrito de compras y completar transacciones de forma
segura mediante la pasarela de pagos PSE.

📖 [Read this in English](./README.en.md)

---

## 📋 Tabla de contenidos

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Estado del desarrollo](#-estado-del-desarrollo)
- [Requerimientos funcionales](#-requerimientos-funcionales)
- [Requerimientos no funcionales](#-requerimientos-no-funcionales)
- [Stack tecnológico](#-stack-tecnológico)
- [Arquitectura del proyecto](#-arquitectura-del-proyecto)
- [Capas de la arquitectura MVC](#-capas-de-la-arquitectura-mvc)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Documentación de la API](#-documentación-de-la-api)
- [Endpoints](#-endpoints)
- [Seguridad](#-seguridad)
- [Roadmap](#-roadmap)
- [Autor](#-autor)

---

## 📝 Descripción del proyecto

Este proyecto nace de la necesidad de un local comercial en Bogotá de llevar su catálogo
al entorno digital. Actualmente la venta se realiza únicamente de forma presencial, lo que
limita el alcance del negocio a los clientes que visitan físicamente el local.

**Funcionalidades previstas:**

- Catálogo dinámico de productos organizado por categorías
- Carrito de compras interactivo
- Autenticación de usuarios (correo/contraseña y Google OAuth)
- Verificación de inicio de sesión por correo electrónico
- Panel de administración para la gestión de inventario y precios
- Envío automático de factura electrónica al completar una compra
- Integración con la pasarela de pagos PSE (Colombia)

---

## 🚧 Estado del desarrollo

| Área | Estado |
|------|--------|
| Servidor Express y conexión a MongoDB Atlas | ✅ Completado |
| Modelo de datos y validaciones | ✅ Completado |
| API REST del catálogo (CRUD) | ✅ Completado |
| Especificación OpenAPI 3.0 y Swagger UI | ✅ Completado |
| Interfaz: página de inicio y estilos globales | 🔄 En progreso |
| Catálogo dinámico en el cliente | ⏳ Pendiente |
| Carrito de compras | ⏳ Pendiente |
| Autenticación (JWT + Google OAuth) | ⏳ Pendiente |
| Panel de administración | ⏳ Pendiente |
| Integración con PSE | ⏳ Pendiente |
| Despliegue | ⏳ Pendiente |

---

## ✅ Requerimientos funcionales

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| **RF-01** | El sistema debe permitir al administrador agregar, modificar o eliminar productos del catálogo. | Alta |
| **RF-02** | El sistema debe integrarse con la pasarela de pagos PSE para procesar transacciones. | Alta |
| **RF-03** | El administrador debe poder iniciar sesión en un panel de control para actualizar los precios del inventario. | Alta |
| **RF-04** | La plataforma debe enviar un correo electrónico de verificación para confirmar el inicio de sesión seguro del usuario. | Media |
| **RF-05** | La plataforma debe enviar un correo electrónico con la factura una vez completada la compra. | Media |
| **RF-06** | El sistema debe permitir al cliente agregar, modificar y eliminar productos de su carrito de compras. | Alta |
| **RF-07** | El sistema debe permitir el registro e inicio de sesión de clientes mediante correo/contraseña o Google OAuth. | Alta |

---

## 🛡 Requerimientos no funcionales

| ID | Categoría | Requerimiento |
|----|-----------|---------------|
| **RNF-01** | Disponibilidad | El e-commerce debe permanecer en línea y operativo de forma continua (aproximadamente 24/7). |
| **RNF-02** | Rendimiento | Las imágenes de los productos deben cargar en menos de 3 segundos. |
| **RNF-03** | Seguridad | Las contraseñas almacenadas en la base de datos deben estar encriptadas mediante algoritmos de hashing (bcrypt). |
| **RNF-04** | Seguridad | La plataforma debe operar sobre HTTPS para proteger los datos durante el proceso de pago. |
| **RNF-05** | Usabilidad | Las interfaces deben ser completamente responsivas y visualizarse correctamente tanto en computador como en dispositivos móviles. |

---

## 🛠 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js, Express.js |
| Base de datos | MongoDB Atlas (Mongoose) |
| Frontend | HTML5, CSS3, JavaScript modular (Vanilla) |
| Autenticación | JWT + Passport.js (Google OAuth 2.0) |
| Correo electrónico | Nodemailer |
| Almacenamiento de imágenes | Cloudinary |
| Pasarela de pagos | PSE (Colombia) |
| Documentación de la API | OpenAPI 3.0 + Swagger UI |
| Pruebas de la API | Thunder Client |
| Arquitectura | MVC (Modelo–Vista–Controlador) |
| Control de versiones | Git / GitHub |

---

## 📂 Arquitectura del proyecto

```
E-commerce_cafe_y_Luci/
├── backend/
│   ├── config/
│   │   ├── db.js                    # Conexión a MongoDB Atlas (Mongoose)
│   │   ├── passport.js              # Estrategia de autenticación con Google OAuth
│   │   ├── cloudinary.js            # Configuración de subida de imágenes
│   │   └── mailer.js                # Configuración del servicio de correo (Nodemailer)
│   ├── docs/
│   │   └── openapi.yaml             # Especificación OpenAPI 3.0 de la API
│   ├── models/
│   │   ├── Product.js               # Esquema de productos
│   │   ├── User.js                  # Esquema de usuarios (login local y con Google)
│   │   ├── Order.js                 # Esquema de órdenes/pedidos
│   │   └── Cart.js                  # Esquema del carrito de compras
│   ├── controllers/
│   │   ├── productController.js     # Lógica CRUD de productos
│   │   ├── authController.js        # Lógica de login/registro/JWT/Google
│   │   ├── cartController.js        # Lógica del carrito
│   │   ├── orderController.js       # Lógica de pedidos
│   │   └── paymentController.js     # Lógica de integración con PSE
│   ├── routes/
│   │   ├── productRoutes.js         # Endpoints /api/products
│   │   ├── authRoutes.js            # Endpoints /api/auth (incluye Google)
│   │   ├── cartRoutes.js            # Endpoints /api/cart
│   │   ├── orderRoutes.js           # Endpoints /api/orders
│   │   └── paymentRoutes.js         # Endpoints /api/payments
│   ├── middlewares/
│   │   ├── auth.js                  # Verifica token JWT en rutas protegidas
│   │   ├── isAdmin.js               # Verifica rol de administrador
│   │   ├── upload.js                # Multer: recepción de archivos de imagen
│   │   ├── errorHandler.js          # Manejo centralizado de errores
│   │   └── validate.js              # Validación de datos de entrada
│   ├── utils/
│   │   ├── generateToken.js         # Genera JWT al hacer login
│   │   ├── hashPassword.js          # Encripta contraseñas con bcrypt
│   │   ├── sendEmail.js             # Envío de correos (verificación y factura)
│   │   └── emailTemplates.js        # Plantillas HTML de los correos
│   ├── .env                         # Variables de entorno (NO se sube a Git)
│   ├── .env.example                 # Plantilla de variables de entorno
│   ├── server.js                    # Punto de entrada: levanta el servidor
│   └── app.js                       # Configuración de Express
│
├── frontend/
│   ├── public/
│   │   ├── index.html               # Página principal
│   │   ├── tienda.html              # Catálogo dinámico de productos
│   │   ├── categorias.html          # Vista de categorías
│   │   ├── carrito.html             # Vista del carrito de compras
│   │   ├── nosotros.html            # Información del negocio
│   │   ├── contacto.html            # Formulario de contacto
│   │   └── admin.html               # Panel de administración (protegido)
│   ├── css/
│   │   └── styles.css               # Hoja de estilos global (responsivo)
│   └── js/
│       ├── modules/
│       │   ├── api.js               # Funciones fetch centralizadas hacia el backend
│       │   ├── cart.js              # Lógica del carrito en el cliente
│       │   ├── catalog.js           # Renderizado dinámico del catálogo
│       │   └── admin.js             # Lógica del panel de administración
│       └── main.js                  # Punto de entrada del JS del frontend
│
├── .gitignore                       # Archivos excluidos del control de versiones
├── package.json                     # Dependencias y scripts del proyecto
├── README.md                        # Documentación del proyecto (español)
└── README.en.md                     # Documentación del proyecto (inglés)
```

---

## 🏗 Capas de la arquitectura MVC

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| **Modelo** | `backend/models/` | Define la estructura de los datos y las reglas de validación de Mongoose |
| **Vista** | `frontend/public/` | Interfaz de usuario en HTML, consume la API mediante `fetch` |
| **Controlador** | `backend/controllers/` | Lógica de negocio: procesa peticiones y devuelve respuestas |
| **Rutas** | `backend/routes/` | Mapea cada endpoint HTTP con su controlador correspondiente |
| **Middlewares** | `backend/middlewares/` | Funciones intermedias: autenticación, validación y manejo de errores |
| **Utilidades** | `backend/utils/` | Funciones auxiliares reutilizables: tokens, hashing y correo |

---

## ✅ Requisitos previos

- Node.js 18 o superior
- npm
- Cuenta en MongoDB Atlas (el tier gratuito M0 es suficiente)
- Credenciales de Google Cloud Console (para OAuth)
- Cuenta en Cloudinary (para almacenamiento de imágenes)
- Cuenta de correo saliente SMTP (para envío de verificaciones y facturas)

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/KitsuXSTL/E-commerce_cafe_y_Luci.git
cd E-commerce_cafe_y_Luci

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp backend/.env.example backend/.env

# 4. Editar backend/.env con tus credenciales reales

# 5. Levantar el servidor en modo desarrollo
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.

---

## 🔐 Variables de entorno

Crea un archivo `backend/.env` basado en `backend/.env.example`:

```env
# Servidor
PORT=3000

# Base de datos
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_base_datos

# Autenticación
JWT_SECRET=cadena_larga_y_aleatoria
SESSION_SECRET=otra_cadena_larga_y_aleatoria

# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Correo electrónico (SMTP)
SMTP_HOST=smtp.tuproveedor.com
SMTP_PORT=587
SMTP_USER=tu_correo@dominio.com
SMTP_PASSWORD=tu_password_de_aplicacion
```

> ⚠️ El archivo `.env` **nunca** debe subirse al repositorio. Ya está incluido en `.gitignore`.

---

## 📜 Scripts disponibles

```bash
npm run dev      # Inicia el servidor con nodemon (desarrollo)
npm start        # Inicia el servidor en modo producción
```

---

## 📖 Documentación de la API

La API cuenta con una especificación formal en formato **OpenAPI 3.0**, ubicada en
`backend/docs/openapi.yaml`.

Con el servidor en ejecución, la documentación interactiva está disponible en:

```
http://localhost:3000/api/docs
```

Desde esa interfaz es posible consultar los esquemas de datos, los parámetros admitidos
por cada operación y ejecutar peticiones de prueba contra el servidor.

---

## 🔌 Endpoints

### Productos

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| `GET` | `/api/products` | Lista el catálogo con filtros y paginación | Público |
| `GET` | `/api/products/:id` | Detalle de un producto | Público |
| `POST` | `/api/products` | Crea un producto | Admin |
| `PUT` | `/api/products/:id` | Actualiza un producto | Admin |
| `DELETE` | `/api/products/:id` | Desactiva un producto (baja lógica) | Admin |

**Parámetros de consulta admitidos en el listado:**

| Parámetro | Descripción | Valor por defecto |
|-----------|-------------|-------------------|
| `categoria` | Filtra por categoría | — |
| `buscar` | Búsqueda de texto sobre nombre y descripción | — |
| `limite` | Productos por página | 20 |
| `pagina` | Número de página | 1 |

**Categorías disponibles:** `mochilas`, `sombreros`, `lanchetas`, `bebidas`, `souvenirs`, `otros`

### Autenticación

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| `POST` | `/api/auth/register` | Registro de usuario | Público |
| `POST` | `/api/auth/login` | Inicio de sesión | Público |
| `GET` | `/api/auth/verify/:token` | Verificación de correo electrónico | Público |
| `GET` | `/api/auth/google` | Inicia flujo de Google OAuth | Público |
| `GET` | `/api/auth/google/callback` | Callback de Google OAuth | Público |

### Carrito y pedidos

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| `GET` | `/api/cart` | Obtiene el carrito del usuario | Autenticado |
| `POST` | `/api/cart` | Agrega un producto al carrito | Autenticado |
| `PUT` | `/api/cart/:id` | Modifica la cantidad de un producto | Autenticado |
| `DELETE` | `/api/cart/:id` | Elimina un producto del carrito | Autenticado |
| `POST` | `/api/orders` | Crea un pedido y envía la factura | Autenticado |
| `GET` | `/api/orders` | Historial de pedidos | Autenticado |

### Pagos

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| `POST` | `/api/payments/pse` | Inicia una transacción PSE | Autenticado |
| `POST` | `/api/payments/webhook` | Recibe la confirmación de la pasarela | Público (firmado) |

---

## 🔒 Seguridad

- Contraseñas encriptadas con **bcrypt** antes de persistirse en la base de datos
- Autenticación basada en **JWT** con rutas protegidas por middleware
- Verificación de identidad por correo electrónico al iniciar sesión
- Control de acceso por roles (`cliente` / `admin`)
- Variables sensibles gestionadas mediante `.env` (excluido del repositorio)
- Validación de datos de entrada en todas las rutas
- Eliminación de productos mediante baja lógica, preservando la integridad de los pedidos históricos
- Comunicación cifrada mediante **HTTPS** en el entorno de producción
- Restricción de IP en MongoDB Atlas para el entorno de producción

---

## 🗺 Roadmap

| Semana | Entregable | Requerimientos |
|--------|-----------|----------------|
| 1 | Configuración del repositorio, entorno y conexión con MongoDB Atlas | — |
| 2 | CRUD de productos mediante API REST y especificación OpenAPI 3.0 | RF-01 |
| 3 | Interfaz del catálogo dinámico | RNF-02, RNF-05 |
| 4 | Carrito de compras interactivo | RF-06 |
| 5 | Autenticación con JWT, Google OAuth y verificación por correo | RF-04, RF-07, RNF-03 |
| 6 | Panel de administración e integración con Cloudinary | RF-03 |
| 7 | Gestión de pedidos, checkout e integración con PSE | RF-02, RF-05 |
| 8 | Revisión de seguridad, diseño responsivo y despliegue | RNF-01, RNF-04 |

---

## 👤 Autor

Desarrollado por **Juan Sebastián Torres Agudelo**
Estudiante de Ingeniería de Software — Universidad Manuela Beltrán, Bogotá, Colombia

