import { GraphQLClient, gql } from 'graphql-request';
import { CATEGORIES_QUERY } from '../lib/queries';

export async function getStaticProps() {
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

const Custom404 = () => {
  return <div>404 ERROR</div>;
};

export default Custom404;
