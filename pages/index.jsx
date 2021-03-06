import dynamic from 'next/dynamic';
import { GraphQLClient, gql } from 'graphql-request';
import { FEATURED_PRODUCTS } from '../lib/queries';
import HeroSection from '../components/hero/HeroSection';

const FeaturedCollection = dynamic(() =>
  import('../components/collection/FeaturedCollection')
);
const LandingGrid = dynamic(() =>
  import('../components/collection/LandingGrid')
);

const CategoryBanner = dynamic(() =>
  import('../components/hero/CategoryBanner')
);

const ReviewCarousel = dynamic(() =>
  import('../components/reviews/carousel/ReviewCarousel')
);
import { usePrepareHomePage } from '../hooks/usePrepareHomePage';
const Home = ({ banners, hero, categories, featuredProducts }) => {
  const { loading, categoryOne, categoryTwo, categoryThree } =
    usePrepareHomePage(
      categories,
      featuredProducts,
      'Abaya',
      'Dresses',
      'Accessory'
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
          <CategoryBanner banner={banners[1]} />
          <FeaturedCollection
            products={categoryTwo?.products}
            category={categoryTwo?.category}
          />
          <LandingGrid
            categoryOne={categoryOne?.category}
            categoryTwo={categoryTwo?.category}
            categoryThree={categoryThree?.category}
          />
          <CategoryBanner banner={banners[0]} />
          <ReviewCarousel />
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
      categoryBanners {
        nodes {
          bannerImage {
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
          categoryName
          categoryShortDescription
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

  const banners = await data.categoryBanners.nodes.map((node) => {
    return {
      name: node.categoryName,
      description: node.categoryShortDescription,
      image: node.bannerImage,
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

  const featuredData = await client.request(FEATURED_PRODUCTS);

  const featuredProducts = await featuredData.products.nodes.map((node) => {
    let image;
    node.featuredImage
      ? (image = {
          sourceUrl: node?.featuredImage?.node?.sourceUrl,
          mediaDetails: node?.featuredImage?.node?.mediaDetails,
        })
      : (image = null);
    return {
      id: node.id,
      databaseId: node.databaseId,
      name: node.name,
      description: node.description,
      image: image,
      onSale: node.onSale,
      regularPrice: node.regularPrice,
      salePrice: node.salePrice,
      categoryName: node.productCategories?.nodes[0]?.name ?? false,
      categoryId: node.productCategories?.nodes[0]?.id ?? false,
    };
  });

  return {
    props: {
      featuredProducts,
      categories,
      hero,
      banners,
    },
    revalidate: 300,
  };
}
