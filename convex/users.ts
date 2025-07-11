import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const data = userId !== null ? await ctx.db.get(userId) : null;
    return data;
  },
});
