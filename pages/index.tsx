import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Typography, Accordion, AccordionSummary, Chip } from '@mui/material';

import { CheckCircle } from '@mui/icons-material';
import { faLocationDot, faFingerprint } from '@fortawesome/free-solid-svg-icons';

import { MainLayout } from '../components/layouts/MainLayout';
import { bankAccounts } from '../data';
import { AccountDetailCard } from '../components/ui/index/AccountDetailCard';
import { RegistrationDialog } from '../components/ui/webauthn/RegistrationDialog';
import { NotificationCard } from '../components/ui/index/NotificationCard';
import { PageHeader } from '../components/ui/_shared/PageHeader';
import useAuthentication from '../hooks/useAuthentication';

const Home: NextPage = () => {
  const [showBiometricRegistration, setShowBiometricRegistration] = useState(false);

  const [webAuthnEnabled, setWebAuthnEnabled] = useState(false);

  const router = useRouter();
  const { User } = useAuthentication();

  const goToLocation = () => {
    router.push('/location');
  };

  useEffect(() => setWebAuthnEnabled(User.webAuthnEnabled), [User]);

  return (
    <MainLayout>
      <PageHeader />
      <Box width="100%" display="flex" flexDirection="column" alignItems="center" mt={2} gap={1}>
        <Box width="100%" px={3}>
          {webAuthnEnabled && (
            <Chip
              label="This device is registered for biometric authentication"
              icon={<CheckCircle />}
              size="medium"
              color="primary"
              sx={{ mb: 2, width: '100%' }}
            />
          )}
          {!webAuthnEnabled && (
            <NotificationCard
              title="Set up biometric authentication"
              description="You have not registered your biometric authentication yet. Please register for a better authentication experience."
              icon={faFingerprint}
              onClick={() => setShowBiometricRegistration(true)}
              readTime="1 mins"
            />
          )}
          <NotificationCard
            title="Where am I?"
            description="Have you ever wanted to know where you are? Well, now you can!"
            icon={faLocationDot}
            onClick={goToLocation}
            readTime="30 secs"
          />
        </Box>

        <Box width="100%" display="flex" flexDirection="column" gap={2} p={3}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#555' }}>
            Accounts
          </Typography>

          <Accordion
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              bgcolor: '#F3FAFF',
              borderRadius: 2,
              border: '1px solid rgb(0, 110, 215, 0.5)',
              mb: 1,
            }}
          >
            <AccordionSummary>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                sx={{ opacity: 0.6 }}
              >
                Overview
              </Typography>
            </AccordionSummary>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              bgcolor="primary.main"
              sx={{ borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
            >
              <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                Bank Accounts
              </Typography>
              <Typography variant="subtitle1" color="#fff">
                $10,120.00
              </Typography>
            </Box>

            {bankAccounts.map((account) => (
              <AccountDetailCard key={account._id} {...account} />
            ))}
          </Accordion>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{
              borderRadius: 2,
              border: '1px solid rgb(0, 110, 215, 0.6)',
              mb: 1,
            }}
          >
            <Box p={2}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                sx={{ opacity: 0.6 }}
              >
                Movements
              </Typography>
              <Typography variant="caption" fontSize="10px" sx={{ color: '#888' }}>
                This field is only a placeholder for the sake of this example.
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{
              borderRadius: 2,
              border: '1px solid rgb(0, 110, 215, 0.6)',
              mb: 1,
            }}
          >
            <Box p={2}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                sx={{ opacity: 0.6 }}
              >
                Auto Debit
              </Typography>
              <Typography variant="caption" fontSize="10px" sx={{ color: '#888' }}>
                This field is another placeholder for the sake of this example.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <RegistrationDialog
        open={showBiometricRegistration}
        onClose={() => setShowBiometricRegistration(false)}
      />
    </MainLayout>
  );
};

export default Home;
