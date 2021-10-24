import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Button, HStack } from '@chakra-ui/react';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { FiChevronLeft, RiCloseLine } from 'react-icons/fi';

const ChildButton = ({ name, href, mainHref }) => {
  const router = useRouter();
  const path = router.asPath;
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleClick = () => {
    active && router.push(mainHref);
    !active && router.push(href);
  };

  useEffect(() => {
    if (path !== href) {
      setDisabled(true);
      setActive(false);
    }
    if (path === href) {
      setActive(true);
    }
    if (path === mainHref) {
      setDisabled(false);
    }
  }, [path, href, mainHref]);

  return (
    <Button
      rightIcon={<FiChevronLeft />}
      isActive={active}
      isDisabled={disabled}
      backgroundColor='brandGrey.400'
      _active={{
        backgroundColor: 'brandPink.100',
      }}
      _hover={{ backgroundColor: 'brandPink.100' }}
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

const CategoryBar = ({ mainCategory, categories }) => {
  const [currentCategory, setCurrentCategory] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;
    const pathnames = asPath.split('/').filter((x) => x);
    const isCurrent = pathnames[pathnames.length - 1];
    const current = categories.find((c) => c.slug === isCurrent);
    setCurrentCategory(current);
  }, [router, categories]);

  const { categoryFilters } = useCategoryFilter(mainCategory);
  const { mainName, mainPath, mainChildren } = categoryFilters;

  return (
    <Flex
      w='80%'
      h='4rem'
      mx='auto'
      my='2rem'
      alignItems='center'
      justifyContent='flex-start'
      boxShadow='lg'
      borderRadius='4px'
    >
      <HStack spacing={16} pr='1rem'>
        {mainChildren?.map((c) => {
          return (
            <ChildButton
              key={c.id}
              href={c.href}
              name={c.name}
              mainHref={mainPath}
            />
          );
        })}
      </HStack>
    </Flex>
  );
};

export default CategoryBar;
