import { AuthForm } from '@/client/features/auth/components/AuthForm'

export default function Home() {
  return (
    <div className={'space-y-4'}>
      <h1 className={'text-2xl font-bold'}>Speakify</h1>
      <AuthForm />
    </div>
  )
}
