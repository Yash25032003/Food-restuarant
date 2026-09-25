# 🗄️ Module 4: Data Modeling, Schemas & Entity Relationships

---

## 📌 1. Humne Kya Banaya (What We Built)
- **User Schema** ([user.schema.ts](file:///g:/August-2026-Learning/Food-restuarant/codebase/backend/src/users/user.schema.ts)): Email, Hashed Password, Name, Role (`ADMIN`, `OWNER`, `CUSTOMER`).
- **Restaurant Schema** ([restaurant.schema.ts](file:///g:/August-2026-Learning/Food-restuarant/codebase/backend/src/restaurants/restaurant.schema.ts)): Name, Description, Address, Phone, Image, `ownerId` (ref: User), `isActive`.
- **Category Schema** ([category.schema.ts](file:///g:/August-2026-Learning/Food-restuarant/codebase/backend/src/categories/category.schema.ts)): Name, `restaurantId` (ref: Restaurant), `isActive`.
- **Product Schema** ([product.schema.ts](file:///g:/August-2026-Learning/Food-restuarant/codebase/backend/src/products/product.schema.ts)): Name, Description, Price, Image, `restaurantId` (ref: Restaurant), `categoryId` (ref: Category), `isAvailable`, `isVeg`.

---

## 🧠 2. Kyun Banaya & Architectural Reasoning (The WHY)

### Q1: MongoDB (NoSQL) mein Relational Foreign Keys (`ref`) kyu use kiye?
- Mongoose mein `type: Schema.Types.ObjectId, ref: 'User'` use karne se hum **Referential Integrity** maintain karte hain.
- Jab hum `populate('ownerId')` call karte hain, toh Mongoose automatic JOIN query build kar deta hai.

### Q2: Products mein `restaurantId` aur `categoryId` dono kyu rakhe?
- **Fast Tenant Querying**: Jab customer kisi Restaurant ka Menu dekhta hai, toh query single indexed field `db.products.find({ restaurantId: "..." })` par hit karti hai, jo ultra-fast execute hoti hai.

---

## ⚡ 3. Trade-offs (Option A vs Option B)

| Option | Advantage | Disadvantage | Verdict |
| :--- | :--- | :--- | :--- |
| **Option A: Embedding Categories & Products inside Restaurant Document** | Single read query fetches whole menu | Document size 16MB limit breach ho sakta hai, updating single product becomes complex | ❌ Bad for large menus |
| **Option B: Referenced Schemas with `restaurantId` Index (Selected)** | Unlimited products, easy update/delete, fast pagination | Slightly more queries (resolved with DB Indexing & Redis Caching later) | ✅ Best for Scalable System |

---

## 🎯 4. Top Interview Questions & Answers (Hinglish Mein)

### ❓ Question 1: MongoDB mein Embedding vs Referencing kab choose karna chahiye?
> **Answer**: "Embedding tab use karte hain jab 1-to-Few relationship ho aur sub-document standalone exist na karta ho (jaise Address inside User). Referencing tab use karte hain jab 1-to-Many ya Many-to-Many relationship ho, data size 16MB document limit ko surpass kar sakta ho, ya items ko independently query/update karna ho (jaise Products inside Restaurant)."
