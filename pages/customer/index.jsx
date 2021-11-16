import { GraphQLClient } from 'graphql-request';
import { CATEGORIES_QUERY, CUSTOMER_ORDERS_DETAILED } from '../../lib/queries';
import { useQuery } from '@apollo/client';
import useAuth from '../../hooks/useAuth';

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

  return {
    props: {
      categories,
    },
    revalidate: 300,
  };
}

const Customer = () => {
  const { customerData, customerLoading, customerError } = useAuth();
  const { loading, error, data } = useQuery(CUSTOMER_ORDERS_DETAILED);

  return (
    <>
      <div>CUSTOMER DATA</div>
    </>
  );
};

export default Customer;
