import { ReactNode, Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSession } from "./store/session.store";

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
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Users = lazy(() => import("./pages/admin/users"));
const Transactions = lazy(() => import("./pages/admin/transactions"));

const AdminPrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  if (user?.id && user.role === "ADMIN") {
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

          {/* Default admin-facing layout */}
          <Route
            path="/admin"
            element={
              <AdminPrivateRoute>
                <AdminLayout />
              </AdminPrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="transactions" element={<Transactions />} />
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
