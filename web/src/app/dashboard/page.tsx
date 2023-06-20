'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/client/components/ui/alert'
import { Button } from '@/client/components/ui/button'
import { SignoutButton } from '@/client/features/auth/components/SignoutButton'
import { ParseHtmlFromUrlForm } from '@/client/features/html/components/ParseHtmlFromUrlForm'
import { TextToSpeechButton } from '@/client/features/text-to-speech/components/TextToSpeechButton'
import { FileIcon, Mic2Icon } from 'lucide-react'
import { useState } from 'react'

export default function Dashboard() {
  const [bodyText, setBodyText] = useState<null | string>(null)
  const [url, setUrl] = useState<null | string>(null)

  return (
    <main>
      <header className={'flex justify-between items-center pb-4 border-b'}>
        <h1 className={'text-lg font-bold'}>Speakify</h1>
        <SignoutButton />
      </header>
      <div className={'mt-4 space-y-4'}>
        <ParseHtmlFromUrlForm onComplete={setBodyText} />

        {bodyText && (
          <TextToSpeechButton
            render={({ fetching, onClick }) => (
              <Button
                className={'w-full'}
                isLoading={fetching}
                onClick={onClick}
              >
                <Mic2Icon className={'mr-2 h-4 w-4'} />
                Speakify
              </Button>
            )}
            onComplete={setUrl}
            text={bodyText}
          />
        )}

        {url && (
          <Alert>
            <FileIcon className="h-4 w-4" />
            <AlertTitle className={'mb-2 text-sm'}>
              あなたのリクエストはスケジュールされています
            </AlertTitle>
            <AlertDescription>
              <p className={'text-xs'}>
                まもなく以下のURLからダウンロードが可能です
              </p>
              <a
                className={'text-xs underline text-gray-500'}
                href={url}
                target={'_blank'}
              >
                {url}
              </a>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  )
}
