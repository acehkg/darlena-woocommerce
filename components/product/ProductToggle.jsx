import { useState, useEffect } from 'react';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { Box, Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductToggle = ({ categories }) => {
  const [category, setCategory] = useState('');
  const { hasChildren, childCategories } = useCategoryFilter(
    category,
    categories
  );
  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;
    const regex = /\w+$/;
    const [category] = asPath.match(regex);
    setCategory(category);
  }, [router]);

  const { asPath } = useRouter();
  return (
    <>
      {hasChildren ? (
        <HStack p='5rem' spacing={16}>
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
    </>
  );
};

export default ProductToggle;
