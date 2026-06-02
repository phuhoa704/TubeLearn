import { type ThemeType } from "../../context/ThemeContext";

export const themeSwatches: { id: ThemeType; colorClass: string, label: string, color: string }[] = [
    { id: "blue", colorClass: "bg-[#3B82F6]", label: "파스텔 블루", color: "#3B82F6" },
    { id: "pink", colorClass: "bg-[#EC4899]", label: "파스텔 핑크", color: "#EC4899" },
    { id: "mint", colorClass: "bg-[#10B981]", label: "파스텔 민트", color: "#10B981" },
    { id: "lavender", colorClass: "bg-[#8B5CF6]", label: "파스텔 라벤더", color: "#8B5CF6" },
    { id: "peach", colorClass: "bg-[#F97316]", label: "파스텔 피치", color: "#F97316" },
  ];