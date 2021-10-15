import { GraphQLClient, gql } from 'graphql-request';
import { Flex, Image, Text, Heading } from '@chakra-ui/react';

export async function getStaticProps({ params }) {
  const variables = {
    id: params.product,
  };

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);
  const QUERY = gql`
    query getProduct($id: ID!) {
      product(id: $id, idType: ID) {
        id
        name
        description(format: RAW)
        image {
          sourceUrl(size: LARGE)
        }
        type
      }
    }
  `;

  const CATEGORIES_QUERY = gql`
    {
      productCategories {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  const { product } = await client.request(QUERY, variables);
  const data = await client.request(CATEGORIES_QUERY);

  const categories = await data.productCategories.edges.map(({ node }) => {
    return { id: node.id, name: node.name };
  });

  return {
    props: {
      product,
      categories,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const QUERY = gql`
    {
      products(first: 500) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  const data = await client.request(QUERY);
  const products = await data.products.edges.map(({ node }) => {
    return { id: node.id };
  });

  return {
    paths: products.map((product) => `/${product.id}`),
    fallback: false,
  };
}
const Product = ({ product, categories }) => {
  return (
    <Flex direction='column'>
      <Image
        boxSize='200px'
        src={product?.image?.sourceUrl}
        alt={product?.name}
      />
      <Heading>{product?.name}</Heading>
      <Text>{product?.description}</Text>
    </Flex>
  );
};

export default Product;
