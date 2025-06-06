import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { type User, db, setupDb } from "@/db";
import { env } from "cloudflare:workers";
export { SessionDurableObject } from "./session/durableObject";
import { EditPost } from "@/app/pages/EditPost";
import { auth } from "./auth";



export type AppContext = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request }) => {
    await setupDb(env);
    setupSessionStore(env);
    const session = await auth.api.getSession({ headers: request.headers });

    ctx.user = session?.user || null;
  },
  render(Document, [
    route("/", Home),
    route("/edit-post", EditPost),
    route("/auth/*", (ctx) => {
      return auth.handler(ctx.request);
    }),
    route("/logout", async ({ request }) => {
      // Clear the session
      await auth.api.signOut({ headers: request.headers });

      // Redirect to home page
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }),
  ]),
]);
