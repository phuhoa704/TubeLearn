import { useAppSelector } from "../store";
import { Role } from "../types/auth";
import { StudentCourses, ProfCourses } from "../features/courses";

export default function Courses() {
  const { user } = useAppSelector((state) => state.auth);
  if (user?.role === Role.PROF) {
    return <ProfCourses />;
  }
  return <StudentCourses />;
}
