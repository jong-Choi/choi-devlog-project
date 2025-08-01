"use client";
import { useAutosave } from "@/providers/autosave-store-provider";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/react/shallow";

// AutoSaveWrapper를 다이나믹 임포트
const AutoSaveWrapper = dynamic(
  () => import("@/components/post/autosave/autosave-wrapper"),
  {
    ssr: false,
  }
);

export default function AutosaveLoader() {
  const { postId } = useAutosave(
    useShallow((state) => ({
      postId: state.postId,
    }))
  );

  if (typeof postId !== "string") return <></>;
  return <AutoSaveWrapper postId={postId} />;
}
