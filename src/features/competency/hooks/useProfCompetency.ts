import { useState, useMemo, useEffect } from "react";
import {
  PROF_KCESA,
  PROF_LMS_COMP,
  PROF_COMP_DB,
  PROF_COMP_WEAK_STUDENTS,
  COMP_MSG_TEMPLATES,
} from "../../../mocks/competency";
import { PROF_STUDENTS_MOCK } from "../../../mocks/student";
import { showToast } from "../../../lib/toast";

const COURSE_MAP: Record<string, string> = {
  "0": "웹 개발 입문",
  "1": "데이터 분석과 시각화",
  "2": "Python 기초부터 실전까지",
};

export function useProfCompetency() {
  const [std, setStd] = useState<"kcesa" | "lms" | "all">("kcesa");
  const [period, setPeriod] = useState<"month" | "week">("month");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [weakFilter, setWeakFilter] = useState<string>("all");

  const [selectedStudentIdx, setSelectedStudentIdx] = useState<number | null>(
    null,
  );

  const [msgStudent, setMsgStudent] = useState<any | null>(null);
  const [msgType, setMsgType] = useState<
    "encourage" | "guide" | "consult" | "custom"
  >("encourage");
  const [msgBody, setMsgBody] = useState<string>("");
  const [isMsgEditable, setIsMsgEditable] = useState<boolean>(false);
  const [sendChannels, setSendChannels] = useState({
    lms: true,
    email: false,
    push: false,
  });

  const getCompDefs = () => {
    if (std === "kcesa") return PROF_KCESA;
    if (std === "lms") return PROF_LMS_COMP;
    return PROF_KCESA.concat(PROF_LMS_COMP);
  };

  const getCompData = () => {
    if (std === "all") {
      const kd = PROF_COMP_DB.kcesa;
      const ld = PROF_COMP_DB.lms;
      return {
        scores: kd.scores.concat(ld.scores),
        prev: kd.prev.concat(ld.prev),
        target: kd.target,
        trend: {
          month: {
            labels: kd.trend.month.labels,
            series: kd.trend.month.series.concat(ld.trend.month.series),
          },
          week: {
            labels: kd.trend.week.labels,
            series: kd.trend.week.series.concat(ld.trend.week.series),
          },
        },
        weakByComp: kd.weakByComp.concat(
          ld.weakByComp.map((w) => ({
            compIdx: w.compIdx + 6,
            count: w.count,
            pct: w.pct,
          })),
        ),
      };
    }
    return PROF_COMP_DB[std as "kcesa" | "lms"];
  };

  const defs = getCompDefs();
  const data = getCompData();

  // Dynamically compute KPIs
  const scores =
    std === "all"
      ? PROF_COMP_DB.kcesa.scores.concat(PROF_COMP_DB.lms.scores)
      : data.scores;
  const avgScore = Math.round(
    scores.reduce((a, b) => a + b, 0) / scores.length,
  );
  const minScore = Math.min(...scores);
  const minIdx = scores.indexOf(minScore);
  const maxScore = Math.max(...scores);
  const maxIdx = scores.indexOf(maxScore);

  const weakTotal = useMemo(() => {
    if (courseFilter === "all") {
      return data.weakByComp
        ? data.weakByComp.reduce((a, w) => a + w.count, 0)
        : 0;
    }
    const targetCourseName = COURSE_MAP[courseFilter];
    return PROF_COMP_WEAK_STUDENTS.filter(
      (st) => st.course === targetCourseName,
    ).length;
  }, [std, courseFilter, data.weakByComp]);

  const kpis = [
    {
      lbl: "평균 역량점수",
      val: `${avgScore}점`,
      sub: `목표 ${data.target}점 · ${avgScore >= data.target ? "달성" : `목표까지 ${data.target - avgScore}점`}`,
      col: avgScore >= data.target ? "#10b981" : "#ef4444",
    },
    {
      lbl: "최고 역량",
      val: defs[maxIdx] ? defs[maxIdx].lbl : "—",
      sub: `${maxScore}점 · 전체 1위`,
      col: "#10b981",
    },
    {
      lbl: "최저 역량",
      val: defs[minIdx] ? defs[minIdx].lbl : "—",
      sub: `${minScore}점 · 집중 지도 필요`,
      col: "#ef4444",
    },
    {
      lbl: "취약 학생",
      val: `${weakTotal}명`,
      sub:
        courseFilter === "all"
          ? "역량별 50점 미만 누적"
          : "해당 강좌 취약 수강생",
      col: "#f59e0b",
    },
  ];

  // List filter logic
  const filteredStudents = useMemo(() => {
    let list = PROF_COMP_WEAK_STUDENTS;
    if (courseFilter !== "all") {
      const targetCourseName = COURSE_MAP[courseFilter];
      list = list.filter((st) => st.course === targetCourseName);
    }

    const filterIdx = weakFilter !== "all" ? parseInt(weakFilter, 10) : NaN;

    return list.filter((st) => {
      const sc =
        std === "lms"
          ? st.lms
          : std === "all"
            ? st.kcesa.concat(st.lms)
            : st.kcesa;
      if (isNaN(filterIdx)) {
        return sc.some((v) => v < 55);
      }
      return sc[filterIdx] !== undefined && sc[filterIdx] < 55;
    });
  }, [std, courseFilter, weakFilter]);

  // Sync messaging text when selection or student changes
  useEffect(() => {
    if (msgStudent) {
      const sc =
        std === "lms"
          ? msgStudent.lms
          : std === "all"
            ? msgStudent.kcesa.concat(msgStudent.lms)
            : msgStudent.kcesa;
      const weakIdx = sc
        .map((v: number, i: number) => (v < 55 ? i : -1))
        .filter((i: number) => i >= 0);
      const weakLabels = weakIdx
        .map((i: number) => defs[i]?.lbl || "")
        .filter(Boolean);

      if (msgType === "custom") {
        if (!isMsgEditable) {
          setMsgBody("");
        }
      } else {
        const text = COMP_MSG_TEMPLATES[msgType](msgStudent, weakLabels);
        setMsgBody(text);
      }
    }
  }, [msgStudent, msgType, std, isMsgEditable]);

  const handleOpenStudentDetail = (name: string) => {
    const foundIdx = PROF_STUDENTS_MOCK.findIndex((s) => s.name === name);
    if (foundIdx >= 0) {
      setSelectedStudentIdx(foundIdx);
    } else {
      showToast(`${name} 학생 상세 정보를 찾을 수 없어요. 🔍`);
    }
  };

  const handleOpenMsgModal = (student: any) => {
    setMsgStudent(student);
    setMsgType("encourage");
    setIsMsgEditable(false);
    setSendChannels({ lms: true, email: false, push: false });
  };

  const handleSendMsg = () => {
    if (!msgBody.trim()) {
      alert("메시지 내용을 입력해주세요.");
      return;
    }
    const { lms, email, push } = sendChannels;
    if (!lms && !email && !push) {
      alert("발송 방법을 하나 이상 선택해주세요.");
      return;
    }
    const methods = [
      lms ? "LMS 쪽지" : "",
      email ? "이메일" : "",
      push ? "앱 푸시" : "",
    ]
      .filter(Boolean)
      .join(", ");

    showToast(`${msgStudent.name}님에게 메시지를 보냈어요! (${methods}) ✉️`);
    setMsgStudent(null);
  };

  return {
    std,
    setStd,
    period,
    setPeriod,
    courseFilter,
    setCourseFilter,
    weakFilter,
    setWeakFilter,
    selectedStudentIdx,
    setSelectedStudentIdx,
    msgStudent,
    setMsgStudent,
    msgType,
    setMsgType,
    msgBody,
    setMsgBody,
    isMsgEditable,
    setIsMsgEditable,
    sendChannels,
    setSendChannels,
    defs,
    data,
    kpis,
    filteredStudents,
    handleOpenStudentDetail,
    handleOpenMsgModal,
    handleSendMsg,
  };
}
