# FarmLokal Backend Challenge

Production-ready backend implementation simulating real-world backend problems at FarmLokal.

This project demonstrates:

- OAuth-ready authentication (JWT-based)
- High-performance product listing API
- Cursor-based pagination
- Redis caching (Cache-Aside pattern)
- External API integration with retry mechanism
- Clean architecture
- Scalability and reliability best practices

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Redis
- JWT
- Axios

---

## 📂 Project Structure

src/
├── app.js
├── server.js
├── config/
│   ├── db.js
│   ├── redis.js
├── controllers/
│   ├── auth.controller.js
│   ├── product.controller.js
├── services/
│   ├── auth.service.js
│   ├── product.service.js
│   ├── external.service.js
├── repositories/
│   ├── product.repository.js
├── middleware/
│   ├── auth.middleware.js
├── utils/
│   ├── jwt.js
│   ├── retry.js

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

git clone <repo_url>
cd <project_name>

---

### 2️⃣ Install Dependencies

npm install

---

### 3️⃣ Environment Variables

Create a `.env` file in the root directory:

PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/farmlokal
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecretkey

---

### 4️⃣ Run PostgreSQL & Redis

Make sure:

- PostgreSQL is running
- Redis server is running

---

### 5️⃣ Run Server

npm run dev

or

node src/server.js

Server will run at:

http://localhost:3000

---

## 📦 Database Schema

Example `products` table:

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  category_id INT,
  price NUMERIC,
  rating NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

Recommended Indexes:

CREATE INDEX idx_category ON products(category_id);
CREATE INDEX idx_price ON products(price);
CREATE INDEX idx_rating ON products(rating);
CREATE INDEX idx_created_at ON products(created_at);

---

## 🚀 API Endpoints

### Health Check

GET /health

Response:
OK

---

### Get Products (Public)

GET /products?category=1&limit=20&cursor=10

Query Parameters:
- category (optional)
- limit (default: 20)
- cursor (for pagination)

Response:

{
  "data": [...],
  "nextCursor": 45
}

Pagination is cursor-based for high performance.

---

### Get Products (Protected)

GET /secure-products

Headers:
Authorization: Bearer <JWT_TOKEN>

---

## ⚡ Performance Features

- Connection pooling (PostgreSQL)
- Indexed queries
- Cursor-based pagination (no OFFSET)
- Redis cache-aside strategy
- Response projection (no SELECT *)

---

## 🔐 Authentication Strategy

- JWT access tokens (15 min expiry)
- Stateless backend
- Middleware-based protection
- OAuth-ready architecture

---

## 🌍 External API Integration

- 2 second timeout
- Exponential backoff retry
- Fail-safe error handling

---

## 🧠 Caching Strategy

Cache-aside pattern:

1. Check Redis
2. If hit → return cached response
3. If miss → fetch from DB → store in Redis → return

TTL: 60 seconds for product listings

---

## 📈 Scalability Considerations

- Stateless service
- Horizontal scaling ready
- Redis for shared cache
- Database indexing
- Retry logic for reliability
- Graceful error handling

---

## 🧪 Future Improvements

- Refresh token implementation
- Circuit breaker pattern
- Rate limiting
- Swagger documentation
- Docker setup
- Unit & integration tests
- Monitoring (Prometheus + Grafana)

---

## 👨‍💻 Author

Backend implementation built as part of FarmLokal Backend Engineering Challenge.

