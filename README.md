# Amazon-style E-Commerce Platform

A production-quality full-stack e-commerce platform built with Next.js, Node.js, and PostgreSQL. This project replicates the core Amazon user experience including product browsing, detail views, cart management, and a multi-step checkout flow.

## 🚀 Features

-   **Product Listing**: Responsive grid layout with search and category filtering.
-   **Product Detail**: Image carousel, detailed specifications, and "Buy Box" integration.
-   **Shopping Cart**: Functional cart with quantity updates and item removal.
-   **Checkout Flow**: Shipping address collection and order summary review.
-   **Order Confirmation**: Persistent order history with unique IDs and delivery estimation.
-   **Clean Architecture**: Modular structure with separation of concerns.

## 🛠 Tech Stack

-   **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Axios, Lucide React.
-   **Backend**: Node.js, Express.js, PostgreSQL (pg-pool), Morgan (logging), CORS.
-   **Database**: PostgreSQL with normalized schema.

## 📂 Project Structure

```text
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── routes/          # API route definitions
│   ├── schema.sql       # Database schema
│   ├── seed.sql         # Sample data (20+ products)
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── app/         # Next.js pages
    │   ├── components/  # Reusable UI components
    │   ├── services/    # API integration services
    │   └── utils/       # Helper functions
    └── next.config.ts   # Next.js configuration
```

## 🗄 Database Schema

The application uses a normalized PostgreSQL schema:
-   `users`: User accounts (mock user ID 1 used for demo).
-   `categories`: Product categories (Electronics, Fashion, Books, Home).
-   `products`: Core product data (name, description, price, stock).
-   `product_images`: Multiple images per product.
-   `cart_items`: User-specific shopping cart state.
-   `orders`: Finalized orders with shipping details.
-   `order_items`: Snapshots of products at time of purchase.

## 🌟 Bonus Features Implemented

-   **User Authentication**: JWT-based secure login and signup with password hashing (Bcrypt).
-   **Order History**: Comprehensive view of past orders with item snapshots and status tracking.
-   **Wishlist**: Ability to save items for later, manage them in a dedicated view, and add directly to cart.
-   **Email Notifications**: Automatic order confirmation emails sent via Nodemailer on successful purchase.
-   **Responsive Design**: Full compatibility across mobile, tablet, and desktop devices.

## ⚙️ Setup Instructions

### Prerequisites
-   Node.js (v18+)
-   PostgreSQL

### 1. Database Setup
1.  Create a database named `ecommerce_db`.
2.  Update `backend/.env` with your `DATABASE_URL`.
3.  Run the core setup:
    ```bash
    cd backend
    node setup-db.js
    ```
4.  Apply bonus features schema:
    ```bash
    node apply-bonus.js
    ```

### 2. Backend Setup
```bash
cd backend
npm install
# Ensure .env contains:
# DATABASE_URL=...
# JWT_SECRET=your_secret_key
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_app_password
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📂 Project Structure Extensions

-   `backend/middleware/authMiddleware.js`: JWT protection for secure routes.
-   `backend/controllers/authController.js`: Account management logic.
-   `backend/controllers/wishlistController.js`: Wishlist persistence.
-   `frontend/src/app/(auth)`: New login and signup flows.
-   `frontend/src/app/orders`: Personal order history dashboard.
-   `frontend/src/app/wishlist`: Personalized saved items gallery.

## 🌐 Deployment Instructions

### Database (Neon/Supabase)
1.  Create a new PostgreSQL project on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).
2.  Run the content of `backend/schema.sql` and `backend/seed.sql` in the SQL editor.

### Backend (Render/Railway)
1.  Connect your GitHub repository to [Render](https://render.com).
2.  Set the Environment Variable `DATABASE_URL` to your Neon/Supabase connection string.
3.  Set Build Command: `npm install`
4.  Set Start Command: `node server.js`

### Frontend (Vercel)
1.  Push your code to GitHub.
2.  Import the project into [Vercel](https://vercel.com).
3.  Set Environment Variable `NEXT_PUBLIC_API_URL` to your deployed backend URL (e.g., `https://your-api.onrender.com/api`).
4.  Vercel will automatically detect Next.js and deploy.

## 📝 Credentials
For this demo, a mock user with `id: 1` is automatically used to manage cart and orders.
