import { FC, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthentication from '../../hooks/useAuthentication';

interface Props {
  children: ReactNode;
}

const ProtectionLayout: FC<Props> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { User } = useAuthentication();
  const { isLoggedIn } = User;

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!isLoggedIn) {
    router.push('/signin');
    return null;
  }

  return <>{children}</>;
};

export default ProtectionLayout;
