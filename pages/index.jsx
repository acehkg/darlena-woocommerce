import { GraphQLClient, gql } from 'graphql-request';
import ProductGrid from '../components/product/ProductGrid';
import HeroSection from '../components/hero/HeroSection';

const Home = ({ products, hero }) => {
  return (
    <>
      <HeroSection hero={hero} />
      <ProductGrid products={products} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const QUERY = gql`
    {
      heroes {
        nodes {
          id
          mainHeading
          subHeading
          buttonText
          backGroundImage {
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
      }
      products(first: 500) {
        edges {
          node {
            id
            name
            type
            description(format: RAW)
            image {
              sourceUrl
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
      productCategories(first: 500) {
        edges {
          node {
            id
            description
            name
            slug
            children {
              edges {
                node {
                  id
                  name
                  description
                  slug
                }
              }
            }
            parentId
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
      type: node.type,
    };
  });

  const categories = await data.productCategories.edges.map(({ node }) => {
    return {
      id: node.id,
      name: node.name,
      children: node.children.edges.length > 0 ? node.children.edges : false,
      parentId: node?.parentId ?? false,
      slug: node?.slug,
    };
  });

  const [hero] = await data.heroes.nodes.map((node) => {
    return {
      id: node.id,
      mainHeading: node.mainHeading,
      subHeading: node.subHeading,
      buttonText: node.buttonText,
      image: node.backGroundImage ?? null,
    };
  });
  return {
    props: {
      products,
      categories,
      hero,
    },
    revalidate: 300,
  };
}
