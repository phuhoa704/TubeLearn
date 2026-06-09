import React, { useEffect } from "react";
import type { ProfExtraCourse } from "../../../../types/courses";
import { Button, Input, Select } from "../../../../components/ui";
import { useForm } from "react-hook-form";

interface ExtraCourseFormModalProps {
  open: boolean;
  onClose: () => void;
  initialCourse: ProfExtraCourse | null;
  onSave: (course: Partial<ProfExtraCourse>) => void;
  onSaveDraft: (course: Partial<ProfExtraCourse>) => void;
}

interface FormValues {
  title: string;
  cat: string;
  type: string;
  desc: string;
  start: string;
  end: string;
  capacity: string;
  applyType: string;
  target: string;
  thumbnail?: string;
  files?: string[];
}

export const ExtraCourseFormModal: React.FC<ExtraCourseFormModalProps> = ({
  open,
  onClose,
  initialCourse,
  onSave,
  onSaveDraft,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      cat: "",
      type: "온라인",
      desc: "",
      start: "",
      end: "",
      capacity: "",
      applyType: "선착순 자동 승인",
      target: "전체 학년",
      thumbnail: "",
      files: [],
    },
  });

  const startDate = watch("start");
  const thumbnail = watch("thumbnail");
  const files = watch("files") || [];

  // Sync state with initialCourse
  useEffect(() => {
    if (open) {
      if (initialCourse) {
        reset({
          title: initialCourse.title || "",
          cat: initialCourse.cat || "",
          type: initialCourse.type || "온라인",
          desc: initialCourse.desc || "",
          start: initialCourse.start || "",
          end: initialCourse.end || "",
          capacity: initialCourse.capacity
            ? String(initialCourse.capacity)
            : "",
          applyType: initialCourse.applyType || "선착순 자동 승인",
          target: initialCourse.target || "전체 학년",
          thumbnail: initialCourse.thumbnail || "",
          files: initialCourse.files || [],
        });
      } else {
        reset({
          title: "",
          cat: "",
          type: "온라인",
          desc: "",
          start: "",
          end: "",
          capacity: "",
          applyType: "선착순 자동 승인",
          target: "전체 학년",
          thumbnail: "",
          files: [],
        });
      }
    }
  }, [initialCourse, open, reset]);

  if (!open) return null;

  const handleSaveForm = (data: FormValues) => {
    onSave({
      title: data.title.trim(),
      cat: data.cat,
      type: data.type,
      desc: data.desc.trim(),
      start: data.start,
      end: data.end,
      capacity: parseInt(data.capacity) || 0,
      applyType: data.applyType,
      target: data.target,
      thumbnail: data.thumbnail,
      files: data.files,
    });
  };

  const handleSaveDraftClick = async () => {
    const isTitleValid = await trigger("title");
    if (!isTitleValid) return;

    const data = getValues();
    onSaveDraft({
      title: data.title.trim(),
      cat: data.cat || "기타",
      type: data.type,
      desc: data.desc.trim(),
      start: data.start,
      end: data.end,
      capacity: parseInt(data.capacity) || 0,
      applyType: data.applyType,
      target: data.target,
      thumbnail: data.thumbnail,
      files: data.files,
    });
  };

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("썸네일 이미지는 최대 5MB까지 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("thumbnail", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleThumbDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("썸네일 이미지는 최대 5MB까지 업로드 가능합니다.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("thumbnail", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveThumb = () => {
    setValue("thumbnail", "");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const currentFiles = [...files];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.size > 20 * 1024 * 1024) {
        alert(`${file.name} 파일은 최대 20MB까지 업로드 가능합니다.`);
        continue;
      }
      if (!currentFiles.includes(file.name)) {
        currentFiles.push(file.name);
      }
    }

    setValue("files", currentFiles);
  };

  const handleRemoveFile = (fileName: string) => {
    setValue(
      "files",
      files.filter((f) => f !== fileName),
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit(handleSaveForm)}
        className="bg-surface-main rounded-r3 shadow-sh3 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
      >
        <div className="px-6 py-4 border-b border-border-main flex items-center justify-between shrink-0">
          <div>
            <h2
              className="text-[17px] font-extrabold text-text-main"
              id="ecModalTitle"
            >
              {initialCourse ? "비교과 강의 수정" : "비교과 강의 등록"}
            </h2>
            <div className="text-[12px] text-text-sub mt-0.5">
              학생들이 직접 신청할 수 있는 비교과 강의를 등록합니다.
            </div>
          </div>
          <button
            type="button"
            className="w-7 h-7 rounded-r1 flex items-center justify-center text-text-muted hover:bg-surface-alt hover:text-text-main transition-colors"
            onClick={onClose}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                강의명 <span className="text-danger">*</span>
              </label>
              <Input
                placeholder="예) 2026 취업 역량 강화 캠프"
                error={errors.title?.message}
                {...register("title", { required: "강의명을 입력해주세요." })}
                maxLength={50}
                className="text-sm!"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                카테고리 <span className="text-danger">*</span>
              </label>
              <Select
                error={errors.cat?.message}
                {...register("cat", { required: "카테고리를 선택해주세요." })}
              >
                <option value="">카테고리 선택</option>
                <option value="취업·창업">취업·창업</option>
                <option value="리더십·소통">리더십·소통</option>
                <option value="SW·AI·테크">SW·AI·테크</option>
                <option value="창업·인큐베이팅">창업·인큐베이팅</option>
                <option value="글로벌·외국어">글로벌·외국어</option>
                <option value="건강·상담">건강·상담</option>
                <option value="문화·예술">문화·예술</option>
                <option value="기타">기타</option>
              </Select>
            </div>

            <div>
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                운영 형태 <span className="text-danger">*</span>
              </label>
              <Select
                error={errors.type?.message}
                {...register("type", { required: "운영 형태를 선택해주세요." })}
              >
                <option value="온라인">온라인</option>
                <option value="오프라인">오프라인</option>
                <option value="블렌디드">블렌디드</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-text-main mb-1.5 block">
              강의 소개 <span className="text-danger">*</span>
            </label>
            <textarea
              className={[
                "w-full bg-(--inp) border rounded-(--r2) text-sm text-(--tx)",
                "placeholder:text-(--tx3) outline-none transition-all duration-(.18s) ease-(cubic-bezier(.4,0,.2,1))",
                "focus:border-(--p) focus:ring-2 focus:ring-(--pr)",
                errors.desc
                  ? "border-(--err) focus:border-(--err) focus:ring-[rgba(239,68,68,.15)]"
                  : "border-(--bd)",
                "px-3.5 py-2.5 resize-none",
              ]
                .filter(Boolean)
                .join(" ")}
              rows={4}
              placeholder="강의 목적, 내용, 기대 효과 등을 입력하세요"
              style={{ minHeight: 100 }}
              {...register("desc", { required: "강의 소개를 입력해주세요." })}
            />
            {errors.desc && (
              <p className="text-[12px] text-(--err) flex items-center gap-1 mt-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4h1.5v4h-1.5V5zm0 5h1.5v1.5h-1.5V10z" />
                </svg>
                {errors.desc.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                시작일 <span className="text-danger">*</span>
              </label>
              <Input
                className="text-sm!"
                type="date"
                error={errors.start?.message}
                {...register("start", { required: "시작일을 선택해주세요." })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                종료일 <span className="text-danger">*</span>
              </label>
              <Input
                className="text-sm!"
                type="date"
                error={errors.end?.message}
                {...register("end", {
                  required: "종료일을 선택해주세요.",
                  validate: (value) =>
                    !startDate ||
                    value >= startDate ||
                    "종료일은 시작일 이후여야 합니다.",
                })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                수강 정원
              </label>
              <Input
                className="text-sm!"
                type="number"
                min="1"
                max="999"
                placeholder="예) 30"
                error={errors.capacity?.message}
                {...register("capacity")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                신청 방법
              </label>
              <Select
                error={errors.applyType?.message}
                {...register("applyType")}
              >
                <option value="선착순 자동 승인">선착순 자동 승인</option>
                <option value="교수자 수동 승인">교수자 수동 승인</option>
                <option value="신청 없이 전체 공개">신청 없이 전체 공개</option>
              </Select>
            </div>
            <div>
              <label className="text-xs font-bold text-text-main mb-1.5 block">
                대상 학년
              </label>
              <Select error={errors.target?.message} {...register("target")}>
                <option value="전체 학년">전체 학년</option>
                <option value="1학년">1학년</option>
                <option value="2학년">2학년</option>
                <option value="3학년">3학년</option>
                <option value="4학년 이상">4학년 이상</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-text-main mb-1.5 block">
              강의 썸네일
            </label>
            {!thumbnail ? (
              <div
                className="border-2 border-dashed border-border-main rounded-r2 p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary hover:bg-surface-alt text-center"
                onClick={() => document.getElementById("ecThumb")?.click()}
                onDragOver={handleDragOver}
                onDrop={handleThumbDrop}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-muted mb-2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <div className="text-xs font-semibold text-text-sub">
                  이미지 선택 또는 끌어다 놓기
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  JPG, PNG, GIF (최대 5MB) · 권장 크기 800x450
                </div>
              </div>
            ) : (
              <div className="relative w-full max-w-60 aspect-video border border-border-main rounded-r2 overflow-hidden bg-surface-alt">
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  onClick={handleRemoveThumb}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M2 2l10 10M12 2L2 12" />
                  </svg>
                </button>
              </div>
            )}
            <input
              type="file"
              id="ecThumb"
              accept="image/*"
              className="hidden"
              onChange={handleThumbChange}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-text-main mb-1.5 block">
              첨부파일 (강의계획서 등)
            </label>
            <div
              className="border-2 border-dashed border-border-main rounded-r2 p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary hover:bg-surface-alt text-center"
              onClick={() => document.getElementById("ecFile")?.click()}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted mb-2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              <div className="text-xs font-semibold text-text-sub">
                파일 선택
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                PDF, DOC, HWP (최대 20MB)
              </div>
            </div>
            <input
              type="file"
              id="ecFile"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <div className="mt-3.5 flex flex-col gap-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-surface-alt border border-border-main rounded-r2 text-xs text-text-main"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm">📄</span>
                      <span className="truncate font-semibold">{file}</span>
                    </div>
                    <button
                      type="button"
                      className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-surface-main rounded-r1 transition-all"
                      onClick={() => handleRemoveFile(file)}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M2 2l10 10M12 2L2 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-main bg-surface-alt flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
          <div className="text-[11px] text-text-muted">
            등록 후 관리자 검토 없이 바로 공개됩니다.
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs font-bold px-4 py-1.5"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs font-bold px-4 py-1.5 bg-[#6b7280]! text-white! border-[#6b7280]! hover:bg-[#5a6270]!"
              onClick={handleSaveDraftClick}
            >
              임시저장
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="text-xs font-bold px-4 py-1.5 flex items-center gap-1.5"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
              등록 완료
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ExtraCourseFormModal;
