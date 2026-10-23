import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { Toaster } from "react-hot-toast";
import PrivateRoute from './Components/common/PrivateRoute';
import FullPageLoader from './Components/common/FullPageLoader';

const Homepage = lazy(() => import('./Components/pages/Homepage'));
const Signup = lazy(() => import('./Components/auth/Signup'));
const Login = lazy(() => import('./Components/auth/Login'));
const ResetPassword = lazy(() => import('./Components/auth/ResetPassword'));
const ForgotPassword = lazy(() => import('./Components/auth/ForgotPassword'));
const ResetSuccess = lazy(() => import('./Components/auth/resetSucess'));
const NotFound = lazy(() => import('./Components/pages/NotFound'));
const EmailCheck = lazy(() => import('./Components/auth/EmailCheck'));
const UserDashboard = lazy(() => import('./Components/dashboard/NairaNestDashboard'));
const Account = lazy(() => import('./Components/dashboard/Account'));
const Transactions = lazy(() => import('./Components/dashboard/Transactions'));
const Settings = lazy(() => import('./Components/dashboard/Settings'));
const MainDashboard = lazy(() => import('./Components/dashboard/MainDashboard'));
const AdminUsers = lazy(() => import('./Components/admin/AdminUsers'));
const AdminTransactions = lazy(() => import('./Components/admin/AdminTransactions'));
const AdminLayout = lazy(() => import('./Components/admin/AdminLayout'));
const AdminOverview = lazy(() => import('./Components/admin/AdminOverview'));

function App() {
  console.log("App component rendered");
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/checkEmail" element={<EmailCheck />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route
            path="/dashboard/user"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<MainDashboard />} />
            <Route path="/dashboard/user/account" element={<Account />} />
            <Route path="/dashboard/user/transactions" element={<Transactions />} />
            <Route path="/dashboard/user/settings" element={<Settings />} />
          </Route>
          <Route
            path="/dashboard/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>}
          >
            <Route index element={<AdminOverview />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/transactions" element={<AdminTransactions />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App