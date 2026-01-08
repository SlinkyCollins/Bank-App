<img width="1907" height="956" alt="nairanest hero" src="https://github.com/user-attachments/assets/4d851794-00ab-4786-9804-bbe0668e366b" />

# NairaNest - Full Stack Banking Application

![Build Status](https://img.shields.io/badge/Build-Passing-success) ![Stack](https://img.shields.io/badge/Stack-MERN-blue) ![License](https://img.shields.io/badge/License-MIT-green)

**NairaNest** is a comprehensive, full-stack banking platform designed to simulate modern financial operations. It features a secure, high-performance REST API backed by **ACID-compliant transactions** and a responsive React frontend with distinct dashboards for Users and Administrators.

### 🚀 Key Features

#### 🛡️ Security & Architecture
* **ACID-Compliant Transactions:** Uses MongoDB Sessions (`startSession`) to ensure transfers are atomic. If a debit succeeds but the credit fails, the entire operation rolls back, guaranteeing data integrity.
* **Role-Based Access Control (RBAC):** Distinct Middleware protection for `User` vs. `Admin` routes.
* **Rate Limiting:** Custom brute-force protection that locks accounts for 5 minutes after 5 failed login attempts.
* **JWT Authentication:** Secure stateless authentication with automatic session expiration.

#### 👤 User Dashboard
* **Real-time Banking:** Deposit, Withdraw, and Transfer funds instantly.
* **Visual Analytics:** Chart.js integration to visualize income/expense trends.
* **Beneficiary Management:** Save and manage frequent payees for one-click transfers.
* **Transaction History:** Filterable and searchable history (by date, type, or status).
* **Profile Management:** Update details and change passwords securely.

#### 👮 Admin Dashboard
* **System Overview:** Real-time counters for total users and transaction volume.
* **User Management:** View all registered users and their account statuses.
* **Audit Logs:** Full visibility into all system transactions for compliance.

---

### 🛠️ Tech Stack

**Frontend (Client)**
* **Framework:** React (Vite)
* **State Management:** Redux Toolkit
* **UI Component Library:** Material UI (MUI)
* **HTTP Client:** Axios
* **Visualization:** Chart.js

**Backend (Server)**
* **Runtime:** Node.js & Express
* **Database:** MongoDB (Mongoose ODM)
* **Email Services:** Nodemailer (SMTP)
* **Security:** BCrypt (Hashing), JWT (Tokens), Custom Rate Limiter

### 📂 Project Structure

```bash
├── bank-app/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── Components/     # UI Components (Dashboards, Modals)
│   │   ├── Redux/          # Global State Slices
│   │   └── ...
├── node/                   # Backend (Express API)
│   ├── Controllers/        # Business Logic (Transactions, Auth)
│   ├── Models/             # Mongoose Schemas
│   ├── Routes/             # API Endpoints
│   ├── Middleware/         # Auth & Admin Verification
│   └── index.js            # Server Entry Point

```

---

### ⚡ Installation & Setup

#### Prerequisites

* Node.js (v16+)
* MongoDB (Local or Atlas Connection String)

#### 1. Backend Setup

Clone the repo: `git clone https://github.com/SlinkyCollins/Bank-App.git`

Navigate to the server directory and install dependencies:

```bash
cd node
npm install

```

Create a `.env` file in the `node/` directory:

```env
PORT=5000
URL=mongodb+srv://<your-mongo-url>
SECRET=your_jwt_secret_key
USER_EMAIL=your_email_for_alerts@gmail.com
USER_PASS=your_email_app_password

```

Start the server:

```bash
npm start
# Server runs on http://localhost:5000

```

#### 2. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd bank-app
npm install

```

Create a `.env` file in the `bank-app/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000

```

Start the React development server:

```bash
npm run dev
# App runs on http://localhost:5173

```

### 🔌 API Documentation

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| **Auth** |  |  |  |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login & receive JWT | Public |
| **Transactions** |  |  |  |
| `POST` | `/api/transactions/deposit` | Add funds to account | User |
| `POST` | `/api/transactions/transfer` | Transfer to another user | User |
| `GET` | `/api/transactions/getTransactions` | Fetch user history | User |
| **Admin** |  |  |  |
| `GET` | `/api/admin/users` | List all system users | Admin |
| `GET` | `/api/admin/transactions` | View all platform transactions | Admin |


---


#### Testing
- Backend: Use Postman for API testing.
- Frontend: Manual testing in browser; add Jest/Cypress for unit/E2E tests later.

#### Deployment
- Frontend: Build with `npm run build`, deploy to Vercel/Netlify.
- Backend: Deploy to Render/Heroku, connect to MongoDB Atlas.

#### Contributing
1. Fork the repo.
2. Create a feature branch.
3. Commit changes.
4. Push and create PR.


---


### 📸 Screenshots
1. **The Main Dashboard:** Showing the Balance card and Chart.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d260d368-df36-4ff5-911b-4e5aac893282" />


2. **The Transfer Modal:** Showing the input fields.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5945d979-d90f-4628-897a-b6217ed73576" />


3. **The Admin Overview:** Showing the User/Transaction counters.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7a78c56b-eae8-4c97-b659-ccba988dbe6b" />



---

*Built by Collins as a Capstone Project for level 3 in SQI.*
