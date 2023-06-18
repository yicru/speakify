'use client'

import { SignoutButton } from '@/client/features/auth/components/SignoutButton'
import { ParseHtmlFromUrlForm } from '@/client/features/html/components/ParseHtmlFromUrlForm'

export default function Dashboard() {
  return (
    <main>
      <header className={'flex justify-between items-center pb-4 border-b'}>
        <h1 className={'text-lg font-bold'}>Speakify</h1>
        <SignoutButton />
      </header>
      <div className={'mt-4'}>
        <ParseHtmlFromUrlForm />
      </div>
    </main>
  )
}
