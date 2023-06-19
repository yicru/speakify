import { builder } from '@/server/graphql/builder'
import { pollyClient } from '@/server/lib/polly'
import { SynthesizeSpeechCommand } from '@aws-sdk/client-polly'

builder.mutationField('textToSpeech', (t) =>
  t.string({
    args: {
      text: t.arg.string({ required: true }),
    },
    resolve: async (parent, { text }) => {
      const command = new SynthesizeSpeechCommand({
        OutputFormat: 'mp3',
        Text: text,
        VoiceId: 'Mizuki',
      })

      const result = await pollyClient.send(command)
      const base64String = await result.AudioStream?.transformToString('base64')

      if (!base64String) {
        throw new Error('Failed to convert audio stream')
      }

      return base64String
    },
  })
)
