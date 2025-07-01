import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPosts = query({
  args: {
    filter: v.object({
      status: v.union(v.literal("draft"), v.literal("published")),
    }),
  },
  handler: async (ctx, { filter }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("status"), filter.status))
      .collect();
  },
});

export const getPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("slug"), slug))
      .first();
  },
});
