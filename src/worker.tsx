import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix, layout } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { env } from "cloudflare:workers";
export { SessionDurableObject } from "./session/durableObject";
import { EditPost } from "@/app/pages/EditPost";
import { SiteLayout, ListDetailView } from "./app/components/Layouts";
import { PostsList } from "./app/components/Writing/PostsList";
import { PostEditor } from "./app/components/Writing/Editor/PostEditor";
import { PostDetail } from "./app/components/Writing/PostDetail";


export type AppContext = {
  user: any;
  session: any;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request }) => {
    setupSessionStore(env);

    ctx.user = null;
    ctx.session = null;
  },
  render(Document, [
    layout(SiteLayout, [
      route("/", Home),
      route("/writing", () => (
        <ListDetailView key="writing-view" list={<PostsList />} detail={null} hasDetail={true} />
      )),
      route("/writing/new", () => (
        <ListDetailView key="writing-new-view" list={<PostsList />} detail={<PostEditor />} hasDetail={true} />
      )),
      route("/writing/:slug", ({ params }) => {
        return (
          <ListDetailView key="writing-view" list={<PostsList />} detail={<PostDetail slug={params.slug} />} hasDetail={true} />
        )
      }),

    ]),
    route("/api/images/upload/", async ({ request }) => {
      const formData = await request.formData();
      const file = formData.get("file") as File;

      // Stream the file directly to R2
      const r2ObjectKey = `/storage/${file.name}`;
      await env.R2.put(r2ObjectKey, file.stream(), {
        httpMetadata: {
          contentType: file.type,
        },
      });

      return new Response(JSON.stringify({ key: r2ObjectKey }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }),
    route("/api/images/download/*", async ({ request, params }) => {
      const object = await env.R2.get("/storage/" + params.$0);
      if (object === null) {
        return new Response("Object Not Found", { status: 404 });
      }
      return new Response(object.body, {
        headers: {
          "Content-Type": object.httpMetadata?.contentType as string,
        },
      });
    }),
  ]),
]);
