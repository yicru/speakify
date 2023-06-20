'use client'

import { SignoutButton } from '@/client/features/auth/components/SignoutButton'
import { ParseHtmlFromUrlForm } from '@/client/features/html/components/ParseHtmlFromUrlForm'
import { TextToSpeechForm } from '@/client/features/text-to-speech/components/TextToSpeechForm'
import { useState } from 'react'

export default function Dashboard() {
  const [bodyText, setBodyText] = useState<null | string>(null)

  return (
    <main>
      <header className={'flex justify-between items-center pb-4 border-b'}>
        <h1 className={'text-lg font-bold'}>Speakify</h1>
        <SignoutButton />
      </header>
      <div className={'mt-4 space-y-4'}>
        <ParseHtmlFromUrlForm onComplete={setBodyText} />
        {bodyText && <TextToSpeechForm text={bodyText} />}
      </div>
    </main>
  )
}
