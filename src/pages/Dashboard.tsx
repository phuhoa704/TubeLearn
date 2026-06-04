import { StudentDashboard } from "../features/dashboard/StudentDashboard";
import { ProfDashboard } from "../features/dashboard/ProfDashboard";
import { Role } from "../types/auth";
import { useAppSelector } from "../store";

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.role === Role.PROF) {
    return <ProfDashboard />;
  }

  return <StudentDashboard />;
}
