import { useAppSelector } from "../store";
import { Role } from "../types/auth";
import { ProfMessage, StudentMessage } from "../features/message";

export default function Message() {
  const { user } = useAppSelector((state) => state.auth);
  if (user?.role === Role.PROF) {
    return <ProfMessage />;
  }
  return <StudentMessage />;
}
