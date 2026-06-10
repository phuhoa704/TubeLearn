import { useAppSelector } from "../store";
import { Role } from "../types/auth";
import { ProfNotice, StudentNotice } from "../features/notice";

export default function Notice() {
  const { user } = useAppSelector((state) => state.auth);
  if (user?.role === Role.PROF) {
    return <ProfNotice />;
  }
  return <StudentNotice />;
}
