# 🚗 Vehicle Maintenance API

A RESTful API built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/) to manage vehicles, maintenance records, parts catalogs, and service schedules.

---

## ✨ Features
- **Authentication & Authorization**: Secure API with JWT-based authentication.
- **Vehicle Management**: Complete CRUD operations for vehicles, brands, and models.
- **Service & Maintenance**: Manage service records, maintenance schedules, and assigned mechanics.
- **Catalogs**: Manage piece catalogs, service catalogs, and tool catalogs.
- **Roles & Users**: Seller, Mechanic, and User management.
- **File Uploads**: Logo/photo uploading capabilities.
- **Modular Structure**: Organized using NestJS modules (e.g., Auth, Brand, Service, etc.).
- **Database Access**: Powered by Prisma ORM.
- **Input Validation**: Strongly typed dtos and validation with class-validator.
- **API Documentation**: Built-in interactive documentation using Swagger.

---

## 🛠️ Tech Stack
- [NestJS](https://nestjs.com/) – Node.js framework
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript
- [Prisma v6](https://www.prisma.io/) – Modern ORM
- [MySQL/PostgreSQL](https://www.postgresql.org/) – Database
- [Swagger](https://swagger.io/) – API documentation
- [Passport/JWT](https://passportjs.org/) - Secure Auth

---

## 📂 Project Structure
```
src/
 ├── api/
 │    ├── brand/                  # Brand management
 │    ├── document-type/          # Document types catalog
 │    ├── mecanic/                # Mechanics management
 │    ├── model/                  # Vehicle models
 │    ├── piece_catalog/          # Spare parts catalog
 │    ├── seller/                 # Seller management
 │    ├── service/                # Service execution records
 │    ├── service_catalog/        # Available services
 │    ├── service_detail/         # Specific service details
 │    ├── service_detail_catalog/ # Valid service details
 │    ├── tool_catalog/           # Tools available
 │    ├── user/                   # App users
 │    └── vehicle/                # Vehicles
 ├── auth/                        # JWT Auth endpoints and guards
 ├── common/                      # Shared decorators, interceptors, and upload config
 ├── app.module.ts
 └── main.ts

prisma/
 └── schema.prisma                # Database schema
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18)
- npm or yarn
- MySQL/PostgreSQL instance

### Installation
```bash
# Clone repo
git clone https://github.com/franz1628/maintenancenest.git
cd maintenancenest

# Install dependencies
npm install
```

### Database Configuration
Edit `.env` file with your DB connection string:

```env
DATABASE_URL="mysql://root:password@localhost:3306/maintenance"
JWT_SECRET="YOUR_SUPER_SECRET_KEY"
```

---

### Migrate Database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### Run the Project
```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

API will be available at:
👉 http://localhost:3000

Swagger docs at:
👉 http://localhost:3000/api

---

## 📖 Example Module Architecture

This project is built around independent API modules, making it very scalable:
- **Authentication (`/auth/login`)**: Use your credentials to generate a valid Bearer Token. Keep the token to authenticate with guarded endpoints.
- **Catalogs**: Reference endpoints storing lists of available pieces, tools, and predefined services.
- **Service Process (`/service`)**: Connecting vehicles, mechanics, tools, and the chosen service catalogs to trace the execution history.

---

## 🧪 Testing
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

---

## 📜 License
MIT License – feel free to use this project for learning or production.
