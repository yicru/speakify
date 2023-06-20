import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/client/components/ui/alert'
import { Button } from '@/client/components/ui/button'
import { Label } from '@/client/components/ui/label'
import { Switch } from '@/client/components/ui/switch'
import { graphql } from '@/client/lib/gql'
import { Speaker } from '@/client/lib/gql/graphql'
import { toast } from '@/client/lib/sonner'
import { FileIcon, Mic2Icon } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from 'urql'

const TextToSpeechMutation = graphql(/* GraphQL */ `
  mutation TextToSpeechButton_textToSpeech($speaker: Speaker!, $text: String!) {
    textToSpeech(speaker: $speaker, text: $text)
  }
`)

type Props = {
  text: string
}

export const TextToSpeechForm = ({ text }: Props) => {
  const [speaker, setSpeaker] = useState<Speaker>(Speaker.Mizuki)
  const [{ data, fetching }, execute] = useMutation(TextToSpeechMutation)

  const onChangeSwitch = (isChecked: boolean) => {
    setSpeaker(isChecked ? Speaker.Kazuha : Speaker.Mizuki)
  }

  const onSubmit = async () => {
    const { error } = await execute({ speaker, text })

    if (error) {
      toast.error('エラーが発生しました', {
        description: error.message,
      })
    }
  }

  return (
    <div className={'space-y-4'}>
      <div className="flex justify-end items-center space-x-2 text-gray-600">
        <Label className={'text-xs'}>低価格</Label>
        <Switch onCheckedChange={onChangeSwitch} />
        <Label className={'text-xs'}>高品質</Label>
      </div>
      <Button className={'w-full'} isLoading={fetching} onClick={onSubmit}>
        <Mic2Icon className={'mr-2 h-4 w-4'} />
        Speakify
      </Button>
      {data?.textToSpeech && (
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
              href={data?.textToSpeech}
              target={'_blank'}
            >
              {data?.textToSpeech}
            </a>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
