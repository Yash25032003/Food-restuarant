# 🎯 Master Backend System Design & Interview Question Bank (Hinglish)

---

## 📌 Master Revision Guide for Food SaaS Application

### Q1: Apne Food SaaS project ke Backend Architecture ke baare mein samjhao.
> **Answer**: 
> "Mera project ek Enterprise-grade Multi-Tenant Food Delivery Platform backend hai jo **NestJS (TypeScript)**, **MongoDB + Mongoose**, aur **Bun/Node** environment par built hai.
> 
> Architecture 3 core layers mein divided hai:
> 1. **Controllers**: HTTP Routing, DTO Validation, and Request Guards.
> 2. **Services**: Core Business Logic, Tenancy Ownership checks, and Data Manipulation.
> 3. **Data Access / Mongoose Schemas**: MongoDB Models with indexing and referential integrity.
> 
> System mein Security ke liye JWT Access Tokens + HTTP-Only Cookies and Role-Based Access Control (`ADMIN`, `OWNER`, `CUSTOMER`) Guards implemented hain."

---

### Q2: Authentication & Security Flow kaise kaam karta hai aapke project mein?
> **Answer**: 
> 1. Jab User `/auth/login` hit karta hai, email se User lookup hota hai aur `bcrypt.compare()` se password verify hota hai.
> 2. Valid hone par, JWT Service `userId` aur `role` payload ke sath Signed Token return karti hai.
> 3. Protected routes (jaise Restaurant Creation/Update) par `@UseGuards(JwtAuthGuard, RolesGuard)` chalta hai.
> 4. `JwtAuthGuard` Bearer token validate karta hai aur `req.user` set karta hai.
> 5. `RolesGuard` `@Roles('OWNER', 'ADMIN')` decorator se metadata read karke permission grant karta hai."

---

### Q3: Multi-Tenancy Isolation kaise guarantee ki hai aapne?
> **Answer**: 
> "Hum Shared Database with Discriminator/Tenant ID approach follow karte hain. Every `Restaurant`, `Category`, aur `Product` document ke paas `restaurantId` ya `ownerId` ki reference hoti hai.
> Jab koi Owner apna Restaurant update karta hai (`PUT /restaurants/:id`), hum database se existing record fetch karke compare karte hain:
> `if (restaurant.ownerId.toString() !== loggedInUserId && userRole !== 'ADMIN') throw new ForbiddenException()`
> Isse IDOR (Insecure Direct Object Reference) vulnerabilities complete protect ho jaati hain."
