import { AuthForm } from '@/client/features/auth/components/AuthForm'

export default function Home() {
  return (
    <div className={'space-y-4'}>
      <h1 className={'font-semibold text-gray-600'}>Speakify</h1>
      <AuthForm />
    </div>
  )
}
