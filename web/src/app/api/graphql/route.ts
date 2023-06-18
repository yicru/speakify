import { textToSpeechClient } from '@/server/lib/google'
import { createSchema, createYoga } from 'graphql-yoga'
import { convert } from 'html-to-text'
import { ofetch } from 'ofetch'

const { handleRequest } = createYoga({
  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  schema: createSchema({
    resolvers: {
      Mutation: {
        parseHtmlFromUrl: async (_, { url }) => {
          const html = await ofetch(url)
          return convert(html, { wordwrap: false })
        },
        textToSpeech: async (_, { text }) => {
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
      },
      Query: {
        greetings: () =>
          'This is the `greetings` field of the root `Query` type',
      },
    },
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
      }

      type Mutation {
        parseHtmlFromUrl(url: String!): String!
        textToSpeech(text: String!): String!
      }
    `,
  }),
})

export { handleRequest as GET, handleRequest as POST }
