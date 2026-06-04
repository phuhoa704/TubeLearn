import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/ui";
import { useAppDispatch } from "../../../store";
import { loginSuccess } from "../../../store/slices/authSlice";
import { Role, type RoleType } from "../../../types/auth";

interface LoginFormInputs {
  userId: string;
  userPw: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<RoleType>("student");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      userId: "student",
      userPw: "1234",
    },
  });

  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role);
    setErrorMsg("");
    if (role === Role.STUDENT) {
      setValue("userId", "student");
      setValue("userPw", "1234");
    } else {
      setValue("userId", "professor");
      setValue("userPw", "1234");
    }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="lg-role">
        <button
          type="button"
          className={`lg-role-btn ${selectedRole === Role.STUDENT ? "on" : ""}`}
          onClick={() => handleRoleChange(Role.STUDENT)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <circle cx="9" cy="6" r="3.5" />
            <path d="M2 16c0-3.9 3.1-7 7-7s7 3.1 7 7" />
          </svg>
          학생
        </button>
        <button
          type="button"
          className={`lg-role-btn ${selectedRole === Role.PROF ? "on" : ""}`}
          onClick={() => handleRoleChange(Role.PROF)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="5.5" r="3" />
            <path d="M2 16c0-3.9 3.1-7 7-7s7 3.1 7 7" />
            <path d="M12 2l2 1.5L16 2" />
          </svg>
          교수자
        </button>
      </div>

      <div className="mb-4">
        <label className="lg-label" htmlFor="userId">
          아이디
        </label>
        <Input
          className="lg-input"
          id="userId"
          type="text"
          placeholder="아이디를 입력하세요"
          error={errors.userId?.message}
          {...register("userId", { required: "아이디를 입력해 주세요." })}
        />
      </div>

      <div className="mb-4">
        <label className="lg-label" htmlFor="userPw">
          비밀번호
        </label>
        <Input
          className="lg-input"
          id="userPw"
          type="password"
          placeholder="비밀번호를 입력하세요"
          error={errors.userPw?.message}
          {...register("userPw", { required: "비밀번호를 입력해 주세요." })}
        />
      </div>

      {errorMsg && (
        <div className="text-[12px] text-err flex items-center gap-1 mb-4">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4h1.5v4h-1.5V5zm0 5h1.5v1.5h-1.5V10z" />
          </svg>
          {errorMsg}
        </div>
      )}

      <Button
        id="loginBtn"
        type="submit"
        variant="primary"
        className="w-full mb-4.5 lg-btn"
      >
        {isSubmitting ? (
          "로그인 중..."
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4l4 5-4 5M2 9h13" />
            </svg>
            로그인
          </>
        )}
      </Button>

      <div className="lg-div">
        <div className="lg-div-line"></div>
        <span className="lg-div-t">또는</span>
        <div className="lg-div-line"></div>
      </div>

      <Button className="lg-sso" type="button" variant="ghost">
        <svg
          width="17"
          height="17"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <rect x="3" y="5" width="14" height="11" rx="2" />
          <path d="M7 5V4a3 3 0 016 0v1" />
        </svg>
        SSO 로그인 (학교 계정)
      </Button>
    </form>
  );
};
