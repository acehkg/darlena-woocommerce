import { GraphQLClient, gql } from 'graphql-request';

export async function getStaticProps({ params }) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const { category } = params;

  const variables = {
    slug: category.pop(),
  };

  console.log(category);
  const PRODUCTS_QUERY = gql`
    query getProducts($slug: [String]) {
      productCategories(where: { slug: $slug }) {
        edges {
          node {
            id
            products {
              edges {
                node {
                  id
                  name
                  image {
                    sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
                  }
                  description(format: RAW)
                }
              }
            }
          }
        }
      }
    }
  `;

  const { productCategories } = await client.request(PRODUCTS_QUERY, variables);

  const [edges] = productCategories.edges.map(({ node }) => node.products);

  return {
    props: { products: edges },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const CATEGORIES_QUERY = gql`
    {
      productCategories {
        edges {
          node {
            id
            name
            slug
            parentId
            children {
              edges {
                node {
                  name
                  id
                  slug
                  parentId
                  children {
                    edges {
                      node {
                        id
                        name
                        parentId
                        slug
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const categoriesData = await client.request(CATEGORIES_QUERY);
  const categories = await categoriesData.productCategories.edges.map(
    ({ node }) => {
      return {
        id: node.id,
        children: node.children.edges.length > 0 ? node.children.edges : false,
        parentId: node?.parentId ?? false,
        slug: node?.slug,
      };
    }
  );

  const mainCategoryNoChildren = categories.filter(
    (c) => !c.children && !c.parentId
  );

  const noChildPaths = categories
    .filter((c) => !c.children && !c.parentId)
    .map((c) => `/category/${c.slug}`);

  const withChildPaths = categories
    .filter((c) => c.children && !c.parentId)
    .map((c) => `/category/${c.slug}`);

  const mainCategoryWithChildren = categories.filter(
    (c) => c.children && !c.parentId
  );

  const childPaths = mainCategoryWithChildren.map((c) => {
    const parent = `/category/${c.slug}`;
    const children = c.children.map(({ node }) => {
      return `${parent}/${node.slug}`;
    });
    return children;
  });

  const withSubCategory = mainCategoryWithChildren
    .map((m) => m.children)
    .flat()
    .filter(({ node }) => node.children.edges.length > 0);

  const subCategoryPaths = withSubCategory.map(({ node }) => {
    const [grandParent] = categories.filter((c) => c.id === node.parentId);

    const parent = `/category/${grandParent.slug}/${node.slug}`;
    const children = node.children.edges.map(
      ({ node }) => `${parent}/${node.slug}`
    );
    return children;
  });

  const nestedPaths = [
    ...noChildPaths,
    ...withChildPaths,
    ...childPaths,
    ...subCategoryPaths,
  ];

  const paths = nestedPaths.flat(Infinity);

  return {
    paths,
    fallback: 'blocking',
  };
}

const Category = (props) => {
  console.log(props);
  return <div></div>;
};

export default Category;
