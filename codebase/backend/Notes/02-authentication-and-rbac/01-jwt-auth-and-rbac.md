# 🔐 Module 2: Authentication (JWT) & Role-Based Access Control (RBAC)

---

## 📌 1. Humne Kya Banaya (What We Built)
- **User Authentication**: `/auth/signup` aur `/auth/login` endpoints banae.
- **Password Security**: `bcrypt` use karke passwords hash kiye.
- **Token Generation**: `@nestjs/jwt` se User ID aur Role payload ke sath JWT Access Token generate kiya.
- **Custom Auth Guard**: `JwtAuthGuard` & `JwtStrategy` implement kiya bearer token verify karne ke liye.
- **RBAC System**: `RolesGuard` aur `@Roles()` custom decorator ke zariye `ADMIN`, `OWNER`, aur `CUSTOMER` roles restrict kiye.
- **Param Decorator**: `@GetUser()` decorator banaya jo `req.user` se user details extract karta hai.

---

## 🧠 2. Kyun Banaya & Architectural Reasoning (The WHY)

### Q1: Passwords ko plain text ki jagah `bcrypt` se hash kyu kiya?
- Passwords kabhi bhi plain text mein DB mein save nahi hote (Security Breach protection). `bcrypt` ek **salted key derivation function** hai jo rainbow table attacks aur brute-force ko slow down karta hai.

### Q2: RBAC Guards ko Controller level par `@UseGuards(JwtAuthGuard, RolesGuard)` kyu lagaya?
- **Separation of Concerns**: Business logic (`Service`) ko pata nahi hona chahiye ki request authenticate hui hai ya nahi. Authentication aur Authorization infrastructure layer (Guards) ka kaam hai.
- **Execution Order**: NestJS pipeline mein pehle **Guards** chalaate hain (`JwtAuthGuard` -> `RolesGuard`), agar request invalid hoti hai toh controller handler tak request pahunchti hi nahi.

### Q3: `@GetUser()` Custom Decorator kyu banaya?
- Without decorator: Handler mein `req: Request` le kar `req.user.userId` manually extract karna padta jo repetitive aur error-prone hai.
- With decorator: `@GetUser('userId') userId: string` likh kar clean, type-safe data mil jata hai.

---

## ⚡ 3. Trade-offs (Option A vs Option B)

| Option | Advantage | Disadvantage | Verdict |
| :--- | :--- | :--- | :--- |
| **Option A: Session-based Auth (Cookies)** | Server can invalidate session anytime | Stateful, Horizontal scaling (Load Balancers) ke waqt Redis session store chahiye | ❌ Complex for multi-server microservices |
| **Option B: JWT Tokens (Selected)** | Stateless, Super fast verification across scaled servers | Token revoke karna mushkil (Refresh Token pattern needed) | ✅ Standard for Modern SaaS APIs |

---

## 🎯 4. Top Interview Questions & Answers (Hinglish Mein)

### ❓ Question 1: NestJS mein Guards vs Middleware mein kya difference hai?
> **Answer**: "Middleware request lifecycle mein pehle aata hai aur ise Execution Context ka pata nahi hota (jaise kon sa Handler execute hone wala hai). Guards Execution Context (`ExecutionContext`) ko access kar sakte hain, isiliye Guards ko pata hota hai ki agla route kon sa role demand kar raha hai. Auth aur Permission checking ke liye Guards best hain."

### ❓ Question 2: RolesGuard mein `@SetMetadata` aur `Reflector` ka kya kaam hai?
> **Answer**: "`@Roles('ADMIN')` decorator metadata set karta hai `@SetMetadata('roles', ['ADMIN'])`. `RolesGuard` ke andar `Reflector` class is metadata ko read karti hai aur logged-in user ke role se compare karke `true` ya `false` return karti hai."
