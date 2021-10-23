import { useRouter } from 'next/router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';

const Breadcrumbs = ({ w, ...rest }) => {
  const { asPath } = useRouter();
  const pathnames = asPath.split('/').filter((x) => x);

  return (
    <Breadcrumb
      w='80%'
      mr='auto'
      spacing='8px'
      separator={<FaChevronLeft />}
      {...rest}
    >
      <BreadcrumbItem>
        <Link href='/' passHref>
          <BreadcrumbLink>HOME</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <BreadcrumbItem key={name}>
            <Text>{name.toUpperCase()}</Text>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={name}>
            <Link href={routeTo} passHref>
              <BreadcrumbLink>{name.toUpperCase()}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
