import React from "react";
import { useProfCompetency } from "./hooks/useProfCompetency";
import {
  ProfCompKpis,
  ProfCompWeakDistribution,
  ProfCompTrendChart,
  ProfCompWeakList,
  ProfCompMsgModal,
} from "./components/prof";
import { StudentDetailModal } from "../students/components/StudentDetailModal";
import { PROF_STUDENTS_MOCK } from "../../mocks/student";
import { Button, Select } from "../../components/ui";
import { showToast } from "../../lib/toast";

export const ProfCompetency: React.FC = () => {
  const {
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
  } = useProfCompetency();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
        <div>
          <h1 className="pg-title">역량진단 결과</h1>
          <p className="pg-sub">
            수강생 취약 역량과 성장 추이를 파악하고 맞춤 지도 계획을 세우세요
          </p>
        </div>
        <div className="flex gap-2.5 items-center">
          <Select
            value={courseFilter}
            onChange={(e) => {
              setCourseFilter(e.target.value);
              setWeakFilter("all");
            }}
            className="px-3.5! py-1.5!"
            options={[
              { label: "전체 강의", value: "all" },
              { label: "웹 개발 입문", value: "0" },
              { label: "데이터 분석과 시각화", value: "1" },
              { label: "Python 기초부터 실전까지", value: "2" },
            ]}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast("리포트를 생성 중이에요! 📊")}
            className="font-bold shrink-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 10v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3M8 2v8M5 7l3 3 3-3" />
            </svg>
            리포트 다운로드
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center mb-5 flex-wrap">
        <span className="text-[13px] font-bold text-text-sub shrink-0">
          역량 기준
        </span>
        <div className="flex gap-1.5">
          <Button
            variant={std === "kcesa" ? "outline" : "ghost"}
            className="rounded-full! px-4! py-1.5! font-bold text-sm!"
            onClick={() => {
              setStd("kcesa");
              setWeakFilter("all");
            }}
          >
            K-CESA 핵심역량
          </Button>
          <Button
            variant={std === "lms" ? "outline" : "ghost"}
            className="rounded-full! px-4! py-1.5! font-bold text-sm!"
            onClick={() => {
              setStd("lms");
              setWeakFilter("all");
            }}
          >
            학습분석 역량
          </Button>
          <Button
            variant={std === "all" ? "outline" : "ghost"}
            className="rounded-full! px-4! py-1.5! font-bold text-sm!"
            onClick={() => {
              setStd("all");
              setWeakFilter("all");
            }}
          >
            전체 보기
          </Button>
        </div>
      </div>

      <ProfCompKpis kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
        <ProfCompWeakDistribution
          weakByComp={data.weakByComp}
          defs={defs}
          weakFilter={weakFilter}
          onSelectComp={setWeakFilter}
        />
        <ProfCompTrendChart
          trend={data.trend[period]}
          period={period}
          target={data.target}
          onPeriodChange={setPeriod}
        />
      </div>

      <ProfCompWeakList
        std={std}
        weakFilter={weakFilter}
        onWeakFilterChange={setWeakFilter}
        defs={defs}
        filteredStudents={filteredStudents}
        onOpenStudentDetail={handleOpenStudentDetail}
        onOpenMsgModal={handleOpenMsgModal}
      />

      <StudentDetailModal
        open={selectedStudentIdx !== null}
        student={
          selectedStudentIdx !== null
            ? PROF_STUDENTS_MOCK[selectedStudentIdx]
            : null
        }
        onClose={() => setSelectedStudentIdx(null)}
      />

      <ProfCompMsgModal
        msgStudent={msgStudent}
        std={std}
        msgType={msgType}
        onMsgTypeChange={setMsgType}
        msgBody={msgBody}
        onMsgBodyChange={setMsgBody}
        isMsgEditable={isMsgEditable}
        onToggleEditable={() => setIsMsgEditable(!isMsgEditable)}
        sendChannels={sendChannels}
        onSendChannelsChange={setSendChannels}
        defs={defs}
        onClose={() => setMsgStudent(null)}
        onSend={handleSendMsg}
      />
    </div>
  );
};
