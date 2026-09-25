# 🏬 Module 3: Multi-Tenancy & Restaurant Management

---

## 📌 1. Humne Kya Banaya (What We Built)
- **Multi-Tenant Schema**: `Restaurant` schema banaya jisme `ownerId` ref to `User` store hota hai.
- **CRUD Operations**: Restaurant creation, reading (list/details), updating, aur deletion logic.
- **Ownership Authorization**: `PUT /restaurants/:id` aur `DELETE /restaurants/:id` mein ownership check lagaya taaki ek Owner kisi doosre Owner ka restaurant edit/delete na kar sake.
- **Admin Privileges**: `ADMIN` role ko override permissions di jisse woh kisi bhi restaurant ko update/delete kar sake.

---

## 🧠 2. Kyun Banaya & Architectural Reasoning (The WHY)

### Q1: Multi-Tenancy kya hai aur Multi-Vendor Food App mein iska kya role hai?
- Multi-tenancy ka matlab hai ek hi application aur database infrastructure par multiple restaurants (tenants) ka data securely isolate rehna.
- **Data Security Risk (IDOR - Insecure Direct Object Reference)**: Agar hum check na karein ki `req.user.userId === restaurant.ownerId`, toh ek malicious restaurant owner Postman se doosre restaurant ka ID bhej kar unka menu ya details edit kar sakta hai.

### Q2: Ownership verification Service layer mein kyu ki?
- Service layer business rules ki owner hoti hai. ID fetch karke pehle database check karna ki record kiska hai aur fir request user ke ID se verify karna sabse secure pattern hai.

---

## ⚡ 3. Trade-offs (Option A vs Option B)

| Option | Advantage | Disadvantage | Verdict |
| :--- | :--- | :--- | :--- |
| **Option A: Separate DB per Tenant** | Maximum security isolation | Expensive, hard to maintain schema migrations across 100s of DBs | ❌ Overkill for Food SaaS |
| **Option B: Shared DB with Tenant ID filtering (Selected)** | Cost-effective, easy maintenance, fast querying | Strict ownership checks at API level mandatory | ✅ Industry standard for scalable SaaS |

---

## 🎯 4. Top Interview Questions & Answers (Hinglish Mein)

### ❓ Question 1: SaaS Application mein Insecure Direct Object Reference (IDOR) vulnerability se kaise bachte hain?
> **Answer**: "IDOR tab hota hai jab API endpoint resource ID (jaise `restaurantId`) receive karta hai lekin verify nahi karta ki URL hit karne wala user us resource ka owner hai ya nahi. Humne Restaurant Service mein strict Tenancy Check lagaya hai: `if (restaurant.ownerId.toString() !== user.userId && user.role !== UserRole.ADMIN) throw new ForbiddenException()`."

### ❓ Question 2: `RestaurantModule` mein `AuthModule` ko import kyu karna pada?
> **Answer**: "Jab hum `RestaurantController` mein `@UseGuards(JwtAuthGuard)` lagate hain, toh `JwtAuthGuard` ko Passport strategy aur `AuthModuleOptions` chahiye hoti hain. `AuthModule` ko `RestaurantModule` ke `imports` array mein add karne se dependency injection container resolution clean ho jata hai."
