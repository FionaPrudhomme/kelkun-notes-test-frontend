'use client'

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { FC, ReactNode } from 'react'

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL
})

const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem('access_token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const errorLink = onError(
    ({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(async ({ message }) => {
                if (message === 'Unauthorized') {
                    localStorage.removeItem('klk_access_token')
                }
            })
        }

        if (networkError) {
            console.log(networkError.message)
        }
    }
)

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
})

interface IProps {
    children: ReactNode
}

export const AbstractApolloProvider: FC<IProps> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
