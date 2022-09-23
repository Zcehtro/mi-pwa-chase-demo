import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { startAuthentication, platformAuthenticatorIsAvailable } from '@simplewebauthn/browser';
import { Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthentication from '../../../hooks/useAuthentication';
import axios from '../../../libs/axios';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const { User, Auth } = useAuthentication();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const req = await axios.post('/api/signin', data);

    const { user } = req.data;

    if (user) {
      Auth(user);
      console.log('[DEBUG] Auth():', User);
    } else {
      console.log('[DEBUG] AxiosReq: User was not found in database');
    }
  };

  const AuthenticateWithBiometrics = async () => {
    const resp = await axios.post('/authn/generate-authentication-options', {
      email: User.email,
    });
    let asseResp;

    try {
      const opts = await resp.data;
      console.log('[DEBUG] Authentication Options', JSON.stringify(opts, null, 2));

      //! FAIL HERE
      asseResp = await startAuthentication(opts);
      console.log('[DEBUG] Authentication Response', JSON.stringify(asseResp, null, 2));
    } catch (error: any) {
      console.error('[DEBUG] startAuthentication() Fail:', JSON.stringify(error.message));
      // throw error;
      return;
    }

    const verificationResp = await axios.post('/authn/verify-authentication', {
      attestation: JSON.stringify(asseResp),
      email: User.email,
    });

    const verificationJSON = await verificationResp.data;
    console.log('[DEBUG] Server Response', JSON.stringify(verificationJSON, null, 2));

    let msg;
    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] User authenticated!');

      //? Authenticate User
      const req = await axios.post('/api/user', {
        email: User.email,
      });

      const { user } = req.data;

      if (user) {
        Auth(user);
        console.log('[DEBUG] User Authenticated:', User);
      } else {
        console.log('[DEBUG] AxiosReq: User was not found in database');
      }
    } else {
      msg = `Oh no, something went wrong! Response: ${JSON.stringify(verificationJSON.error)}`;
      console.log('[DEBUG] error', msg);
    }
  };

  useEffect(() => {
    if (User.isLoggedIn) router.push('/');
  }, [User.isLoggedIn]);

  /* Handlers End */
  return (
    <>
      {!User.isLoggedIn && (
        <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: '10px' }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                    Sign In
                  </Button>
                  {
                    // WebAuthn
                    User.webAuthnEnabled && (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={AuthenticateWithBiometrics}
                        startIcon={<FontAwesomeIcon icon={faFingerprint} />}
                        sx={{ mt: 2 }}
                      >
                        with biometrics
                      </Button>
                    )
                  }
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

/* const WebAuthnRegistration = async () => {
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
  };*/
