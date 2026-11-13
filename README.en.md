# ☕ Casa Matriarcada — E-commerce

Full-stack e-commerce platform for **Casa Matriarcada**, a local business in
Bogotá D.C., Colombia, selling Colombian handicrafts — wayú bags, vueltiao hats,
lanchetas and souvenirs — alongside single-origin coffee.

The project aims to give customers an online channel to browse the catalog, manage a
shopping cart and complete transactions securely through the PSE payment gateway.

📖 [Leer en español](./README.md)

---

## 📋 Table of contents

- [Project description](#-project-description)
- [Development status](#-development-status)
- [Functional requirements](#-functional-requirements)
- [Non-functional requirements](#-non-functional-requirements)
- [Tech stack](#-tech-stack)
- [Project architecture](#-project-architecture)
- [MVC architecture layers](#-mvc-architecture-layers)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment variables](#-environment-variables)
- [Available scripts](#-available-scripts)
- [API documentation](#-api-documentation)
- [Endpoints](#-endpoints)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 📝 Project description

This project addresses a local shop's need to bring its catalog online. Sales currently
happen in person only, which limits the business to customers who visit the store.

**Planned features:**

- Dynamic product catalog organized by category
- Interactive shopping cart
- User authentication (email/password and Google OAuth)
- Email verification on sign-in
- Admin panel for inventory and price management
- Automatic invoice email on purchase completion
- Integration with the PSE payment gateway (Colombia)

---

## 🚧 Development status

| Area | Status |
|------|--------|
| Express server and MongoDB Atlas connection | ✅ Done |
| Data model and validation | ✅ Done |
| Catalog REST API (CRUD) | ✅ Done |
| OpenAPI 3.0 specification and Swagger UI | ✅ Done |
| Frontend: homepage and global styles | 🔄 In progress |
| Client-side dynamic catalog | ⏳ Pending |
| Shopping cart | ⏳ Pending |
| Authentication (JWT + Google OAuth) | ⏳ Pending |
| Admin panel | ⏳ Pending |
| PSE integration | ⏳ Pending |
| Deployment | ⏳ Pending |

---

## ✅ Functional requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| **RF-01** | The system must let the administrator add, edit or remove products from the catalog. | High |
| **RF-02** | The system must integrate with the PSE payment gateway to process transactions. | High |
| **RF-03** | The administrator must be able to sign in to a control panel to update inventory prices. | High |
| **RF-04** | The platform must send a verification email to confirm the user's secure sign-in. | Medium |
| **RF-05** | The platform must send an invoice by email once a purchase is completed. | Medium |
| **RF-06** | The system must let customers add, edit and remove products from their cart. | High |
| **RF-07** | The system must allow customer registration and sign-in via email/password or Google OAuth. | High |

---

## 🛡 Non-functional requirements

| ID | Category | Requirement |
|----|----------|-------------|
| **RNF-01** | Availability | The store must stay online and operational continuously (approximately 24/7). |
| **RNF-02** | Performance | Product images must load in under 3 seconds. |
| **RNF-03** | Security | Passwords stored in the database must be hashed (bcrypt). |
| **RNF-04** | Security | The platform must run over HTTPS to protect data during checkout. |
| **RNF-05** | Usability | Interfaces must be fully responsive on desktop and mobile devices. |

---

## 🛠 Tech stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Frontend | HTML5, CSS3, modular Vanilla JavaScript |
| Authentication | JWT + Passport.js (Google OAuth 2.0) |
| Email | Nodemailer |
| Image storage | Cloudinary |
| Payment gateway | PSE (Colombia) |
| API documentation | OpenAPI 3.0 + Swagger UI |
| API testing | Thunder Client |
| Architecture | MVC (Model–View–Controller) |
| Version control | Git / GitHub |

---

## 📂 Project architecture

```
E-commerce_cafe_y_Luci/
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB Atlas connection (Mongoose)
│   │   ├── passport.js              # Google OAuth authentication strategy
│   │   ├── cloudinary.js            # Image upload configuration
│   │   └── mailer.js                # Email service configuration (Nodemailer)
│   ├── docs/
│   │   └── openapi.yaml             # OpenAPI 3.0 specification
│   ├── models/
│   │   ├── Product.js               # Product schema
│   │   ├── User.js                  # User schema (local and Google login)
│   │   ├── Order.js                 # Order schema
│   │   └── Cart.js                  # Shopping cart schema
│   ├── controllers/
│   │   ├── productController.js     # Product CRUD logic
│   │   ├── authController.js        # Login/register/JWT/Google logic
│   │   ├── cartController.js        # Cart logic
│   │   ├── orderController.js       # Order logic
│   │   └── paymentController.js     # PSE integration logic
│   ├── routes/
│   │   ├── productRoutes.js         # /api/products endpoints
│   │   ├── authRoutes.js            # /api/auth endpoints (includes Google)
│   │   ├── cartRoutes.js            # /api/cart endpoints
│   │   ├── orderRoutes.js           # /api/orders endpoints
│   │   └── paymentRoutes.js         # /api/payments endpoints
│   ├── middlewares/
│   │   ├── auth.js                  # Verifies JWT token on protected routes
│   │   ├── isAdmin.js               # Verifies admin role
│   │   ├── upload.js                # Multer: handles incoming image files
│   │   ├── errorHandler.js          # Centralized error handling
│   │   └── validate.js              # Input data validation
│   ├── utils/
│   │   ├── generateToken.js         # Generates JWT on login
│   │   ├── hashPassword.js          # Password hashing with bcrypt
│   │   ├── sendEmail.js             # Email delivery (verification and invoices)
│   │   └── emailTemplates.js        # HTML email templates
│   ├── .env                         # Environment variables (NOT pushed to Git)
│   ├── .env.example                 # Environment variables template
│   ├── server.js                    # Entry point: starts the server
│   └── app.js                       # Express configuration
│
├── frontend/
│   ├── public/
│   │   ├── index.html               # Homepage
│   │   ├── tienda.html              # Dynamic product catalog
│   │   ├── categorias.html          # Category view
│   │   ├── carrito.html             # Shopping cart view
│   │   ├── nosotros.html            # About the business
│   │   ├── contacto.html            # Contact form
│   │   └── admin.html               # Admin panel (protected)
│   ├── css/
│   │   └── styles.css               # Global stylesheet (responsive)
│   └── js/
│       ├── modules/
│       │   ├── api.js               # Centralized fetch functions to the backend
│       │   ├── cart.js              # Client-side cart logic
│       │   ├── catalog.js           # Dynamic catalog rendering
│       │   └── admin.js             # Admin panel logic
│       └── main.js                  # Frontend JS entry point
│
├── .gitignore                       # Files excluded from version control
├── package.json                     # Project dependencies and scripts
├── README.md                        # Project documentation (Spanish)
└── README.en.md                     # Project documentation (English)
```

---

## 🏗 MVC architecture layers

| Layer | Folder | Responsibility |
|-------|--------|----------------|
| **Model** | `backend/models/` | Defines data structure and Mongoose validation rules |
| **View** | `frontend/public/` | HTML user interface, consumes the API via `fetch` |
| **Controller** | `backend/controllers/` | Business logic: processes requests and returns responses |
| **Routes** | `backend/routes/` | Maps each HTTP endpoint to its corresponding controller |
| **Middlewares** | `backend/middlewares/` | Intermediate functions: authentication, validation, error handling |
| **Utilities** | `backend/utils/` | Reusable helpers: tokens, hashing and email |

---

## ✅ Prerequisites

- Node.js 18 or higher
- npm
- A MongoDB Atlas account (the free M0 tier is sufficient)
- Google Cloud Console credentials (for OAuth)
- A Cloudinary account (for image storage)
- An outgoing SMTP mail account (for verification and invoice emails)

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/KitsuXSTL/E-commerce_cafe_y_Luci.git
cd E-commerce_cafe_y_Luci

# 2. Install dependencies
npm install

# 3. Create the environment variables file
cp backend/.env.example backend/.env

# 4. Edit backend/.env with your real credentials

# 5. Start the development server
npm run dev
```

The server will be available at `http://localhost:3000`.

---

## 🔐 Environment variables

Create a `backend/.env` file based on `backend/.env.example`:

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database_name

# Authentication
JWT_SECRET=long_random_string
SESSION_SECRET=another_long_random_string

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (SMTP)
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASSWORD=your_app_password
```

> ⚠️ The `.env` file must **never** be pushed to the repository. It is already listed in `.gitignore`.

---

## 📜 Available scripts

```bash
npm run dev      # Starts the server with nodemon (development)
npm start        # Starts the server in production mode
```

---

## 📖 API documentation

The API has a formal **OpenAPI 3.0** specification located at `backend/docs/openapi.yaml`.

With the server running, interactive documentation is available at:

```
http://localhost:3000/api/docs
```

From that interface you can inspect data schemas, review the parameters each operation
accepts, and run test requests against the server.

---

## 🔌 Endpoints

### Products

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| `GET` | `/api/products` | Lists the catalog with filters and pagination | Public |
| `GET` | `/api/products/:id` | Product details | Public |
| `POST` | `/api/products` | Creates a product | Admin |
| `PUT` | `/api/products/:id` | Updates a product | Admin |
| `DELETE` | `/api/products/:id` | Deactivates a product (soft delete) | Admin |

**Query parameters accepted by the listing endpoint:**

| Parameter | Description | Default |
|-----------|-------------|---------|
| `categoria` | Filters by category | — |
| `buscar` | Text search across name and description | — |
| `limite` | Products per page | 20 |
| `pagina` | Page number | 1 |

**Available categories:** `mochilas`, `sombreros`, `lanchetas`, `bebidas`, `souvenirs`, `otros`

### Authentication

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| `POST` | `/api/auth/register` | User registration | Public |
| `POST` | `/api/auth/login` | User login | Public |
| `GET` | `/api/auth/verify/:token` | Email verification | Public |
| `GET` | `/api/auth/google` | Starts the Google OAuth flow | Public |
| `GET` | `/api/auth/google/callback` | Google OAuth callback | Public |

### Cart and orders

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| `GET` | `/api/cart` | Retrieves the user's cart | Authenticated |
| `POST` | `/api/cart` | Adds a product to the cart | Authenticated |
| `PUT` | `/api/cart/:id` | Updates a product's quantity | Authenticated |
| `DELETE` | `/api/cart/:id` | Removes a product from the cart | Authenticated |
| `POST` | `/api/orders` | Creates an order and sends the invoice | Authenticated |
| `GET` | `/api/orders` | Order history | Authenticated |

### Payments

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| `POST` | `/api/payments/pse` | Starts a PSE transaction | Authenticated |
| `POST` | `/api/payments/webhook` | Receives the gateway's confirmation | Public (signed) |

---

## 🔒 Security

- Passwords hashed with **bcrypt** before being stored
- **JWT**-based authentication with middleware-protected routes
- Email identity verification on sign-in
- Role-based access control (`cliente` / `admin`)
- Sensitive values managed through `.env` (excluded from the repository)
- Input validation on all routes
- Soft-delete for products, preserving the integrity of historical orders
- Encrypted communication over **HTTPS** in production
- IP allowlist restrictions in MongoDB Atlas for production

---

## 🗺 Roadmap

| Week | Deliverable | Requirements |
|------|------------|--------------|
| 1 | Repository setup, environment and MongoDB Atlas connection | — |
| 2 | Product CRUD via REST API and OpenAPI 3.0 specification | RF-01 |
| 3 | Dynamic catalog interface | RNF-02, RNF-05 |
| 4 | Interactive shopping cart | RF-06 |
| 5 | Authentication with JWT, Google OAuth and email verification | RF-04, RF-07, RNF-03 |
| 6 | Admin panel and Cloudinary integration | RF-03 |
| 7 | Order management, checkout and PSE integration | RF-02, RF-05 |
| 8 | Security review, responsive design and deployment | RNF-01, RNF-04 |

---

## 👤 Author

Developed by **Juan Sebastián Torres Agudelo**
Software Engineering student — Universidad Manuela Beltrán, Bogotá, Colombia
