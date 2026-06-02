import { LeftPanel, LoginForm } from "../features/auth";
import { useAppTheme } from "../context/ThemeContext";

import { themeSwatches } from "../mocks/theme";

export default function Login() {
  const { theme, mode, changeTheme, toggleMode } = useAppTheme();

  return (
    <div className="flex inset-0 z-200 fixed bg-background-main transition-colors duration-500">
      <LeftPanel />

      <div className="lg-right">
        <div className="lg-box">
          <div className="lg-title2">로그인</div>
          <div className="lg-sub">계속하려면 계정에 로그인하세요</div>

          <LoginForm />

          <div className="lg-options">
            <div className="lg-theme-row">
              <span className="lg-theme-lbl">테마</span>
              {themeSwatches.map((swatch) => (
                <div
                  key={swatch.id}
                  className={`lg-swatch ${swatch.colorClass} ${theme === swatch.id ? "on" : ""}`}
                  onClick={() => changeTheme(swatch.id)}
                ></div>
              ))}
            </div>
            <div className="lg-dark-row">
              <span className="lg-dark-lbl">다크 모드</span>
              <button
                className={`lg-toggle ${mode === "dark" ? "on" : ""}`}
                onClick={toggleMode}
              ></button>
            </div>
          </div>

          <div className="lg-demo">
            💡 데모 계정
            <br />
            학생: <b>student / 1234</b> &nbsp;·&nbsp; 교수:{" "}
            <b>professor / 1234</b>
          </div>
        </div>
      </div>
    </div>
  );
}
