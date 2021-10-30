import { GraphQLClient, gql } from 'graphql-request';
import { FEATURED_QUERY } from '../lib/queries';
import ProductGrid from '../components/product/ProductGrid';
import HeroSection from '../components/hero/HeroSection';
import FeaturedCollection from '../components/collection/FeaturedCollection';

import { useFeaturedProducts } from '../hooks/useFeaturedProducts';
import { useCategory } from '../hooks/useCategory';

const Home = ({ products, hero, categories, featuredProducts }) => {
  const abayaProducts = useFeaturedProducts(featuredProducts, 'Abaya');
  const dressProducts = useFeaturedProducts(featuredProducts, 'Dresses');
  const abayaCategory = useCategory(categories, 'Abaya');
  const dressCategory = useCategory(categories, 'Dresses');
  const shirtCategory = useCategory(categories, 'Shirt');

  return (
    <>
      <HeroSection hero={hero} />
      <FeaturedCollection products={abayaProducts} category={abayaCategory} />
      <FeaturedCollection products={dressProducts} category={dressCategory} />
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
            image {
              mediaDetails {
                height
                width
              }
              sourceUrl
            }
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
      image: node?.image,
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

  const featuredData = await client.request(FEATURED_QUERY);

  const featuredProducts = await featuredData.products.edges.map(({ node }) => {
    return {
      id: node.id,
      name: node.name,
      description: node.description,
      image: node.image,
      type: node.type,
      categoryName: node.productCategories?.nodes[0]?.name ?? false,
      categoryId: node.productCategories?.nodes[0]?.id ?? false,
    };
  });

  return {
    props: {
      products,
      featuredProducts,
      categories,
      hero,
    },
    revalidate: 300,
  };
}
