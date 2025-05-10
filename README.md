# Mini E-Commerce Platform

A clean and minimal e-commerce platform built with **Next.js**, **Node.js (Express)**, **PostgreSQL**, **Prisma**, and **Cloudinary**.

🔗 **Live Demo**: [https://mini-ecommerce-platform-nqmi.onrender.com/](https://mini-ecommerce-platform-nqmi.onrender.com/)

**Screenshots**:
- ![Product Submission](https://imagizer.imageshack.com/img923/3807/hbwRYO.png)
- ![Product Listing]()

---

## 🚀 Goal

Build a minimal e-commerce web app that includes:
- A tab to submit products (e.g., chairs, tables, desktops, phones, etc.)
- A tab to view submitted products in a clean layout
- A **smart contextual search** to find products efficiently

---

## 🧱 Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js with Express (via Next.js API routes)
- **Database**: PostgreSQL (hosted on Railway)
- **ORM**: Prisma
- **Image Hosting**: Cloudinary
- **Hosting**: Render
- **Version Control**: GitHub

---

## ✅ What's Working

- [x] Product submission form with Product name, Price, Description and Image
- [x] View all submitted products
- [x] Product listing with responsive design
- [x] Smart contextual search for products
- [x] PostgreSQL integration using Prisma ORM
- [x] API routes for GET and POST products
- [x] Image upload support using Cloudinary
- [x] Clean and modern UI with Tailwind CSS
- [x] Deployed and live on Render

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/princetiwari26/Mini-E-Commerce-Platform
cd Mini-E-Commerce-Platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your PostgreSQL and Cloudinary credentials:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server

```bash
npm run dev
```

Your app will be running at `http://localhost:3000`.

---

## 🧠 Smart Search

Implemented a simple full-text search using PostgreSQL's `ILIKE` for case-insensitive matching. This allows users to search products by title, description, or category with partial or contextual matches.

---

## 📷 Image Upload with Cloudinary

Product images are uploaded and hosted via [Cloudinary](https://cloudinary.com/). Credentials must be stored securely in the `.env` file:

```js
cloud_name: process.env.CLOUDINARY_CLOUD_NAME
api_key: process.env.CLOUDINARY_API_KEY
api_secret: process.env.CLOUDINARY_API_SECRET
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙋‍♂️ Author

Developed by [Prince Tiwari](https://github.com/princetiwari26)
