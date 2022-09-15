import { FC, useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { USERContext, UserModel } from '../../../context/user';

import {
  browserSupportsWebAuthn,
  startAuthentication,
  startRegistration,
  platformAuthenticatorIsAvailable,
} from '@simplewebauthn/browser';

import { Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material';

import axios from 'axios';

type Inputs = {
  email: string;
  password: string;
};

const MakeReq = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

//!Development purposes only
const TEST_USER = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  email: 'jhondoe@123.com',
  password: '123456',
  publicKey: '123456',
  isLoggedIn: true,
  webAuthnEnabled: false,
};

export const LoginForm: FC = () => {
  //States Begin
  const [webAuthnRegistered, setWebAuthnRegistered] = useState(false);
  const [webAuthnMessage, setWebAuthnMessage] = useState({
    status: false,
    message: '',
  });
  //States End

  //User Context
  const { loginUser, logoutUser, isLoggedIn } = useContext(USERContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const clear = () => {
    setWebAuthnMessage({ status: false, message: '' });
  };

  //? Register biometric data with WebAuthn
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

    /* If the registration process is positive */
    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] Authenticator registered!');
      msg = '¡Authenticator registered!';
      //Sign in user
      setWebAuthnRegistered(true);
      loginUser(TEST_USER);
    } else {
      msg = `Something went wrong! Response: <pre>${JSON.stringify(verificationJSON)}</pre>`;
      console.log('[DEBUG]', msg);
    }
    setWebAuthnMessage({
      status: true,
      message: msg,
    });
  };

  //? Use the registered biometric data to authenticate
  const WebAuthnAuthentication = async () => {
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

      //? Authenticate User
      loginUser(TEST_USER);
    } else {
      msg = `Oh no, something went wrong! Response: ${JSON.stringify(verificationJSON.error)}`;
      console.log('[DEBUG] error', msg);
    }

    setWebAuthnMessage({
      status: true,
      message: msg,
    });
  };

  /* Handlers Begin */

  const handleSignIn = () => {
    clear();
    platformAuthenticatorIsAvailable().then((available) => {
      if (available) {
        WebAuthnAuthentication();
      } else {
        setWebAuthnMessage({
          status: true,
          message: 'Error: Platform Authenticator is not available',
        });
      }
    });
  };

  const handleRegisterWebAuthn = () => {
    clear();
    platformAuthenticatorIsAvailable().then((available) => {
      if (available) {
        WebAuthnRegistration();
      } else {
        setWebAuthnMessage({
          status: true,
          message: 'Error: Platform Authenticator is not available',
        });
      }
    });
  };

  const handleResetState = () => {
    clear();
    logoutUser();
    if (window !== undefined) {
      localStorage.clear();
      sessionStorage.clear();
      console.log('%c[DEBUG] Application Data Cleared', 'color: red');
    }
  };

  //? UseEffect Hook Calls
  useEffect(() => {
    clear();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && browserSupportsWebAuthn()) {
      console.log('[DEBUG] supportsWebAuthn');
    } else {
      console.log('[DEBUG] No supportsWebAuthn');
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) router.push('/');
  }, [isLoggedIn]);

  const handleSubmitMock = () => {
    console.log('[DEBUG] call onSubmit: <form onSubmit={handleSubmit(onSubmit)}>');
  };

  /* Handlers End */
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

              <Button variant="text" color="error" fullWidth onClick={handleResetState}>
                Reset state
              </Button>
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
