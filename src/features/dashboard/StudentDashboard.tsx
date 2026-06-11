import { useState } from "react";
import { TabBar } from "./components/TabBar";
import { IconStar } from "./components/student/IconStar";
import { IconBook } from "./components/student/IconBook";
import { IconBarChart } from "./components/student/IconBarChart";
import { StatusTab } from "./components/student/StatusTab";
import { SubjectsTab } from "./components/student/SubjectsTab";
import { RecommendTab } from "./components/student/RecommendTab";

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("status");

  const tabs = [
    { id: "status", label: "나의 학습현황", icon: <IconBarChart /> },
    { id: "subjects", label: "나의 학기과목", icon: <IconBook /> },
    { id: "recommend", label: "나의 추천", icon: <IconStar /> },
  ];

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main">
          학습 분석
        </h1>
        <p className="text-sm text-text-sub mt-1">
          내 학습 현황과 강의 데이터를 확인하세요
        </p>
      </div>
      <TabBar
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
        variant="underline"
      />
      {activeTab === "status" && <StatusTab />}
      {activeTab === "subjects" && <SubjectsTab />}
      {activeTab === "recommend" && <RecommendTab />}
    </div>
  );
}
