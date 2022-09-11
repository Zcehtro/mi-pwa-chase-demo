import type { NextPage } from 'next';

import { AuthLayout } from '../components/layouts/AuthLayout';

import { Box, Typography } from '@mui/material';

import { BottomLinks } from '../components/ui/signin/BottomLinks';
import { LoginForm } from '../components/ui/signin/LoginForm';

const SignIn: NextPage = () => {
  return (
    <AuthLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 420, backgroundColor: 'primary.main' }}
        paddingY={7}
      >
        <Typography variant="h3" color="white" fontWeight="bold" textAlign="center">
          LOGO
        </Typography>

        <LoginForm />
      </Box>

      <BottomLinks />
    </AuthLayout>
  );
};

export default SignIn;
