import { Dialog, Box, Typography, Button } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { startRegistration } from '@simplewebauthn/browser';
import useAuthentication from '../../../hooks/useAuthentication';
import axios from '../../../libs/axios';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const RegistrationDialog: FC<Props> = ({ open, onClose }) => {
  const { User, EnableWebAuthn } = useAuthentication();
  const [success, setSuccess] = useState<boolean>(false);
  const [webAuthnMessage, setWebAuthnMessage] = useState({
    status: false,
    message: '',
  });

  const WebAuthnRegistration = async () => {
    // "Generate registration options"
    const resp = await axios.post('/api/registration/generate-registration-options', {
      email: User.email,
    });
    //Attestation resp
    let attResp;

    try {
      const opts = await resp.data;
      console.log('[DEBUG] generate-registration-options', opts);

      //Resident key is set to required
      opts.authenticatorSelection.residentKey = 'preferred';
      opts.authenticatorSelection.requireResidentKey = true;
      opts.extensions = {
        credProps: true,
      };

      //Set the user data
      opts.user.id = User.email;
      opts.user.name = User.email;
      opts.user.displayName = User.email;

      attResp = await startRegistration(opts);
      //console.log('[DEBUG] Registration Options', JSON.stringify(opts, null, 2));
      // "Start the registration of the device"
      //console.log('[DEBUG] Registration Response', JSON.stringify(attResp, null, 2));
    } catch (err: any) {
      let msg;
      if (err.name === 'InvalidStateError') {
        console.error('%c[DEBUG] Error: Authenticator already registered', 'color: red');
        msg = 'Error: Authenticator already registered';
        setSuccess(true);
        return;
      } else {
        console.error('[DEBUG] Error 1:', err);
        msg = JSON.stringify(err.message);
      }

      // throw err;

      setWebAuthnMessage({
        status: true,
        message: msg,
      });
      return;
    }
    // "Begin verification of registration"
    const verificationResp = await axios.post('/api/registration/verify-registration', {
      attestation: attResp,
      user: User,
    });

    const verificationJSON = await verificationResp.data;
    console.log('[DEBUG] Server Response', JSON.stringify(verificationJSON, null, 2));
    setWebAuthnMessage({
      status: true,
      message: `Server Response: ${JSON.stringify(verificationJSON, null, 2)}`,
    });

    let msg;

    //If the registration process is positive
    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] Authenticator registered!');
      msg = '¡Success!';
      EnableWebAuthn();
      setSuccess(true);
    } else {
      msg = `Something went wrong! Response: <pre>${JSON.stringify(verificationJSON)}</pre>`;
      console.log('[DEBUG]', msg);
    }
    setWebAuthnMessage({
      status: true,
      message: msg,
    });
  };

  const handleRegistration = () => {
    if (typeof window !== undefined) {
      WebAuthnRegistration();
    }
  };

  return (
    <Dialog open={open} PaperProps={{ sx: { minWidth: '90vw', p: 2 } }}>
      {/*Name, account id and email */}
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          gap={1}
          color="#555"
        >
          <Typography variant="h1" fontSize="25px">
            <strong>Biometrics setup</strong>
          </Typography>
          <Typography variant="body1" fontSize="13px" mb={5}>
            Setup your biometrics to login to your account more securely and faster, you can also
            use it to make payments and other transactions.
          </Typography>
          {webAuthnMessage.status && (
            <Typography variant="body1" fontSize="13px" mb={5} color="#555">
              {webAuthnMessage.message}
            </Typography>
          )}
          <FontAwesomeIcon icon={faFingerprint} color="#024987" size="6x" />
        </Box>
      </Box>
      {/* Actions buttons */}
      <Box display="flex" flexDirection="column" justifyContent="flex-end" mt={5}>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mb={1}>
          {/*Save button*/}
          {!success ? (
            <Button variant="text" color="primary" fullWidth onClick={handleRegistration}>
              Continue
            </Button>
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
