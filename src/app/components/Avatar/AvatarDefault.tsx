import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'

export default function AvatarDefault() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  )
}
