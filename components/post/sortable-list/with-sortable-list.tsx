"use client";

import dynamic from "next/dynamic";
import { useShallow } from "zustand/react/shallow";
import { SortableItem } from "@/components/post/sortable-list/sortable-list-container";
import { useLayoutStore } from "@/providers/layout-store-provider";
import { OnUpdateFn } from "@/hooks/use-order-update-queue";

export const SortableListContainerDynamic = dynamic(() =>
  import("@/components/post/sortable-list/sortable-list-container").then(
    (mod) => mod.SortableListContainer
  )
);

type Props<T extends SortableItem> = {
  items: T[];
  children: (items: T[]) => React.ReactNode;
  onUpdate: OnUpdateFn<{ id: string; order: number }>;
};

export function WithSortableList<T extends SortableItem>({
  items,
  children,
  onUpdate,
}: Props<T>) {
  const isSortable = useLayoutStore(useShallow((s) => s.isSortable));

  if (isSortable) {
    return (
      <SortableListContainerDynamic items={items} onUpdate={onUpdate}>
        {children as (items: SortableItem[]) => React.ReactNode}
      </SortableListContainerDynamic>
    );
  }

  return <>{children(items)}</>;
}
