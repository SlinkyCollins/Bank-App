import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { Toaster } from "react-hot-toast";
import PrivateRoute from './Components/PrivateRoute';
import FullPageLoader from './Components/FullPageLoader';

const Homepage = lazy(() => import('./Components/Pages/Homepage'));
const Signup = lazy(() => import('./Components/Signup'));
const Login = lazy(() => import('./Components/Login'));
const ResetPassword = lazy(() => import('./Components/ResetPassword'));
const ForgotPassword = lazy(() => import('./Components/ForgotPassword'));
const ResetSuccess = lazy(() => import('./Components/resetSucess'));
const NotFound = lazy(() => import('./Components/NotFound'));
const EmailCheck = lazy(() => import('./Components/EmailCheck'));
const UserDashboard = lazy(() => import('./Components/NairaNestDashboard'));
const Account = lazy(() => import('./Components/Account'));
const Transactions = lazy(() => import('./Components/Transactions'));
const Settings = lazy(() => import('./Components/Settings'));
const MainDashboard = lazy(() => import('./Components/MainDashboard'));
const AdminUsers = lazy(() => import('./Components/AdminUsers'));
const AdminTransactions = lazy(() => import('./Components/AdminTransactions'));
const AdminLayout = lazy(() => import('./Components/AdminLayout'));
const AdminOverview = lazy(() => import('./Components/AdminOverview'));

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