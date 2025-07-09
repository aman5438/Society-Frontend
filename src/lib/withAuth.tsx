import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from './auth';
import { ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ProtectedRoute = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.replace('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default withAuth;
