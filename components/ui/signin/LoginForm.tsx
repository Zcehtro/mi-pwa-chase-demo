import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
  browserSupportsWebAuthn,
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';

import { Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material';

import { WebAuthnModal } from './WebAuthnModal';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const [webAuthnRegistered, setWebAuthnRegistered] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [webAuthnMessage, setWebAuthnMessage] = useState({
    status: false,
    message: '',
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const clear = () => {
    setWebAuthnMessage({ status: false, message: '' });
  };

  useEffect(() => {
    clear();
  }, []);

  // const onSubmit: SubmitHandler<Inputs> = async (data) => {
  //   const { email, password } = data;

  //   try {
  //     const res = await axios.post(
  //       'https://pwa-chase-api.vercel.app/api/signin',
  //       {
  //         email,
  //         password
  //       }
  //     );

  //     const user = res.data.user;

  //     const webAuthnAvailable = await platformAuthenticatorIsAvailable();

  //     // loginUser(
  //     //   user._id,
  //     //   user.name,
  //     //   user.surname,
  //     //   user.email,
  //     //   user.password,
  //     //   user.publicKey,
  //     //   true,
  //     //   user.webAuthnEnabled
  //     // );

  //     if (!user.webAuthnEnabled && webAuthnAvailable) {
  //       setWebAuthnModal(true);
  //     }

  //     //if is webauthn enabled
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const webauthnRegistration = async () => {
    const resp = await fetch(`/api/registration/generate-registration-options`);
    //Attestation resp
    let attResp;

    try {
      const opts = await resp.json();
      console.log('[DEBUG] generate-registration-options', opts);

      //Resident key is set to required
      opts.authenticatorSelection.residentKey = 'required';
      opts.authenticatorSelection.requireResidentKey = true;
      opts.extensions = {
        credProps: true,
      };

      console.log('[DEBUG] Registration Options', JSON.stringify(opts, null, 2));

      attResp = await startRegistration(opts);
      console.log('[DEBUG] Registration Response', JSON.stringify(attResp, null, 2));
    } catch (err: any) {
      let msg;
      if (err.name === 'InvalidStateError') {
        console.error('[DEBUG] Error: Authenticator already registered');
        msg = 'Error: Authenticator already registered';
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
    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] Authenticator registered!');
      msg = 'Success! Authenticator registered';
      //Sign in user
      setWebAuthnRegistered(true);
    } else {
      msg = `Something went wrong! Response: <pre>${JSON.stringify(verificationJSON)}</pre>`;
      console.log('[DEBUG]', msg);
    }
    setWebAuthnMessage({
      status: true,
      message: msg,
    });
  };

  const auth = async () => {
    const resp = await fetch('/api/auth/generate-authentication-options');
    let asseResp;

    try {
      const opts = await resp.json();
      console.log('[DEBUG] Authentication Options', JSON.stringify(opts, null, 2));

      asseResp = await startAuthentication(opts);
      console.log('[DEBUG] Authentication Response', JSON.stringify(asseResp, null, 2));
    } catch (error: any) {
      console.error('[DEBUG] error 2:', JSON.stringify(error.message));
      setWebAuthnMessage({
        status: true,
        message: JSON.stringify(error.message),
      });
      // throw error;
      return;
    }

    const verificationResp = await fetch('/api/auth/verify-authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(asseResp),
    });

    const verificationJSON = await verificationResp.json();
    console.log('[DEBUG] Server Response', JSON.stringify(verificationJSON, null, 2));

    let msg;
    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] User authenticated!');
      msg = 'Success! User authenticated by device.';
      setLoggedIn(true);
    } else {
      msg = `Oh no, something went wrong! Response: ${JSON.stringify(verificationJSON.error)}`;
      console.log('[DEBUG] error', msg);
    }

    setWebAuthnMessage({
      status: true,
      message: msg,
    });
  };

  const handleSignIn = () => {
    clear();
    auth();
  };

  const handleRegisterWebAuthn = () => {
    clear();
    webauthnRegistration();
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && browserSupportsWebAuthn()) {
      console.log('[DEBUG] supportsWebAuthn');
    } else {
      console.log('[DEBUG] No supportsWebAuthn');
    }
  }, []);

  useEffect(() => {
    if (LoggedIn && webAuthnRegistered) router.push('/');
  });

  const handleSubmitMock = () => {
    console.log('[DEBUG] call onSubmit: <form onSubmit={handleSubmit(onSubmit)}>');
  };

  return (
    <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: '10px' }}>
      <CardContent>
        <form onSubmit={() => handleSubmitMock()}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your email"
                variant="standard"
                {...register('email', { required: true })}
                error={errors.email ? true : false}
                helperText={errors.email ? 'Email is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your password"
                variant="standard"
                type="password"
                {...register('password', { required: true })}
                error={errors.password ? true : false}
                helperText={errors.password ? 'Password is required' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <Checkbox defaultChecked />
              <Typography variant="caption" color="primary">
                Remember me
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
              <Link href="/forgot-password">
                <Typography variant="caption" color="primary">
                  ¿Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleSignIn} sx={{ mt: 2 }}>
                Sign In
              </Button>

              {!webAuthnRegistered && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleRegisterWebAuthn}
                  sx={{ my: 2 }}
                >
                  Register WebAuthn
                </Button>
              )}
              {webAuthnMessage.status && (
                <Typography variant="caption" color="primary" textAlign="center" mt={2}>
                  {webAuthnMessage.message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
