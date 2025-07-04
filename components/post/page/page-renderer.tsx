import { Separator } from "@radix-ui/react-separator";
import MarkdownEditor from "@/components/markdown/markdown-editor";
import { SidebarTrigger } from "@ui/sidebar-trigger";
import PostBreadcrumb from "@/components/post/post-breadcrumb";
import TitleEditor from "@/components/post/title-editor";
import { getSidebarCategory } from "@/app/post/fetchers";
import { findCategoryAndSubcategoryById } from "@/utils/uploadingUtils";
import AIPanelWrapper from "@/components/post/right-panel/ai-panel-wrapper";
import { RightPanelWrapper } from "@/components/post/right-panel/right-panel-wrapper";
import AIPanel from "@/components/post/right-panel/ai-panel";
import AutosaveApp from "@/components/post/autosave/autosave-app";
import ToggleEditButton from "@/components/markdown/milkdown-app/toggle-edit-button";
import { formatKoreanDate } from "@/lib/date";
import MainPostSectionContainer from "@/components/post/main-post-section-container";
import { Lock } from "lucide-react";
import AutosaveStoreWrapper from "@/components/post/autosave-store-wrapper";

import { Database } from "@/types/supabase";

interface PageProps {
  data: Database["public"]["Tables"]["posts"]["Row"];
}

export default async function PostPageRenderer({ data }: PageProps) {
  const { data: categoryData } = await getSidebarCategory();
  const { category, subcategory } = findCategoryAndSubcategoryById(
    categoryData,
    data.subcategory_id
  );

  return (
    <AutosaveStoreWrapper
      data={data}
      subcategoryId={data.subcategory_id}
      categoryData={categoryData}
    >
      <main
        id="메인레퍼"
        className="flex flex-1 flex-col h-full bg-glass-bg backdrop-blur-2xl text-gray-800 dark:text-white"
      >
        <header
          data-component-name="main-header"
          className="h-[48px] border-b border-border flex justify-between items-center  dark:from-[#1b1b1b] dark:to-[#121212] text-sm text-gray-600 dark:text-gray-400"
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <PostBreadcrumb
              category={category}
              subcategory={subcategory}
              title={data?.title}
            />
          </div>
          <div className="flex items-center gap-2 px-4">
            <ToggleEditButton />
          </div>
        </header>
        <AutosaveApp />
        <MainPostSectionContainer>
          <div className="main-post-section">
            <div className="px-4 sm:px-14 mb-5 flex flex-col gap-2">
              <div className="text-xs">{subcategory?.name}</div>
              <div className="flex gap-1">
                {data?.is_private && (
                  <Lock
                    className={"h-5 w-5 text-color-muted inline-block my-auto"}
                  />
                )}
                <TitleEditor defaultValue={data?.title || ""} />
              </div>
              <div className="text-end text-xs">
                {data?.released_at ? formatKoreanDate(data?.released_at) : ""}
              </div>
              <hr />
            </div>
            <MarkdownEditor markdown={data?.body || ""} />
          </div>
        </MainPostSectionContainer>
      </main>
      <AIPanelWrapper data={data}>
        <RightPanelWrapper>
          <AIPanel />
        </RightPanelWrapper>
      </AIPanelWrapper>
    </AutosaveStoreWrapper>
  );
}
