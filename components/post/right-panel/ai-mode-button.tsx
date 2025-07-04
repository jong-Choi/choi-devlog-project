import { cn } from "@/lib/utils"; // 유틸 임포트는 네 기존 구조 기준
import { useLayoutStore } from "@/providers/layout-store-provider";
import { useShallow } from "zustand/react/shallow";

export default function AIModeButton() {
  const { mode, setMode } = useLayoutStore(
    useShallow((state) => ({
      mode: state.rightPanelMode,
      setMode: state.setRightPanelMode,
    }))
  );

  return (
    <div className="grid grid-cols-2 divide-x overflow-hidden rounded-full border text-xs font-medium">
      <button
        onClick={() => setMode("summary")}
        className={cn(
          "text-center transition-colors",
          mode === "summary"
            ? "bg-lime-200 dark:bg-white dark:text-neutral-900"
            : "hover:bg-slate-100 text-color-base dark:hover:bg-neutral-700"
        )}
      >
        AI 요약
      </button>
      <button
        onClick={() => setMode("recommend")}
        className={cn(
          "text-center transition-colors",
          mode === "recommend"
            ? "bg-lime-200 dark:bg-white dark:text-neutral-900"
            : "hover:bg-slate-100 text-color-base dark:hover:bg-neutral-700"
        )}
      >
        추천 게시글
      </button>
    </div>
  );
}
