import { RequestInfo } from "rwsdk/worker";
import { SiteLayout } from "../components/Layouts/SiteLayout";

export function Home({ ctx }: RequestInfo) {
  return (
    <div>
      <SiteLayout user={ctx.user}>
        <p>
          {ctx.user?.name
            ? `You are logged in as user ${ctx.user.name}`
            : "You are not logged in"}
        </p>
      </SiteLayout>
    </div>
  );
}
