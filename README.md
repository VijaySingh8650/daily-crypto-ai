# 📌 Daily Crypto AI

A full-stack web application built with **ReactJS**, **TypeScript**, **Tailwind CSS**, **Redux**, **ExpressJS**, **MongoDB**, and **ZOD**.

---

## 🚀 Tech Stack

### **Frontend:**
- ✅ ReactJS (with Vite)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Redux

### **Backend:**
- ✅ ExpressJS
- ✅ TypeScript
- ✅ ZOD (for validation)
- ✅ MongoDB

---

## 🌐 Live URLs

- 🔹 **Frontend:** [Daily Crypto AI](https://daily-crypto-ai.vercel.app)
- 🔹 **Backend:** [API Server](https://daily-crypto-ai.onrender.com/)

---

## 🛠 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/daily-crypto-ai.git
cd daily-crypto-ai
```

2️⃣ Frontend Setup
```bash
cd frontend
npm install   # Install dependencies
npm run dev   # Start the development server
```

3️⃣ Backend Setup
```bash
cd backend
npm install   # Install dependencies
npm run start # Start the backend server
```


## Frontend Features 

✅ Login Page: Allows users to log in and authenticate.

✅ Home Page: A protected route that is only accessible after logging in.

✅ Private Routes: Users cannot access the home page without logging in.

✅ State Management: Uses Redux for managing authentication and global state.


## Backend API Endpoints 

1️⃣ Authentication Routes

POST /api/auth/login → Allows users to log in.

POST /api/auth/register → Allows users to register.

2️⃣ Books Routes

GET /api/books → Fetch all books.

POST /api/books → Add a new book.

GET /api/books/:id → Get a book by its ID.

PUT /api/books/:id → Update a book.

DELETE /api/books/:id → Delete a book.



