import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { loginSuccess } from "../../../store/slices/authSlice";
import type { RoleType } from "../../../types/auth";

interface LoginFormInputs {
  userId: string;
  userPw: string;
}

const DEMO_CREDENTIALS: Record<RoleType, { userId: string; userPw: string }> = {
  student: { userId: "student", userPw: "1234" },
  prof: { userId: "professor", userPw: "1234" },
};

export function useLoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<RoleType>("student");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const form = useForm<LoginFormInputs>({
    defaultValues: { userId: "student", userPw: "1234" },
  });

  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role);
    setErrorMsg("");
    const cred = DEMO_CREDENTIALS[role];
    form.setValue("userId", cred.userId);
    form.setValue("userPw", cred.userPw);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMsg("");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.userId === "student" && data.userPw === "1234") {
      dispatch(loginSuccess({ username: "student", role: "student" }));
      navigate("/dashboard");
    } else if (data.userId === "professor" && data.userPw === "1234") {
      dispatch(loginSuccess({ username: "professor", role: "prof" }));
      navigate("/dashboard");
    } else {
      setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return {
    form,
    selectedRole,
    errorMsg,
    handleRoleChange,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
