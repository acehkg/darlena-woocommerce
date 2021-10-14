import { GraphQLClient, gql } from 'graphql-request';
import ProductGrid from '../components/product/ProductGrid';

const Home = ({ products }) => {
  return <ProductGrid products={products} />;
};

export default Home;

export async function getStaticProps() {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const QUERY = gql`
    {
      products(first: 50) {
        edges {
          node {
            id
            name
            description(format: RAW)
          }
        }
      }
    }
  `;

  const data = await client.request(QUERY);
  const products = await data.products.edges.map(({ node }) => {
    return { id: node.id, name: node.name, description: node.description };
  });

  return {
    props: {
      products,
    },
    revalidate: 600,
  };
}
