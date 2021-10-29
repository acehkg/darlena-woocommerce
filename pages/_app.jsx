//apollo client ,auth and customer functions
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apolloClient';
import { AuthProvider } from '../hooks/useAuth';
import { CustomerProvider } from '../hooks/useCustomer';

//styling
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import 'focus-visible/dist/focus-visible';
import '@fontsource/almarai/400.css';
import '@fontsource/almarai/700.css';
//Layout FOr All Pages
import Layout from '../components/common/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CustomerProvider>
          <ChakraProvider theme={theme}>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </CustomerProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
