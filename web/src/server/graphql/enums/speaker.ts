import { builder } from '@/server/graphql/builder'

export const Speaker = builder.enumType('Speaker', {
  values: ['Kazuha', 'Mizuki'] as const,
})
