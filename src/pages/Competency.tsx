import { useAppSelector } from "../store";
import { Role } from "../types/auth";
import { ProfCompetency, StudentCompetency } from "../features/competency";

export default function Competency() {
  const { user } = useAppSelector((state) => state.auth);
  if (user?.role === Role.PROF) {
    return <ProfCompetency />;
  }
  return <StudentCompetency />;
}
