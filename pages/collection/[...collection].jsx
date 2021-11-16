import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { GraphQLClient, gql } from 'graphql-request';
import ProductGrid from '../../components/product/ProductGrid';
import { PRODUCTS_BY_CATEGORY, CATEGORIES_QUERY } from '../../lib/queries';
import CategoryBar from '../../components/product/CategoryBar';
import Breadcrumbs from '../../components/common/Navigation/Breadcrumbs';

export async function getStaticProps({ params }) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const { collection } = params;

  const variables = {
    slug: collection.pop(),
  };

  const { productCategories } = await client.request(
    PRODUCTS_BY_CATEGORY,
    variables
  );

  const [productData] = await productCategories.nodes.map(
    (node) => node.products
  );
  const products = await productData.nodes.map((node) => {
    let image;
    node.featuredImage
      ? (image = {
          sourceUrl: node?.featuredImage?.node?.sourceUrl,
          mediaDetails: node?.featuredImage?.node?.mediaDetails,
        })
      : (image = null);

    return {
      id: node.id,
      name: node.name,
      databaseId: node.databaseId,
      description: node.description,
      image: image,
      onSale: node.onSale,
      regularPrice: node.regularPrice,
      salePrice: node.salePrice,
    };
  });

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
    props: { categories, products },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

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

  const noChildPaths = categories
    .filter((c) => !c.children && !c.parentId)
    .map((c) => `/collection/${c.slug}`);

  const withChildPaths = categories
    .filter((c) => c.children && !c.parentId)
    .map((c) => `/collection/${c.slug}`);

  const mainCategoryWithChildren = categories.filter(
    (c) => c.children && !c.parentId
  );

  const childPaths = mainCategoryWithChildren.map((c) => {
    const parent = `/collection/${c.slug}`;
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

    const parent = `/collection/${grandParent.slug}/${node.slug}`;
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

const Collection = ({ products, categories, productData }) => {
  const [mainCategory, setMainCategory] = useState({});
  const { asPath } = useRouter();

  useEffect(() => {
    const pathnames = asPath.split('/').filter((x) => x);
    const filtered = categories.find((c) => c.slug === pathnames[1]);
    setMainCategory(filtered);
  }, [asPath, categories]);

  return (
    <>
      <Breadcrumbs py='2rem' color='brandPink.100' />
      <CategoryBar mainCategory={mainCategory} categories={categories} />
      <ProductGrid products={products} />
    </>
  );
};

export default Collection;
