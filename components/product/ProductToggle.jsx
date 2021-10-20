import { useState, useEffect } from 'react';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { Text, HStack, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductToggle = ({ categories, mainCategory }) => {
  const [category, setCategory] = useState({});
  const [previousCategory, setPreviousCategory] = useState({});

  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;
    const regex = /\w+$/;
    const [slug] = asPath.match(regex);
    const [f] = categories.filter((c) => c.slug === slug);
    setCategory(f);
  }, [router, categories]);

  const { asPath } = router;

  useEffect(() => {
    const pathnames = asPath.split('/').filter((x) => x);
    const [cat] = categories.filter(
      (c) => c.slug === pathnames[pathnames.length - 2]
    );
    setPreviousCategory(cat);
  }, [asPath, categories]);

  const { hasChildren, childCategories, currentCategory } = useCategoryFilter(
    category,
    categories
  );

  return (
    <Flex
      w='80%'
      h='4rem'
      border='1px solid'
      borderColor='brandGrey.100'
      borderRadius='lg'
      mx='auto'
      my='2rem'
      alignItems='center'
      justifyContent='space-evenly'
    >
      <Link href={`/category/${mainCategory?.slug}`} passHref>
        <Text as='a' fontWeight='bold' color='brandGold.100'>
          {mainCategory?.name}
        </Text>
      </Link>
      {previousCategory?.slug !== mainCategory?.slug ? (
        <Link
          href={`/category/${mainCategory?.slug}/${previousCategory?.slug}`}
          passHref
        >
          <Text as='a' fontWeight='bold' color='brandGold.100'>
            {previousCategory?.name}
          </Text>
        </Link>
      ) : null}
      {currentCategory?.slug !== mainCategory?.slug ? (
        <Text fontWeight='bold' color='brandGold.100'>
          {currentCategory?.name}
        </Text>
      ) : null}

      {hasChildren ? (
        <HStack spacing={16}>
          {childCategories.map(({ node }) => {
            return (
              <Link key={node.id} href={`${asPath}/${node.slug}`} passHref>
                <Text color='brandGold.100' as='a'>
                  {node.name}
                </Text>
              </Link>
            );
          })}
        </HStack>
      ) : null}
    </Flex>
  );
};

export default ProductToggle;
