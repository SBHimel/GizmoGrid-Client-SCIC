<div align="center">

# 🖥️ GizmoGrid — Server

TypeScript REST API backend for the **GizmoGrid** tech gadgets marketplace.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

[🌐 Live Demo](https://gizmogrid-kohl.vercel.app/) · [💻 Client Repo](https://github.com/SBHimel/GizmoGrid-Client-SCIC)

</div>

---

## ✨ Overview

This server provides the API that powers the GizmoGrid client: product listings, users and orders for Admin, Manager, Seller and Buyer roles.

## 🌟 Features

- RESTful API written in TypeScript
- MongoDB data storage
- CORS configured for the Next.js client
- Hot reload in development via Nodemon

## 🛠️ Tech Stack

- Node.js, Express.js
- TypeScript
- MongoDB
- Nodemon (dev)

## 📁 Project Structure

```
GizmoGrid-Server-SCIC/
├── index.ts          # Server entry point
├── nodemon.json      # Nodemon config
├── tsconfig.json     # TypeScript config
└── package.json
```

## 🚀 Getting Started

```bash
git clone https://github.com/SBHimel/GizmoGrid-Server-SCIC.git
cd GizmoGrid-Server-SCIC
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

Run:

```bash
npm run dev      # development with nodemon
```

## 📡 API Endpoints

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | `/products`       | Get all products     |
| GET    | `/products/:id`   | Get a single product |
| POST   | `/products`       | Add a product        |

> Replace this table with your actual routes.

## 👨‍💻 Author

Created by [S.B. Himel](https://github.com/SBHimel)
