# 🛍️ Full-Stack E-Commerce Website

A full-stack e-commerce application built as part of the **Transcurators Full Stack Developer Assessment**.  
The project demonstrates modern frontend and backend practices with authentication, cart management, wishlist, and checkout flow.

---

## 🚀 Live Demo

**Demo:** [https://trans-curators.vercel.app/](https://trans-curators.vercel.app/)

_(Replace with your actual deployed URLs once hosted — e.g., Vercel + Render / Railway / EC2 / Docker setup)_

---

## 🧠 Overview

This project is a fully functional e-commerce platform where users can:

- Browse and search products.
- View detailed product information.
- Add or remove items from the cart and wishlist.
- Register, log in, and persist authentication via JWT.
- Proceed to checkout with optional Stripe test-mode payments.

The backend is powered by **Next.js** with **MongoDB**, exposing REST APIs for all user and product operations.

---

## 🏗️ Tech Stack

### Frontend

- **React / Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** for global state management (cart, wishlist)
- **Lucide React** for UI icons
- **Swiper** for subtle animations

### Backend

- **Next.js Server Actions**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **bcryptjs** for password hashing

### Deployment

- **Hosted demo** on **Vercel**

---

## 📄 Features

| Feature                    | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| 🔐 **User Authentication** | Register, login, JWT-based session persistence                   |
| 🛒 **Cart System**         | Add, remove, and update product quantities                       |
| 💖 **Wishlist**            | Toggle favorite products, synced with MongoDB                    |
| 🧾 **Checkout Page**       | Displays cart summary, shipping, and simulated payment           |
| 📱 **Responsive UI**       | Optimized for both mobile and desktop screens                    |
| ⚡ **Real-time Feedback**  | Loading states, success/error toasts, disabled buttons on action |
| 🧩 **RESTful APIs**        | Cleanly structured routes for all CRUD operations                |
| 🧱 **Code Structure**      | Modular, scalable folder architecture following best practices   |

---
