import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      const { existingUserId, profile } = args;
      const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

      if (existingUserId) {
        // Update existing user
        await ctx.db.patch(existingUserId, {
          name: profile.name,
          image: profile.image,
          email: profile.email,
          role: ADMIN_EMAIL === profile.email ? "admin" : "user",
        });
        return existingUserId; // Return the ID, not the full user object
      } else {
        // Create new user
        const userId = await ctx.db.insert("users", {
          name: profile.name,
          image: profile.image,
          email: profile.email,
          role: ADMIN_EMAIL === profile.email ? "admin" : "user",
        });
        return userId;
      }
    },
  },
});
