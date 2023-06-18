import { schema } from '@/server/graphql/schema'
import { createYoga } from 'graphql-yoga'

const { handleRequest } = createYoga({
  fetchAPI: { Response },
  graphqlEndpoint: '/api/graphql',
  schema: schema,
})

export { handleRequest as GET, handleRequest as POST }
