/* Next and React imports */
import type { NextPage } from 'next';
/* UI and Components */
import { RegistrationForm } from '../components/ui/signin/RegistrationForm';
import { BottomLinks } from '../components/ui/signin/BottomLinks';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { Box, Typography } from '@mui/material';

const Login: NextPage = () => {
  return (
    <AuthLayout>
      <Box>
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
          <RegistrationForm />
        </Box>
        <BottomLinks />
      </Box>
    </AuthLayout>
  );
};

export default Login;
