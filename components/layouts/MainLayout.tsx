import { FC, ReactNode, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BottomNavigator } from '../ui/_shared/BottomNavigator';
import Box from '@mui/material/Box';
import { USERContext } from '../../context/user';

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  const { isLoggedIn } = useContext(USERContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && (
        <>
          <Head>
            <title>Chase - Demo</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
            <meta name="description" content="This is a pwa demo inspired in chase web app." />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Box sx={{ minHeight: '100vh' }}>
            {children}
            <BottomNavigator />
          </Box>
        </>
      )}
    </>
  );
};
