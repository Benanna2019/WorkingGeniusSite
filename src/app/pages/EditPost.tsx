import { RequestInfo } from "rwsdk/worker";
import { SiteLayout } from "../components/Layouts/SiteLayout";

export function EditPost({ ctx }: RequestInfo) {
    return (
        <div>
            <SiteLayout user={ctx.user}>
                <h1>Edit Post</h1>
            </SiteLayout>
        </div>
    );
}
