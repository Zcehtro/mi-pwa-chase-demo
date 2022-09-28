import { FC, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthentication from '../../hooks/useAuthentication';

interface Props {
  children: ReactNode;
}

const ProtectionLayout: FC<Props> = ({ children }) => {
  const { User } = useAuthentication();
  const { isLoggedIn } = User;

  const [isLogged, setIsLogged] = useState(isLoggedIn);

  const router = useRouter();

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
