import { GraphQLClient } from 'graphql-request';
import { CATEGORIES_QUERY, CUSTOMER_ORDERS_DETAILED } from '../../lib/queries';
import WoocommerceRestApi from '@woocommerce/woocommerce-rest-api';
import CustomerAuthContent from '../../components/auth/CustomerAuthContent';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@apollo/client';

export async function getStaticProps({ params }) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const categoriesData = await client.request(CATEGORIES_QUERY);
  const categories = await categoriesData.productCategories.edges.map(
    ({ node }) => {
      return {
        id: node.id,
        name: node.name,
        children: node.children.edges.length > 0 ? node.children.edges : false,
        parentId: node?.parentId ?? false,
        slug: node?.slug,
      };
    }
  );

  const WooCommerce = new WoocommerceRestApi({
    url: process.env.WOOCOMMERCE_API_URL,
    consumerKey: process.env.WOOCOMMERCE_CK,
    consumerSecret: process.env.WOOCOMMERCE_CS,
    version: 'wc/v3',
  });

  const customerId = `customers/${params.customer}`;
  const response = await WooCommerce.get(customerId);
  const customer = await response.data;

  if (!customer) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      customer,
      categories,
    },
    revalidate: 300,
  };
}
export async function getStaticPaths() {
  const WooCommerce = new WoocommerceRestApi({
    url: process.env.WOOCOMMERCE_API_URL,
    consumerKey: process.env.WOOCOMMERCE_CK,
    consumerSecret: process.env.WOOCOMMERCE_CS,
    version: 'wc/v3',
  });

  const response = await WooCommerce.get('customers');
  const users = await response.data;

  return {
    paths: users.map((user) => `/customer/${user.id}`),
    fallback: 'blocking',
  };
}
const Customer = ({ customer }) => {
  const { loading, error, data } = useQuery(CUSTOMER_ORDERS_DETAILED);

  return (
    <CustomerAuthContent id={customer.id}>
      <div>{customer.first_name}</div>
    </CustomerAuthContent>
  );
};

export default Customer;
