import { graphql } from '@/client/lib/gql'
import { toast } from '@/client/lib/sonner'
import { ReactElement } from 'react'
import { useMutation } from 'urql'

const TextToSpeechMutation = graphql(/* GraphQL */ `
  mutation TextToSpeechButton_textToSpeech($text: String!) {
    textToSpeech(text: $text)
  }
`)

type Props = {
  onComplete: (url: string) => void
  render: (params: { fetching: boolean; onClick: () => void }) => ReactElement
  text: string
}

export const TextToSpeechButton = ({ onComplete, render, text }: Props) => {
  const [{ fetching }, execute] = useMutation(TextToSpeechMutation)

  const handleOnClick = async () => {
    const { data, error } = await execute({ text })

    if (error) {
      toast.error('エラーが発生しました', {
        description: error.message,
      })
    }

    if (data?.textToSpeech) {
      onComplete(data.textToSpeech)
    }
  }

  return render({ fetching, onClick: handleOnClick })
}
