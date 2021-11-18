import { GraphQLClient, gql } from 'graphql-request';
import { CATEGORIES_QUERY } from '../lib/queries';
import { ProductDetails } from '../components/product/ProductDetails/ProductDetails';
import useProductImages from '../hooks/useProductImages';
import { PRODUCT_COMPLETE } from '../lib/queries';

export async function getStaticProps({ params }) {
  const variables = {
    id: params.product,
  };

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const { product } = await client.request(PRODUCT_COMPLETE, variables);

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

  if (!product) {
    return {
      notFound: true,
    };
  }

  if (product.status !== 'publish') {
    return {
      notFound: true,
    };
  }

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
            name
            status
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
      status: node.status,
    };
  });

  const publishedProducts = products.filter((p) => p.status === 'publish');

  return {
    paths: publishedProducts.map((product) => `/${product.id}`),
    fallback: 'blocking',
  };
}
const Product = ({ product, categories }) => {
  const { isLoading, images } = useProductImages(product);
  console.log(images);
  return (
    <ProductDetails images={images} loading={isLoading} product={product} />
  );
};

export default Product;
