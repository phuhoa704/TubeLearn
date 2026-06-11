import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import { useAppSelector } from "./store";
import { Role } from "./types/auth";
import { AppProvider } from "./context/AppContext";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Competency = lazy(() => import("./pages/Competency"));
const TodoList = lazy(() => import("./pages/TodoList"));
const Courses = lazy(() => import("./pages/Courses"));
const Notice = lazy(() => import("./pages/Notice"));
const Message = lazy(() => import("./pages/Message"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Student = lazy(() => import("./pages/Students"));

function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function PublicRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

function RoleRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const user = useAppSelector((state) => state.auth.user);
  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Suspense fallback={<NotFound />}>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="competency" element={<Competency />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="notice" element={<Notice />} />
                  <Route path="message" element={<Message />} />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />

                  <Route element={<RoleRoute allowedRoles={[Role.STUDENT]} />}>
                    <Route path="todo" element={<TodoList />} />
                  </Route>

                  <Route element={<RoleRoute allowedRoles={[Role.PROF]} />}>
                    <Route path="student" element={<Student />} />
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
