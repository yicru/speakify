import SchemaBuilder from '@pothos/core'
import { User } from '@prisma/client'

const builder = new SchemaBuilder<{
  Context: {
    currentUser: User | null
  }
}>({})

builder.queryType()
builder.mutationType()

export { builder }
