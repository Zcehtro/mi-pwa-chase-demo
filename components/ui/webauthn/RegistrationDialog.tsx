import {
  Dialog,
  Box,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
  Card,
  Button,
  Input,
  Skeleton,
} from '@mui/material';
import { FC, useContext, useRef, useState } from 'react';
import { USERContext } from '../../../context/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { startRegistration } from '@simplewebauthn/browser';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const RegistrationDialog: FC<Props> = ({ open, onClose }) => {
  const [webAuthnMessage, setWebAuthnMessage] = useState({
    status: false,
    message: '',
  });

  const WebAuthnRegistration = async () => {
    // "Generate registration options"
    const resp = await fetch('/api/registration/generate-registration-options');
    //Attestation resp
    let attResp;

    try {
      const opts = await resp.json();
      console.log('[DEBUG] generate-registration-options', opts);

      //Resident key is set to required
      opts.authenticatorSelection.residentKey = 'preferred';
      opts.authenticatorSelection.requireResidentKey = true;
      opts.extensions = {
        credProps: true,
      };
      attResp = await startRegistration(opts);
      //console.log('[DEBUG] Registration Options', JSON.stringify(opts, null, 2));
      // "Start the registration of the device"
      //console.log('[DEBUG] Registration Response', JSON.stringify(attResp, null, 2));
    } catch (err: any) {
      let msg;
      if (err.name === 'InvalidStateError') {
        console.error('%c[DEBUG] Error: Authenticator already registered', 'color: red');
        msg = 'Error: Authenticator already registered';
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
    const verificationResp = await fetch('/api/registration/verify-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attResp),
    });

    const verificationJSON = await verificationResp.json();
    console.log('[DEBUG] Server Response', JSON.stringify(verificationJSON, null, 2));

    let msg;

    //If the registration process is positive
    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] Authenticator registered!');
      msg = '¡Authenticator registered!';
      if (window !== undefined) {
        window.location.reload();
      }
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
    WebAuthnRegistration();
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
            <Typography variant="body1" fontSize="13px" mb={5} color="red">
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
          <Button variant="text" color="primary" fullWidth onClick={handleRegistration}>
            Continue
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
