import { GraphQLClient, gql } from 'graphql-request';
import { Flex, Image, Text, Heading } from '@chakra-ui/react';
import { CATEGORIES_QUERY } from '../lib/queries';
import { Gallery } from '../components/common/Image/Galleries/HorizontalGallery';
import useProductImages from '../hooks/useProductImages';

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
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        galleryImages {
          nodes {
            mediaDetails {
              width
              height
            }
            sourceUrl
          }
        }
        type
      }
    }
  `;

  const { product } = await client.request(QUERY, variables);

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
  const { isLoading, images } = useProductImages(product);

  return (
    <Flex direction='column'>
      <Gallery images={images} loading={isLoading} />
      <Heading>{product?.name}</Heading>
      <Text>{product?.description}</Text>
    </Flex>
  );
};

export default Product;
