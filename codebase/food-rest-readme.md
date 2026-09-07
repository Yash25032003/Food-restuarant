# 🍕 Enterprise Food Delivery & Management System

An enterprise-grade, scalable, and full-stack food ordering platform featuring a **Customer Application**, **Owner/Admin Dashboard**, and a **Real-Time Order Processing Engine**. Built with modern backend patterns including Microservices-ready modular structure, Caching, Event-Driven Background Queues, Load Balancing, and AI integrations.

---

## 🏗️ High-Level System Architecture

```
                               ┌───────────────────────────┐
                               │  Customer / Owner Client  │
                               │        (Next.js)          │
                               └─────────────┬─────────────┘
                                             │
                                             ▼
                               ┌───────────────────────────┐
                               │   Nginx Reverse Proxy &   │
                               │       Load Balancer       │
                               └─────────────┬─────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
       ┌───────────────────────────────┐           ┌───────────────────────────────┐
       │  NestJS App Server (Instance 1)│           │  NestJS App Server (Instance 2)│
       └───────────────┬───────────────┘           └───────────────┬───────────────┘
                       │                                           │
                       └─────────────────────┬─────────────────────┘
                                             │
         ┌───────────────────┬───────────────┴───────────────┬───────────────────┐
         ▼                   ▼                               ▼                   ▼
  ┌──────────────┐   ┌──────────────┐                ┌──────────────┐    ┌──────────────┐
  │ MongoDB DB   │   │ Redis Cache  │                │ BullMQ Queue │    │ Socket.io    │
  │ (Data Store) │   │ & Pub/Sub    │                │ (Worker Jobs)│    │ Gateway      │
  └──────────────┘   └──────────────┘                └──────────────┘    └──────────────┘
```

---

## 🛠️ Tech Stack & Key Concepts

### **Frontend**
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **State Management:** Zustand / Redux Toolkit
* **Real-time Engine:** Socket.io Client

### **Backend**
* **Framework:** NestJS (TypeScript, Modular Architecture)
* **Database & ORM:** MongoDB + Mongoose
* **Caching & Session Store:** Redis
* **Background Queues:** BullMQ + Redis Workers
* **Real-time Protocol:** WebSockets (Socket.io Gateway)
* **Authentication:** Access Tokens & Refresh Tokens (JWT) + RBAC (Role-Based Access Control)

### **DevOps & Infrastructure**
* **Containerization:** Docker & Docker Compose
* **Web Server & Proxy:** Nginx (Reverse Proxy, Load Balancer, SSL Termination)
* **Security:** NestJS Throttler, Rate-Limiting, Helmet, Secure HttpOnly Cookies

### **AI Capabilities**
* Automatic Dish Description & Tag Generation (OpenAI / Gemini API)
* Smart Cart Recommendations ("Pairing Suggestions")

---

## 📅 40-Day Step-by-Step Development Roadmap

| Phase | Duration | Core Focus & Milestones |
| :--- | :--- | :--- |
| **Phase 1** | Days 1–7 | **Backend Foundation:** NestJS Architecture, MongoDB Data Models, Auth System (JWT + Refresh Tokens), and RBAC Guards. |
| **Phase 2** | Days 8–14 | **Owner Panel & Core APIs:** Category & Product CRUD, Image Uploads (Cloudinary/S3), Admin Dashboard UI. |
| **Phase 3** | Days 15–21 | **Customer Frontend & Caching:** SSR/CSR Menu Page, Cart Management, Redis Caching, Order Placement APIs. |
| **Phase 4** | Days 22–27 | **Real-Time & Asynchronous Queues:** WebSockets Live Tracking, Sound Alerts, BullMQ Background Email/PDF Workers. |
| **Phase 5** | Days 28–34 | **DevOps & Load Balancing:** Dockerization, Multi-container Setup, Nginx Load Balancing, Redis Pub/Sub Adapter. |
| **Phase 6** | Days 35–40 | **AI Integration & Production Polish:** AI Content Generator, Smart Recommendations, DB Indexing, Security Hardening. |

---

## 📁 Repository & Folder Structure

```text
food-ordering-system/
├── apps/
│   ├── backend/             # NestJS API Application
│   │   ├── src/
│   │   │   ├── auth/        # Authentication & Guards
│   │   │   ├── categories/  # Category Management
│   │   │   ├── products/    # Product/Menu Management
│   │   │   ├── orders/      # Order Processing Module
│   │   │   ├── queues/      # BullMQ Background Workers
│   │   │   └── websockets/  # Socket.io Gateways
│   │   └── Dockerfile
│   │
│   ├── web-customer/        # Next.js Customer Frontend App
│   │   └── Dockerfile
│   │
│   └── web-owner/           # Next.js Owner Admin Dashboard App
│       └── Dockerfile
│
├── docker/
│   └── nginx/               # Nginx Reverse Proxy & Load Balancer Configs
│
├── docker-compose.yml       # Multi-container Orchestration
└── README.md
```

---

## ⚡ Key Features

### 👨‍🍳 Owner / Admin Panel
- [x] Manage Categories & Food Items (CRUD).
- [x] Real-time toggle for item availability ("In Stock" / "Out of Stock").
- [x] Real-time Incoming Order Alert (Pop-up sound & WebSocket board).
- [x] AI-assisted product description and tags generation.
- [x] Analytics dashboard for sales and top-performing dishes.

### 🍕 Customer Experience
- [x] Ultra-fast Menu Browsing powered by Redis caching.
- [x] Search, Filter by Category, and Veg/Non-Veg options.
- [x] Cart Management & Seamless Checkout experience.
- [x] Real-time Order Tracking (Placed → Preparing → Out for Delivery → Delivered).
- [x] AI-powered cart pairing suggestions.

---

## 🚀 Getting Started (Development Setup)

### Prerequisites
* **Node.js:** v18 or higher
* **Docker & Docker Compose**
* **MongoDB & Redis** (Local or Cloud Instances)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/food-ordering-system.git
cd food-ordering-system
```

### 2. Configure Environment Variables
Create `.env` files in both `backend` and `frontend` directories based on the `.env.example` templates provided.

### 3. Run with Docker Compose (Recommended)
Launch the entire system (Database, Redis, API Instances, Next.js Apps, Nginx) with a single command:

```bash
docker-compose up --build
```

Access the applications:
* **Customer Portal:** `http://localhost:3000`
* **Owner Dashboard:** `http://localhost:3001`
* **Backend API Gateway:** `http://localhost:4000/api`

---

## 🛡️ Security Measures
* Encrypted User Passwords via **bcrypt**.
* Access Tokens stored in-memory & Refresh Tokens stored in **HttpOnly, SameSite Cookies**.
* API Throttling & Rate-Limiting via **NestJS Throttler** and **Nginx**.
* CORS Protection and Data Sanitization pipes.

---

## 📜 License
This project is licensed under the **MIT License**.
