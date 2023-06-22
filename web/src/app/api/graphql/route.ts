import { schema } from '@/server/graphql/schema'
import { prisma } from '@/server/lib/prisma'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createYoga } from 'graphql-yoga'
import { cookies } from 'next/headers'

const { handleRequest } = createYoga({
  context: async () => {
    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser()

    const user = await prisma.user.findFirst({
      where: {
        email: supabaseUser?.email,
        isAccessGranted: true,
      },
    })

    return {
      currentUser: user,
    }
  },
  fetchAPI: { Response },
  graphqlEndpoint: '/api/graphql',
  schema: schema,
})

export { handleRequest as GET, handleRequest as POST }
