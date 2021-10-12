import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth();

  if (!loggedIn) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}
