'use client'

import { ReactNode } from 'react'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql'

type Props = {
  children: ReactNode
}

const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  url: '/api/graphql',
})

export const Providers = ({ children }: Props) => {
  return <Provider value={client}>{children}</Provider>
}
