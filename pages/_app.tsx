import type { AppProps } from 'next/app';

//styling
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';

//apollo client ,auth and customer functions
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apolloClient';
import { AuthProvider } from '../hooks/useAuth';
import { CustomerProvider } from '../hooks/useCustomer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CustomerProvider>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </CustomerProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
