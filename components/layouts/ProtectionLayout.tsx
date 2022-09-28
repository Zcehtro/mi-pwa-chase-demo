import { FC, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthentication from '../../hooks/useAuthentication';

interface Props {
  children: ReactNode;
}

const ProtectionLayout: FC<Props> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const router = useRouter();

  const { User } = useAuthentication();
  const { isLoggedIn } = User;

  useEffect(() => {
    setIsLogged(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLogged) {
      router.push('/signin');
    }
  }, [isLogged]);

  return <>{isLogged ? children : null}</>;
};

export default ProtectionLayout;
