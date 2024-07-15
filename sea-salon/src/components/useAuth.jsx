import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = (role = null) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      if (status === 'unauthenticated' || (role && session?.user?.role !== role)) {
        router.push('/login');
      } 
    }
  }, [status, session, role, router]);

  return { session, status };
};

export default useAuth;
