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
      products(first: 500) {
        edges {
          node {
            id
            name
            description(format: RAW)
            image {
              sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
            }
          }
        }
      }
      productCategories {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  `;

  const data = await client.request(QUERY);
  const products = await data.products.edges.map(({ node }) => {
    return {
      id: node.id,
      name: node.name,
      description: node.description,
      image: node.image,
    };
  });
  const categories = await data.productCategories.edges.map(({ node }) => {
    return { id: node.id, name: node.name };
  });

  return {
    props: {
      products,
      categories,
    },
    revalidate: 300,
  };
}
