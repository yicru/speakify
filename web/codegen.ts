import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  documents: ['src/**/*.tsx'],
  generates: {
    './src/client/lib/gql/': {
      preset: 'client',
    },
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix && prettier --write'],
  },
  ignoreNoDocuments: true,
  schema: 'http://localhost:3000/api/graphql',
}

export default config
