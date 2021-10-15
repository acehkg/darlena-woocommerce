import { GraphQLClient, gql } from 'graphql-request';

export async function getStaticProps() {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

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

  const data = await client.request(CATEGORIES_QUERY);
  const categories = await data.productCategories.edges.map(({ node }) => {
    return { id: node.id, name: node.name };
  });

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
