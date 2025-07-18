import { getClusterData, getClusterWithPostsById } from "@/app/map/fetchers";
import ClusterGraphApp from "@/components/cluster/graph/cluster-graph-app";
import { ClusterHeaderBar } from "@/components/cluster/posts/cluster-header-bar";
import ClusterPostList from "@/components/cluster/posts/cluster-post-list";

import { TopBar } from "@/components/ui/post-top-bar";
import { ClusterPostsProvider } from "@/providers/cluster-posts-store-provider";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "지식의 여정",
    description: "Scribbly의 게시글을 유사도에 맞게 한 눈에 모아보세요.",
  };
}

export default async function Page() {
  const { data: clusterData } = await getClusterData();
  const { data: postListData } = await getClusterWithPostsById(
    (clusterData && clusterData[0].id) || ""
  );

  return (
    <div className="h-screen flex flex-col bg-background text-color-base font-sans">
      <TopBar />
      <ClusterPostsProvider
        initialState={{
          selectedCluster: clusterData?.[0],
          clusterWithPosts: postListData,
          clusters: clusterData || [],
        }}
      >
        <aside className="absolute inset-0 w-full z-0">
          <ClusterGraphApp nodes={clusterData || []} />
        </aside>
        <div className="relative flex-1 flex w-full pt-[40vh] md:pt-0 md:w-1/2  min-h-0 self-end xl:mr-52">
          <div className="w-full flex py-4">
            <div className="flex flex-col flex-1 h-full overflow-y-scroll scrollbar-hidden bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <ClusterHeaderBar clusters={clusterData || []} />
              <ClusterPostList />
            </div>
          </div>
        </div>
      </ClusterPostsProvider>
    </div>
  );
}
