import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-main gap-6 px-4">
      <div
        className="text-[8rem] font-black leading-none select-none"
        style={{
          background: "linear-gradient(135deg, var(--p) 0%, var(--pa) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "nf-float 3s ease-in-out infinite",
        }}
      >
        404
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-text-main">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-base text-text-sub max-w-xs">
          요청하신 주소가 잘못되었거나 페이지가 이동 또는 삭제되었습니다.
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <Button
          id="not-found-back"
          onClick={() => navigate(-1)}
          variant="ghost"
        >
          이전으로
        </Button>
        <Button
          id="not-found-home"
          onClick={() => navigate("/dashboard", { replace: true })}
          variant="primary"
        >
          홈으로 가기
        </Button>
      </div>

      <style>{`
        @keyframes nf-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
