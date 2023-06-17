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

          return convert(html, {
            wordwrap: false,
          })
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
        parseHtmlFromUrl(url: String!): String
      }
    `,
  }),
})

export { handleRequest as GET, handleRequest as POST }
