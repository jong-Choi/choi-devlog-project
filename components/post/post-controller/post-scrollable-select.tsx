import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAutosave } from "@/providers/autosave-store-provider";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function CategorySelectScrollable() {
  const { categories, setDraftPostData, initialSelectedSubcategory } =
    useAutosave(
      useShallow((state) => ({
        categories: state.categoryData,
        setDraftPostData: state.setDraftPostData,
        initialSelectedSubcategory: state.draftPostData.subcategory_id,
      }))
    );

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    initialSelectedSubcategory
  );

  useEffect(() => {
    setDraftPostData({ subcategory_id: selectedSubcategory });
  }, [selectedSubcategory, setDraftPostData]);

  return (
    <Select
      defaultValue={selectedSubcategory}
      onValueChange={(value) => setSelectedSubcategory(value)}
    >
      <SelectTrigger id="subcategory-select" className="w-[280px]">
        <SelectValue placeholder="서브카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {categories ? (
          categories.map((category) => (
            <SelectGroup key={category.id}>
              <SelectLabel>{category.name}</SelectLabel>
              {category.subcategories.map((sub) => (
                <SelectItem key={sub.id} value={sub.id}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))
        ) : (
          <></>
        )}
      </SelectContent>
    </Select>
  );
}
