import { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { FEATURED_QUERY } from '../lib/queries';
import ProductGrid from '../components/product/ProductGrid';
import HeroSection from '../components/hero/HeroSection';
import FeaturedCollection from '../components/collection/FeaturedCollection';
import LandingGrid from '../components/collection/LandingGrid';

import { usePrepareHomePage } from '../hooks/usePrepareHomePage';
const Home = ({ products, hero, categories, featuredProducts }) => {
  const { loading, categoryOne, categoryTwo, categoryThree } =
    usePrepareHomePage(
      categories,
      featuredProducts,
      'Abaya',
      'Dresses',
      'Shirt'
    );

  return (
    <>
      <HeroSection hero={hero} />

      {loading ? null : (
        <>
          <FeaturedCollection
            products={categoryOne?.products}
            category={categoryOne?.category}
          />

          <LandingGrid
            categoryOne={categoryOne?.category}
            categoryTwo={categoryTwo?.category}
            categoryThree={categoryThree?.category}
          />
          <FeaturedCollection
            products={categoryTwo?.products}
            category={categoryTwo?.category}
          />
          <FeaturedCollection
            products={categoryThree?.products}
            category={categoryThree?.category}
          />
        </>
      )}
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
