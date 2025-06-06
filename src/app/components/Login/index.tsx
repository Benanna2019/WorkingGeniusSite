'use client'

// import { useRouter } from 'next/navigation'
import { GhostButton } from '../Button'
import { GitHubIcon } from '../Icon'
import { Button } from '../ui/button'

export function SignOut() {
  // const supabase = createClientComponentClient<Database>()

  const handleSignOut = async () => {
    // await supabase.auth.signOut()
    // router.refresh()
    // window.location.href = '/'
  }

  return (
    <div>
      <Button
        onClick={handleSignOut}
        style={{ flex: '1' }}
        size="sm"
        className="text-sm text-black"
      >
        Sign out
      </Button>
    </div>
  )
}

export function SignIn() {
  // const supabase = createClientComponentClient<Database>()

  const handleSignIn = async () => {
    // await supabase.auth.signInWithOAuth({
    //   provider: 'github',
    //   options: { redirectTo: `${location.origin}/auth/callback` },
    // })
  }
  return (
    <div className="flex rounded-md  p-1 hover:border-2 hover:border-white hover:bg-gray-100">
      <Button
        variant={'ghost'}
        className="flex items-center space-x-2 "
        onClick={handleSignIn}
        style={{ flex: '1' }}
        size="lg"
      >
        <GitHubIcon width="16" height="16" />
        <span>Signin</span>
      </Button>
    </div>
  )
}
