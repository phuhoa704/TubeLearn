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

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Competency = lazy(() => import("./pages/Competency"));
const TodoList = lazy(() => import("./pages/TodoList"));
const Courses = lazy(() => import("./pages/Courses"));
const Notice = lazy(() => import("./pages/Notice"));
const Message = lazy(() => import("./pages/Message"));
const ComponentShowcase = lazy(() => import("./pages/ComponentShowcase"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function PublicRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="competency" element={<Competency />} />
                <Route path="todo" element={<TodoList />} />
                <Route path="courses" element={<Courses />} />
                <Route path="notice" element={<Notice />} />
                <Route path="message" element={<Message />} />
                <Route path="components" element={<ComponentShowcase />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
