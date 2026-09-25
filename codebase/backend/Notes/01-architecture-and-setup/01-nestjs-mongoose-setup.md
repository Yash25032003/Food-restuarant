# 🏗️ Module 1: NestJS Core Setup & MongoDB Database Connection

---

## 📌 1. Humne Kya Banaya (What We Built)
- NestJS CLI ke sath backend initialize kiya with **TypeScript** & **Bun/Node** runtime.
- Environment variables management ke liye `@nestjs/config` (`ConfigModule`) setup kiya.
- MongoDB Atlas / Local MongoDB connection ke liye `@nestjs/mongoose` (`MongooseModule`) integrate kiya.
- Root module (`AppModule`) ke andar database configuration `forFeature` aur `forRootAsync` patterns se setup kiya.

---

## 🧠 2. Kyun Banaya & Architectural Reasoning (The WHY)

### Q1: Plain Express.js ki jagah NestJS kyu chuna?
- **Express.js Problem**: Express mein koi fixed architecture nahi hota. Scalable production backend mein alag-alag developers alag tarike se code likhte hain jisse codebase mess ho jata hai.
- **NestJS Solution**: NestJS ek **opinionated framework** hai jo **Angular-inspired Modular Architecture** (Controllers, Services, Modules) force karta hai.
- **Dependency Injection (DI)**: NestJS mein classes (Services) ko manually `new Service()` karke instantiate nahi karna padta. NestJS Inversion of Control (IoC) container dependency inject karta hai, jisse unit testing aur mocking super easy ho jaati hai.

### Q2: Database Connection `forRootAsync` se kyu kiya instead of `forRoot`?
- **Sync (`forRoot`) Issue**: Server start hote hi agar database URL env variable se padhni ho, toh synchronous loading par `.env` file abhi load nahi hui hoti aur app crash kar sakta hai.
- **Async (`forRootAsync`) Benefit**: Yeh ensure karta hai ki `ConfigModule` pehle run ho, `.env` file se `MONGO_URI` safely fetch ho, aur fir MongoDB connection create ho.

---

## ⚡ 3. Trade-offs (Option A vs Option B)

| Option | Advantage | Disadvantage | Verdict |
| :--- | :--- | :--- | :--- |
| **Option A: Plain Express.js** | Unopinionated, minimal boilerplate | High technical debt, scaling issues in large teams | ❌ Not ideal for enterprise SaaS |
| **Option B: NestJS (Selected)** | Built-in DI, Modular structure, Type-safe, Enterprise standards | Slightly higher learning curve and boilerplate | ✅ Best for scalable Multi-tenant SaaS |

---

## 🎯 4. Top Interview Questions & Answers (Hinglish Mein)

### ❓ Question 1: NestJS mein Dependency Injection (DI) kaise kaam karta hai aur iska kya fayda hai?
> **Answer**: "Interview mein aise bolein: NestJS IoC (Inversion of Control) container feature use karta hai. Jab hum kisi Service par `@Injectable()` decorator lagate hain aur Controller ke `constructor(private readonly myService: MyService)` mein passes karte hain, toh NestJS khud us Service ka singleton instance create aur inject kar deta hai. Iska sabse bada fayda ye hai ki code loosely-coupled rehta hai aur Unit Testing ke waqt hum real service ki jagah Mock Service easily inject kar sakte hain."

### ❓ Question 2: `ConfigModule` ko `isGlobal: true` kyu set karte hain?
> **Answer**: "`isGlobal: true` set karne se humein har sub-module (AuthModule, RestaurantModule) mein baar-baar `ConfigModule` import nahi karna padta. `ConfigService` pure app mein kahin bhi inject hokar env variables read kar sakta hai."
