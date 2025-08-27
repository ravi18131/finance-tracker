import { ReactNode, Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSession } from "./context/session-context";

// Lazy imports
const Login = lazy(() => import("./components/auth/login"));
const HomePage = lazy(() => import("./pages/home"));
const SingUp = lazy(() => import("./components/auth/singup"));
const AuthLayout = lazy(() => import("./components/layout/auth-layout"));
const ForgetPassword = lazy(() => import("./components/auth/forgot-password"));
const PageNotFound = lazy(() => import("./components/shared/404"));
const PasswordReset = lazy(() => import("./components/auth/password-reset"));
const Layout = lazy(() => import("./components/layout/home-layout"));

// Admin
const AdminLayout = lazy(() => import("./components/layout/admin-layout"));
const Dashboard = lazy(() => import("./pages/admin-readonly/dashboard"));
const Users = lazy(() => import("./pages/admin-readonly/users"));
const Transactions = lazy(() => import("./pages/admin-readonly/transactions/transactions"));
const TransactionDetails = lazy(() => import("./pages/admin-readonly/transactions/transaction-details"))
const Analytics = lazy(() => import("./pages/admin-readonly/analytics/analytics"))
const AnalyticDetail = lazy(() => import("./pages/admin-readonly/analytics/analytic-detail"))

//user
const UserLayout = lazy(() => import("./components/layout/user-layout"));
const UserDashboard = lazy(() => import("./pages/user/dashboard"));
const UserTransactionDetails = lazy(() => import("./pages/user/transaction-details"));
const Profile = lazy(() => import("./pages/user/profile"));

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  if (user?.id && (user.role === "ADMIN" || user.role === "READ_ONLY")) {
    return <>{children}</>;
  }
  return <Navigate to={"/auth/login"} />;
};

const UserPrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  if (user?.id && (user.role === "USER")) {
    return <>{children}</>;
  }
  return <Navigate to={"/auth/login"} />;
};

export const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* Default auth-facing layout */}
          <Route
            path="/auth/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/sign-up"
            element={
              <AuthLayout>
                <SingUp />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/forgot-password"
            element={
              <AuthLayout>
                <ForgetPassword />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/password-reset/:hash"
            element={
              <AuthLayout>
                <PasswordReset />
              </AuthLayout>
            }
          />

          {/* Default admin and read-only layout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transactions/:userId" element={<TransactionDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="analytics/:userId" element={<AnalyticDetail />} />
          </Route>

          {/* Default user layout */}
          <Route
            path="/user"
            element={
              <UserPrivateRoute>
                <UserLayout />
              </UserPrivateRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="transactions" element={<UserTransactionDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Default public-facing layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
