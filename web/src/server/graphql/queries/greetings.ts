import { builder } from '@/server/graphql/builder'

builder.queryField('greetings', (t) =>
  t.string({
    resolve: async () => {
      return 'This is the `greetings` field of the root `Query` type'
    },
  })
)
