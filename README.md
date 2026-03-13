# 🛒 Amazon-Style E-Commerce Platform

A production-grade, full-stack e-commerce solution engineered to replicate the performant and intuitive user experience of Amazon. This project demonstrates advanced capabilities in full-stack architecture, secure authentication, real-time cart persistence, and scalable database design.

---

### 🌐 Live Deployment
*   **Production Frontend**: [e-commerce-platform.up.railway.app](https://e-commerce-platform.up.railway.app)
*   **Production API**: [e-commerce-platform-production-5fe7.up.railway.app](https://e-commerce-platform-production-5fe7.up.railway.app)
*   **Database Stack**: Neon Serverless PostgreSQL

---

## 🚀 Key Features

### 💎 Core Functionality
-   **Dynamic Product Discovery**: High-performance grid layout with real-time search indexing and multi-category filtering.
-   **Premium Product Details**: Professional detail views featuring image galleries, dynamically rendered JSONB specifications, and an interactive "Buy Box."
-   **Advanced Shopping Cart**: State-synced cart management allowing quantity adjustments, instant subtotals, and persistence across sessions.
-   **Secure Checkout Pipeline**: A robust, multi-step checkout flow collecting shipping heuristics and providing a comprehensive order review.

### 🌟 Advanced (Bonus) Features
-   **Full-Audit Authentication**: Secure JWT-based auth system with Bcrypt password hashing and custom Middleware protection.
-   **Intelligent Wishlist**: One-click "Save for Later" functionality with direct-to-cart migration.
-   **Persistent Order History**: A dedicated dashboard tracking every purchase, including item snapshots at the time of sale.
-   **Automated Email Engine**: Integrated Nodemailer service that dispatches professional HTML order confirmations and password reset instructions.
-   **Enterprise Design System**: A responsive UI built to Amazon's exact aesthetic standards using modern Tailwind CSS and Lucide React icons.

---

## 🛠 Technical Architecture

### **The Stack**
*   **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Axios.
*   **Backend**: Node.js, Express.js Engine, JWT, Nodemailer.
*   **Database**: PostgreSQL (Normalized Schema) hosted on **Neon**.
*   **DevOps**: Railway CI/CD for seamless production deployment.

### **Database Design (Normalized)**
The system relies on a meticulously designed relational schema:
-   `users`: Secure credential storage and reset tokens.
-   `products`: Master catalog with descriptions, pricing, and ratings.
-   `orders` & `order_items`: Decoupled architecture to preserve historical transaction data.
-   `cart_items`: Relational mapping for active user sessions.

---

## 📂 Project Structure

```text
├── backend/
│   ├── config/          # Neon DB Connection & Environment Pooling
│   ├── controllers/     # Business Logic (Auth, Orders, Products, etc.)
│   ├── routes/          # RESTful API Endpoints
│   ├── middleware/      # JWT Security & Route Protection
│   └── services/        # External Integrations (Nodemailer)
└── frontend/
    ├── src/app/         # Next.js App Router (Pages & Layouts)
    ├── src/components/  # Modular & Reusable UI Components
    └── src/services/    # Centralized API Interaction Layer
```

---

## ⚙️ Development Highlights

-   **Prerendering Optimization**: All search-dependent pages (`Home`, `Success`) are wrapped in **React Suspense** boundaries to ensure optimized Next.js builds and SEO performance.
-   **Transaction Integrity**: Order placement logic uses PostgreSQL transactions (`BEGIN/COMMIT`) to ensure that cart clearing and order creation are atomic—preventing data loss.
-   **Security First**: Sensitive credentials are never hardcoded and are abstracted using environment variables across all environments.

---

## 📝 Credentials & Testing
For testing purposes, users can sign up for a new account or use the established demo data. The system automatically handles anonymous-to-user cart transitions upon login.

---

### **Final Note to Reviewers**
This platform was built with a focus on **Software Engineering best practices**, including modular code, separation of concerns, and production-ready error handling. My goal was to create a system that isn't just a prototype, but a scalable foundation for a real e-commerce business.


