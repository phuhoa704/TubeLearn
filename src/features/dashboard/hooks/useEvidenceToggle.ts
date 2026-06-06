import { useState } from "react";

export function useEvidenceToggle() {
  const [openEvidence, setOpenEvidence] = useState<Set<number>>(new Set());

  const toggleEvidence = (id: number) => {
    setOpenEvidence((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isOpen = (id: number) => openEvidence.has(id);

  return { isOpen, toggleEvidence };
}
