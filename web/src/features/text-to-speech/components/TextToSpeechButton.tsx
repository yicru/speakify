import { graphql } from '@/lib/gql'
import { toast } from '@/lib/sonner'
import { ReactNode } from 'react'
import { useMutation } from 'urql'

const TextToSpeechMutation = graphql(/* GraphQL */ `
  mutation TextToSpeechButton_textToSpeech($text: String!) {
    textToSpeech(text: $text)
  }
`)

type Props = {
  render: (params: { fetching: boolean; onClick: () => void }) => ReactNode
  text: string
}

export const TextToSpeechButton = ({ render, text }: Props) => {
  const [{ fetching }, execute] = useMutation(TextToSpeechMutation)

  const handleOnClick = async () => {
    const { data, error } = await execute({ text })

    if (error) {
      toast.error('エラーが発生しました', {
        description: error.message,
      })
    }

    const base64 = data?.textToSpeech
    if (base64) {
      const audio = new Audio(`data:audio/mp3;base64,${base64}`)
      await audio.play()
    }
  }

  return render({ fetching, onClick: handleOnClick })
}
