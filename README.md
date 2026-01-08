<img width="1907" height="956" alt="nairanest hero" src="https://github.com/user-attachments/assets/4d851794-00ab-4786-9804-bbe0668e366b" />

### Banking App MVP - NairaNest

A full-stack banking application built with React (frontend) and Node.js/Express (backend) for a functional MVP demo. Features include user authentication, transactions, beneficiary management, and an admin dashboard.

#### Features
- **User Dashboard**: Account overview, deposit/withdraw/transfer money, transaction history, beneficiary management, profile/settings.
- **Admin Dashboard**: View all users and transactions with counts.
- **Authentication**: JWT-based login/signup, forgot password, role-based access (user/admin).
- **Security**: Password hashing, protected routes, input validation.

#### Tech Stack
- **Frontend**: React, Material-UI, Redux, Axios, React Router.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt.
- **Deployment**: Local dev; ready for Vercel/Netlify (frontend) and Render/Heroku (backend).

#### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

#### Installation & Setup

##### Backend Setup
1. Clone the repo: `git clone https://github.com/SlinkyCollins/Bank-App.git`
2. Navigate to backend: `cd Bank App/node` (assuming your structure)
3. Install dependencies: `npm install`
4. Create .env file:
   ```
   PORT=5000
   URL=mongodb://localhost:27017/bankapp (or Atlas URI)
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```
5. Start MongoDB: `mongod` (if local)
6. Run server: `npm start`
7. Test endpoints with Postman (e.g., `POST /api/auth/register`)

##### Frontend Setup
1. Navigate to frontend: `cd bank-app` (assuming root)
2. Install dependencies: `npm install`
3. Create .env file:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Run app: `npm run dev`
5. Open `http://localhost:5173` (Vite default)

#### API Endpoints
- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/dashboard`
- **Transactions**: `GET /api/transactions/getTransactions`, `POST /api/transactions/deposit`, etc.
- **Beneficiaries**: `GET /api/beneficiaries`, `POST /api/beneficiaries`
- **Admin**: `GET /api/admin/users`, `GET /api/admin/transactions`

#### Usage
1. Register/Login as user or admin.
2. Explore dashboard: Deposit money, transfer to beneficiaries, view transactions.
3. Admin: Access `/dashboard/admin` to view users/transactions.

#### Project Structure
```
bank-app/
├── src/
│   ├── Components/ (React components)
│   ├── Redux/ (state management)
│   └── ...
├── Controllers/ (backend logic)
├── Models/ (MongoDB schemas)
├── Routes/ (API routes)
└── ...
```

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

#### License
MIT License.

#### Acknowledgments
Built as a school project MVP. Inspired by real banking apps.
