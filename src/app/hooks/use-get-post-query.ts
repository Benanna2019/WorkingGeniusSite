import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useGetPostQuery({ slug }: { slug: string }) {
  const data = useQuery(api.posts.getPostBySlug, { slug });
  return data;
}
