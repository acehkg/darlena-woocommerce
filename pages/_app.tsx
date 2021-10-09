import type { AppProps } from 'next/app';

//styling
import { ChakraProvider } from '@chakra-ui/react';

//apollo client and auth functions
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apolloClient';
import { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
