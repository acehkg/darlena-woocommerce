import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { GraphQLClient, gql } from 'graphql-request';
import ProductGrid from '../../components/product/ProductGrid';
import ProductToggle from '../../components/product/ProductToggle';
import { PRODUCTS_BY_CATEGORY_SLUG, CATEGORIES_QUERY } from '../../lib/queries';

export async function getStaticProps({ params }) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_WORDPRESS_API_URL);

  const { category } = params;

  const variables = {
    slug: category.pop(),
  };

  const { productCategories } = await client.request(
    PRODUCTS_BY_CATEGORY_SLUG,
    variables
  );

  const [productData] = productCategories.edges.map(
    ({ node }) => node.products
  );
  const products = await productData.edges.map(({ node }) => {
    return {
      id: node.id,
      name: node.name,
      description: node.description,
      image: node.image,
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
    props: { products, categories },
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

const Category = ({ products, categories }) => {
  const [currentProducts, setCurrentProducts] = useState(products);

  return (
    <>
      <ProductToggle categories={categories} />
      <ProductGrid products={products} />
    </>
  );
};

export default Category;
