# Finance Tracker(FinTrack)

Welcome to the **Finance Tracker(FinTrack)**! This repository provides a full-stack template to quickly set up and build new projects using modern technologies.

## 🚀 Tech Stack

- **Frontend:** React 18+ (Vite) + Zustand (State Management) + ShadCN UI (with Tailwind CSS)
- **Backend:** Node.js + Express.js + TypeScript
- **Database:** PostgreSQL + Prisma ORM (with a seeder)
- **Validation:** Zod
- **Caching:** Redis
- **Charts:** Recharts

## 📂 Project Structure

```
finance-tracker/
│── server/            # Express.js server
│   ├── src/
|   ├───|── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── schema/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── server.ts
│   │   ├── prisma/
│   │       ├── schema.prisma
│   │       ├── seed.ts
│   ├── package.json
│   ├── tsconfig.json
│── client/           # React client (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│── README.md
```

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/ravi18131/finance-tracker.git
cd finance-tracker
```

### 2️⃣ Install Dependencies

#### Frontend

```sh
cd client
npm install
```

#### Backend

```sh
cd server
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the server directory by copying `.env.template` and updating values as needed.

```sh
cp server/.env.template server/.env
```

### 4️⃣ Setup Database (Prisma)

Ensure you have PostgreSQL/MySQL running and update `DATABASE_URL` in `.env`. Then run:

```sh
cd backend
npm run db:generate
npm run db:push
npm run db:seed
```

#### Build Redis Docker Server
```sh
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

### 5️⃣ Run the Project

#### Start Backend

```sh
cd server
npm run dev
```

#### Start Frontend

```sh
cd client
npm run dev
```

### 6️⃣ Access the App

Once both client and server are running, access the app at:

- Client: `http://localhost:5000`
- Server: `http://localhost:5021`

## 🔥 Features

- Fully typed TypeScript setup
- Context for global state management
- Prisma ORM with migrations and seeding
- Express.js API with structured controllers and routes
- Redis server for cache memory
- Rate limit middleware with `express-rate-limit`
- Role based middleware
- Modern UI with ShadCN & Tailwind CSS
- Zod validation for safer API inputs

## 📜 License

This project is licensed under the MIT License.
