import { builder } from '@/server/graphql/builder'
import '@/server/graphql/mutations/parse-html-from-url'
import '@/server/graphql/mutations/text-to-speech'
import '@/server/graphql/queries/greetings'

export const schema = builder.toSchema()
