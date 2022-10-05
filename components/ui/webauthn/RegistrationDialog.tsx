/* Next and React imports */
import { FC, useRef, useState } from 'react';
/* Dependencies */
import { startRegistration } from '@simplewebauthn/browser';
import useAuthentication from '../../../hooks/useAuthentication';
import axios from '../../../libs/axios';
/* UI and Components */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Box, Typography, Button, Grid } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const RegistrationDialog: FC<Props> = ({ open, onClose }) => {
  // Hooks
  const { User, EnableWebAuthn } = useAuthentication();

  // States
  const [success, setSuccess] = useState<boolean>(false);
  // prettier-ignore
  const [webAuthnMessage, setWebAuthnMessage] = useState({status: false, message: ''});

  //* WebAuthn Registration Process
  const WebAuthnRegistration = async () => {
    const resp = await axios.post('/api/registration/generate-registration-options', {
      email: User.email,
    });
    let attResp;

    try {
      const opts = await resp.data;

      opts.authenticatorSelection.residentKey = 'preferred';
      opts.authenticatorSelection.requireResidentKey = true;
      opts.extensions = {
        credProps: true,
      };

      opts.user.id = User.email;
      opts.user.name = User.email;
      opts.user.displayName = User.email;

      attResp = await startRegistration(opts);
    } catch (err: any) {
      let msg;
      if (err.name === 'InvalidStateError') {
        msg = 'Error: Authenticator already registered';
        setSuccess(true);
        return;
      } else {
        msg = JSON.stringify(err.message);
      }

      setWebAuthnMessage({
        status: true,
        message: msg,
      });
      return;
    }
    const verificationResp = await axios.post('/api/registration/verify-registration', {
      attestation: attResp,
      user: User,
    });

    const verificationJSON = await verificationResp.data;
    setWebAuthnMessage({
      status: true,
      message: `Server Response: ${JSON.stringify(verificationJSON, null, 2)}`,
    });

    let msg;

    if (verificationJSON && verificationJSON.verified) {
      msg = '¡Success!';
      EnableWebAuthn();
      setSuccess(true);
    } else {
      msg = `Something went wrong! Response: <pre>${JSON.stringify(verificationJSON)}</pre>`;
    }
    setWebAuthnMessage({
      status: true,
      message: msg,
    });
  };

  //* Handle WebAuthn Registration
  const handleRegistration = () => {
    if (typeof window !== undefined) {
      WebAuthnRegistration();
    }
  };

  return (
    <Dialog open={open} PaperProps={{ sx: { minWidth: '90vw', p: 2 } }}>
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" gap={1} color="#555">
          <Typography variant="h1" fontSize="25px">
            <strong>Biometrics setup</strong>
          </Typography>
          <Typography variant="body1" fontSize="13px" mb={5}>
            Setup your biometrics to login to your account more securely and faster, you can also use it to make payments and other transactions.
          </Typography>
          {webAuthnMessage.status && (
            <Typography variant="body1" fontSize="13px" mb={5} color="#555">
              {webAuthnMessage.message}
            </Typography>
          )}
          <FontAwesomeIcon icon={faFingerprint} color="#024987" size="6x" />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="flex-end" mt={5}>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mb={1}>
          {!success ? (
            <>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Button variant="text" color="primary" fullWidth onClick={handleRegistration}>
                    Continue
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="text" color="warning" fullWidth onClick={onClose}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <Button variant="text" color="success" fullWidth onClick={onClose}>
              Success
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};
