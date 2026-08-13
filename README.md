# TaskPulse - Personal Task & Habit Tracker

TaskPulse is a modern, high-performance personal task and habit tracking web application built with a **Spring Boot 3 REST API** backend and a **Vite + React.js** frontend.

---

## 🌟 Tech Stack

- **Backend**: Java 17+, Spring Boot 3.2, Spring Data JPA, Spring Validation
- **Database**: PostgreSQL (Cloud free-tier via Neon / Supabase) with H2 in-memory fallback for zero-config local development
- **Frontend**: React 18 (Vite), Axios API client, Lucide Icons, Glassmorphism CSS design system
- **Deployment**: Render (Backend Web Service) & Vercel (Frontend SPA Hosting)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Java 17+** (Java 17, 21, or 23)
- **Node.js 18+** & npm

---

### 1. Run Backend Server (Spring Boot)

```bash
cd backend
# Using Maven Wrapper or local Maven
mvn spring-boot:run
```
The REST API server will start at: `http://localhost:8080`

#### Backend REST Endpoints:
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Fetch all tasks (supports `?search=` and `?completed=`) |
| `GET` | `/api/tasks/{id}` | Fetch single task details |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/{id}` | Update existing task details |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle task completion status |
| `DELETE` | `/api/tasks/{id}` | Delete task |
| `GET` | `/api/tasks/metrics` | Get productivity counter stats |

---

### 2. Run Frontend Client (Vite + React)

```bash
cd frontend
npm install
npm run dev
```
Open your browser at: `http://localhost:5173`

---

## ☁️ Production Deployment Guide

### Phase 1: Deploy Spring Boot Backend to Render

1. **Push Code to GitHub**:
   Ensure your project repository is uploaded to GitHub.

2. **Create Render Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
   - Connect your GitHub repository.
   - Set **Root Directory**: `backend`
   - Set **Environment**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests` (or `mvn clean package -DskipTests`)
   - **Start Command**: `java -jar target/taskpulse-0.0.1-SNAPSHOT.jar`

3. **Configure Database Environment Variables**:
   In Render -> Web Service -> **Environment**, add:
   - `DATABASE_URL`: `jdbc:postgresql://<your-host>:5432/<dbname>?sslmode=require`
   - `SPRING_DATASOURCE_USERNAME`: `<your-db-user>`
   - `SPRING_DATASOURCE_PASSWORD`: `<your-db-password>`
   - `SPRING_DATASOURCE_DRIVER`: `org.postgresql.Driver`

---

### Phase 2: Deploy React Frontend to Vercel

1. **Connect Vercel to GitHub**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** -> **Project**.
   - Import your TaskPulse repository.

2. **Configure Project Settings**:
   - **Root Directory**: Select `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Set Production API Base URL**:
   Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://<your-render-app-name>.onrender.com`

4. **Deploy**:
   Click **Deploy**! Vercel will build and serve your app globally.

---

## 🧪 Testing & Verification

- **Frontend Production Build Test**:
  ```bash
  cd frontend
  npm run build
  ```
- **H2 Local Console**:
  When running locally, inspect the H2 database at `http://localhost:8080/h2-console` with JDBC URL `jdbc:h2:mem:taskpulsedb`.
