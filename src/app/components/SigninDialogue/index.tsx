import { SignInDialog } from './SignInDialogComp'
import { RequestInfo } from 'rwsdk/worker'

//  need to use the ctx info and something with prisma for signing out
export default async function SignInDialogSession({
  refId,
  ctx,
}: {
  refId: string
  ctx: RequestInfo
}) {
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()
  return <SignInDialog refId={refId} session={null} />
}
