# 🏢 Society Management App — Frontend

This is the **Next.js + TailwindCSS** frontend for the Society Management App. It supports:

- 🔐 Authentication (Login/Signup)
- 🧑‍💼 Admin Dashboard (Manage Flats, Owners)
- 👤 Owner Dashboard (Manage Flats, Tenants)
- 🧾 Role-based access (JWT)
- ⚡ API connected with NestJS backend

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/adityagadekar-codenote/society-mangement-frontend.git
cd society-mangement-frontend

## 2. Install dependencies
npm install
Make sure you’re using Node.js v18+

## ⚙️ Environment Variables
Create a .env.local file:
NEXT_PUBLIC_API_URL=http://localhost:3000
Change the URL if your backend runs on a different port.

## 🧪 Development
npm run dev
Now open:
👉 http://localhost:3001

## 🔐 Login Credentials (for testing)
Admi
Email: admin@example.com
Password: admin123

## 📁 Project Structure
csharp
Copy
Edit
society-frontend/
│
├── pages/             # Route-based pages (login, signup, admin, owner)
│
├── lib/               # Axios instance, auth utils (e.g., withAuth)
│
├── components/        # Reusable UI components
│
├── styles/            # Tailwind CSS config + global styles
│
├── public/            # Static assets
│
└── ...