import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import useAuth from '../hooks/useAuth';

export default function AuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth();
  const router = useRouter();

  if (loggedIn) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}
