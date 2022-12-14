// Next and React imports
import type { NextPage } from 'next';
// Components
import { AuthLayout } from '../components/layouts/AuthLayout';
import { BottomLinks } from '../components/ui/signin/BottomLinks';
import { LoginForm } from '../components/ui/signin/LoginForm';
// UI Components
import { Box, Typography } from '@mui/material';

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
