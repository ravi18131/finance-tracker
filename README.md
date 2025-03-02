# Starter Template

Welcome to the **Starter Template**! This repository provides a full-stack template to quickly set up and build new projects using modern technologies.

## 🚀 Tech Stack

- **Frontend:** React (Vite) + Zustand (State Management) + ShadCN UI (with Tailwind CSS)
- **Backend:** Node.js + Express.js + TypeScript
- **Database:** Prisma ORM (with a seeder)
- **Validation:** Zod
- **File Uploading:** express-upload

## 📂 Project Structure

```
starter-template/
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
│   │   ├── store/      # Zustand store
│   │   ├── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│── README.md
```

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/ankitarima/stater-template-nodejs-react.git
cd stater-template-nodejs-react
```

### 2️⃣ Install Dependencies

#### Frontend

```sh
cd client
npm install
```

#### Backend

```sh
cd ../server
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

- Client: `http://localhost:5020`
- Server: `http://localhost:5021`

## 🔥 Features

- Fully typed TypeScript setup
- Zustand for global state management
- Prisma ORM with migrations and seeding
- Express.js API with structured controllers and routes
- File upload handling with `express-upload`
- Modern UI with ShadCN & Tailwind CSS
- Zod validation for safer API inputs

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Feel free to submit PRs or issues for enhancements and bug fixes. Happy coding! 🎉
