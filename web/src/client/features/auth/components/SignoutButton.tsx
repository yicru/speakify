import { Button } from '@/client/components/ui/button'

export const SignoutButton = () => {
  return (
    <form action="/auth/signout" method="post">
      <Button size={'xs'} type="submit" variant={'secondary'}>
        Sign out
      </Button>
    </form>
  )
}
