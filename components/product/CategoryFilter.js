import { useState, useEffect } from 'react';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { Text, HStack, Flex, Select } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NoChildren = ({ href, name }) => {
  return (
    <Link href={href} passHref>
      <Text color='brandGold.100' as='a' pl='2rem'>
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
  const [options, setOptions] = useState([]);
  const { categoryFilters } = useCategoryFilter(mainCategory);
  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;
    const pathnames = asPath.split('/').filter((x) => x);
    const isCurrent = pathnames[pathnames.length - 1];
    const current = categories.find((c) => c.slug === isCurrent);
    setCurrentCategory(current);
  }, [router, categories]);

  useEffect(() => {
    const { asPath } = router;
    if (currentCategory.children === false) {
      setOptions(false);
    }
    if (currentCategory.children.length > 0) {
      setOptions(
        currentCategory?.children?.map(({ node }) => {
          return {
            id: node.id,
            name: node.name,
            href: `${asPath}/${node.slug}`,
          };
        })
      );
    }
  }, [currentCategory, router]);

  return (
    <Flex
      w='80%'
      h='4rem'
      mr='auto'
      my='2rem'
      alignItems='center'
      justifyContent='flex-start'
    >
      {options &&
        options.map((o) => {
          return <NoChildren key={o.id} href={o.href} name={o.name} />;
        })}
    </Flex>
  );
};

export default CategoryFilter;
