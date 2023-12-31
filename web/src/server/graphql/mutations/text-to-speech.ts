import { builder } from '@/server/graphql/builder'
import { Speaker } from '@/server/graphql/enums/speaker'
import { UnauthorizedError } from '@/server/graphql/errors/UnauthorizedException'
import { pollyClient } from '@/server/lib/polly'
import { env } from '@/shared/lib/env'
import { StartSpeechSynthesisTaskCommand } from '@aws-sdk/client-polly'

builder.mutationField('textToSpeech', (t) =>
  t.string({
    args: {
      speaker: t.arg({
        required: true,
        type: Speaker,
      }),
      text: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (parent, { speaker, text }, context) => {
      if (!context.currentUser) {
        throw new UnauthorizedError()
      }

      const command = new StartSpeechSynthesisTaskCommand({
        Engine: speaker === 'Mizuki' ? 'standard' : 'neural',
        OutputFormat: 'mp3',
        OutputS3BucketName: env.AWS_POLLY_OUTPUT_BUCKET,
        Text: text,
        VoiceId: speaker,
      })

      const result = await pollyClient.send(command)

      return result.SynthesisTask?.OutputUri
    },
  })
)
