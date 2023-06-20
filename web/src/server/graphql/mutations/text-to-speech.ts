import { builder } from '@/server/graphql/builder'
import { pollyClient } from '@/server/lib/polly'
import { env } from '@/shared/lib/env'
import { StartSpeechSynthesisTaskCommand } from '@aws-sdk/client-polly'

builder.mutationField('textToSpeech', (t) =>
  t.string({
    args: {
      text: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (parent, { text }) => {
      const command = new StartSpeechSynthesisTaskCommand({
        OutputFormat: 'mp3',
        OutputS3BucketName: env.AWS_POLLY_OUTPUT_BUCKET,
        Text: text,
        VoiceId: 'Mizuki',
      })

      const result = await pollyClient.send(command)

      return result.SynthesisTask?.OutputUri
    },
  })
)
