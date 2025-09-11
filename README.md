# 🚗 Vehicle Maintenance API

A RESTful API built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/) to manage vehicles, their maintenance records, and service schedules.

---

## ✨ Features
- CRUD operations for **vehicles**
- Manage **maintenance records** (oil changes, inspections, repairs, etc.)
- Track **service schedules** and upcoming appointments
- Modular structure using **NestJS modules**
- Database access powered by **Prisma ORM**
- Input validation with **class-validator**
- Built-in API documentation with **Swagger**

---

## 🛠️ Tech Stack
- [NestJS](https://nestjs.com/) – Node.js framework
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript
- [Prisma](https://www.prisma.io/) – Next-gen ORM
- [MySQL/PostgreSQL](https://www.postgresql.org/) – Database
- [Swagger](https://swagger.io/) – API documentation

---

## 📂 Project Structure
```
src/
 ├── vehicles/
 │    ├── vehicles.controller.ts
 │    ├── vehicles.module.ts
 │    ├── vehicles.service.ts
 ├── maintenance/
 │    ├── maintenance.controller.ts
 │    ├── maintenance.module.ts
 │    ├── maintenance.service.ts
 ├── prisma/
 │    └── prisma.service.ts
 ├── app.module.ts
 └── main.ts

prisma/
 └── schema.prisma
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
git clone https://github.com/your-username/vehicle-maintenance-api.git
cd vehicle-maintenance-api

# Install dependencies
npm install
```

### Database Configuration
Edit `prisma/schema.prisma` with your DB provider and connection string:

```prisma
datasource db {
  provider = "mysql" // or "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Vehicle {
  id          Int           @id @default(autoincrement())
  make        String
  model       String
  year        Int
  maintenance Maintenance[]
}

model Maintenance {
  id         Int      @id @default(autoincrement())
  description String
  date        DateTime @default(now())
  vehicleId   Int
  vehicle     Vehicle   @relation(fields: [vehicleId], references: [id])
}
```

Then create a `.env` file:
```env
DATABASE_URL="mysql://root:password@localhost:3306/vehicle_db"
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

## 📖 Example Endpoints

- **GET** `/vehicles` → list all vehicles
- **POST** `/vehicles` → add a new vehicle
- **GET** `/maintenance/:id` → get maintenance record by ID
- **POST** `/maintenance` → add maintenance entry

---

## 🧪 Testing
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

---

## 🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss what you’d like to change.

---

## 📜 License
MIT License – feel free to use this project for learning or production.
