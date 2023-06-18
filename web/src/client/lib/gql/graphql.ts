/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Mutation = {
  __typename?: 'Mutation'
  parseHtmlFromUrl: Scalars['String']['output']
  textToSpeech: Scalars['String']['output']
}

export type MutationParseHtmlFromUrlArgs = {
  url: Scalars['String']['input']
}

export type MutationTextToSpeechArgs = {
  text: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  greetings: Scalars['String']['output']
}

export type ParseHtmlFromUrlForm_ParseHtmlFromUrlMutationVariables = Exact<{
  url: Scalars['String']['input']
}>

export type ParseHtmlFromUrlForm_ParseHtmlFromUrlMutation = {
  __typename?: 'Mutation'
  parseHtmlFromUrl: string
}

export type TextToSpeechButton_TextToSpeechMutationVariables = Exact<{
  text: Scalars['String']['input']
}>

export type TextToSpeechButton_TextToSpeechMutation = {
  __typename?: 'Mutation'
  textToSpeech: string
}

export const ParseHtmlFromUrlForm_ParseHtmlFromUrlDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ParseHtmlFromUrlForm_parseHtmlFromUrl' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'parseHtmlFromUrl' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'url' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'url' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ParseHtmlFromUrlForm_ParseHtmlFromUrlMutation,
  ParseHtmlFromUrlForm_ParseHtmlFromUrlMutationVariables
>
export const TextToSpeechButton_TextToSpeechDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'TextToSpeechButton_textToSpeech' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'textToSpeech' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'text' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'text' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TextToSpeechButton_TextToSpeechMutation,
  TextToSpeechButton_TextToSpeechMutationVariables
>
