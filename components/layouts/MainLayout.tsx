import { FC, ReactNode, useContext, useEffect } from 'react';
import Head from 'next/head';
import { BottomNavigator } from '../ui/_shared/BottomNavigator';
import ProtectionLayout from './ProtectionLayout';
import Box from '@mui/material/Box';
interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
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
        <ProtectionLayout>
          {children}
          <BottomNavigator />
        </ProtectionLayout>
      </Box>
    </>
  );
};
