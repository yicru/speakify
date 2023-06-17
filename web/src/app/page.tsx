'use client'

import { ParseHtmlFromUrlForm } from '@/features/html/ParseHtmlFromUrlForm'
import { graphql } from '@/lib/gql'
import { useQuery } from 'urql'

const HomePageQuery = graphql(/* GraphQL */ `
  query HomePageQuery {
    greetings
  }
`)

export default function Home() {
  const [{ data }] = useQuery({ query: HomePageQuery })

  return (
    <main>
      <ParseHtmlFromUrlForm />
    </main>
  )
}
