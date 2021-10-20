import { useState, useEffect } from 'react';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { Text, HStack, Flex, Select } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NoChildren = ({ href, name }) => {
  return (
    <Link href={href} passHref>
      <Text color='brandGold.100' as='a'>
        {name}
      </Text>
    </Link>
  );
};

const WithChildren = ({ href, name, childCats }) => {
  const router = useRouter();
  const handleChange = (e) => {
    router.push(e.target.value);
  };

  return (
    <Select w='10rem' onChange={(e) => handleChange(e)} dir='ltr'>
      <option value={href}>{`All ${name}`}</option>
      {childCats.map((c) => (
        <option key={c.id} value={c.href}>
          {`${c.name} ${name}`}
        </option>
      ))}
    </Select>
  );
};

const CategoryFilter = ({ mainCategory, categories }) => {
  const [currentCategory, setCurrentCategory] = useState({});
  const { categoryFilters } = useCategoryFilter(mainCategory);
  const router = useRouter();
  useEffect(() => {
    const { asPath } = router;
    const regex = /\w+$/;
    const [slug] = asPath.match(regex);
    const [f] = categories.filter((c) => c.slug === slug);
    setCurrentCategory(f);
  }, [router, categories]);

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
      justifyContent='flex-start'
    >
      <Link href={categoryFilters?.mainPath ?? '/'} passHref>
        <Text as='a' color='brandGold.100' fontWeight='bold' px='2rem'>
          {categoryFilters?.mainName}
        </Text>
      </Link>
      <HStack spacing={8}>
        {categoryFilters?.mainChildren?.map((c) => {
          return c.children ? (
            <WithChildren
              key={c.id}
              name={c.name}
              href={c.href}
              childCats={c.children}
            />
          ) : (
            <NoChildren key={c.id} name={c.name} href={c.href} />
          );
        })}
      </HStack>
    </Flex>
  );
};

export default CategoryFilter;
