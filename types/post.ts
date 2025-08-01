import { GraphPost, PostTags } from "@/types/graph";
import { Database, Json } from "@/types/supabase";

export type Post = {
  id: string;
  url_slug: string;
  title: string;
  short_description: string | null;
  is_private: boolean | null;
  order: number | null;
  subcategory_id: string | null;
};
export type Subcategory = {
  id: string;
  name: string;
  order: number | null;
  category_id: string | null;
  url_slug: string;
};

export interface Category {
  id: string;
  name: string;
  order: number | null;
  subcategories: Subcategory[];
}

export type CardPost = GraphPost & { tags: PostTags[] | Json[] | null };

export type SidebarSelectedData = {
  post: Post;
  subcategory: Subcategory;
  category: Category;
};

export type RecommendedPost =
  Database["public"]["Views"]["post_similarities_with_target_info"]["Row"];

export type Panel = "category" | "subcategory" | "post" | "recommended";
