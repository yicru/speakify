import { builder } from '@/server/graphql/builder'
import { textToSpeechClient } from '@/server/lib/google'

builder.mutationField('textToSpeech', (t) =>
  t.string({
    args: {
      text: t.arg.string({ required: true }),
    },
    resolve: async (parent, { text }) => {
      const [response] = await textToSpeechClient.synthesizeSpeech({
        audioConfig: { audioEncoding: 'MP3' },
        input: { text: text },
        voice: { languageCode: 'ja-JP', ssmlGender: 'NEUTRAL' },
      })

      if (!(response.audioContent instanceof Uint8Array)) {
        throw new Error('audioContent is not a Uint8Array')
      }

      return Buffer.from(response.audioContent).toString('base64')
    },
  })
)
