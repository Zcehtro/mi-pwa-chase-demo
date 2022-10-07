/*React and Next imports*/ import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
/* Dependencies */
import { useForm, SubmitHandler } from 'react-hook-form';
import { startAuthentication } from '@simplewebauthn/browser';
import axios from '../../../libs/axios';
/* Custom Hooks */
import useAuthentication from '../../../hooks/useAuthentication';
/* Types */
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
/* UI and Components */
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Card, CardContent, Checkbox, Grid, TextField, Typography } from '@mui/material';

//* Form Inputs
type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  // Hooks
  const { User, Auth, Logout } = useAuthentication();
  const router = useRouter();
  // prettier-ignore
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  // States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webAuthnEnabled, setWebAuthnEnabled] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState({ status: false, message: '' });
  const [pressedLogOut, setPressedLogOut] = useState(false);

  //* useEffect Section
  useEffect(() => {
    setIsLoggedIn(User.isLoggedIn);
    setWebAuthnEnabled(User.webAuthnEnabled);
    setUserName(User.name);
  }, [User]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (pressedLogOut) {
      setTimeout(() => {
        setPressedLogOut(false);
      }, 4000);
    }
  }, [pressedLogOut]);
  //* useEffect Section end

  //? Form Handler
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const req = await axios.post('/api/signin', data);
    const { user } = req.data;

    if (user) Auth(user);
  };

  //? WebAuthn Handler
  const AuthenticateWithBiometrics = async () => {
    let resp: any;
    let asseResp;

    try {
      resp = await axios.post('/api/auth/generate-authentication-options', {
        id: User.email,
      });
    } catch (error) {
      setError({
        status: true,
        message: `catch block -> ${JSON.stringify(error, null, 2)}`,
      });
    }

    try {
      const opts = resp.data as PublicKeyCredentialCreationOptionsJSON;

      asseResp = await startAuthentication(opts);
    } catch (error: any) {
      setError({
        status: true,
        message: `catch block -> ${JSON.stringify(error.message)}`,
      });
      return;
    }

    const verificationResp = await axios.post('/api/auth/verify-authentication', {
      attestation: asseResp,
      id: User.email,
    });

    const verificationJSON = await verificationResp.data;

    let msg;
    if (verificationJSON && verificationJSON.verified) {
      const req = await axios.post('/api/user', {
        email: User.email,
      });

      const user = req.data;

      if (user) {
        Auth(user);
        router.push('/');
      } else {
        setError({
          status: true,
          message: 'User was not found in database',
        });
      }
    } else {
      msg = `Oh no, something went wrong! Response: ${JSON.stringify(verificationJSON.error)}`;
      setError({
        status: true,
        message: msg,
      });
    }
  };

  //? Logout Handler
  const handleLogout = () => {
    Logout();
  };

  const handlePressedLogOut = () => {
    setPressedLogOut(true);
  };

  return (
    <>
      {!isLoggedIn && (
        <Card
          sx={{
            maxWidth: 350,
            mt: 5,
            paddingY: 2,
            borderRadius: '10px',
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {userName && (
                    <Box textAlign="center" mb={3}>
                      <Typography display="inline" fontWeight="bold" color="#666" variant="h6">
                        Hello&nbsp;{userName.charAt(0).toUpperCase() + userName.slice(1)}
                      </Typography>
                      <Typography display="inline" color="#666" variant="body1" fontSize="22px">
                        <br />
                        Welcome back!
                      </Typography>
                    </Box>
                  )}
                </Grid>
                {!userName && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Enter your email"
                      variant="outlined"
                      {...register('email', {
                        required: true,
                      })}
                      error={errors.email ? true : false}
                      helperText={errors.email ? 'Email is required' : ''}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Enter your password"
                    variant="outlined"
                    type="password"
                    {...register('password', {
                      required: true,
                    })}
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
                      Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      mt: 2,
                    }}
                  >
                    Sign In
                  </Button>
                  {!userName && (
                    <Box textAlign="center" mt={2}>
                      <Typography display="inline" variant="caption" color="#999">
                        Not registered yet?&nbsp;
                      </Typography>
                      <Link href="/signup" passHref>
                        <Typography display="inline" color="primary" fontWeight="bold" variant="caption" style={{ cursor: 'pointer' }}>
                          Click here&nbsp;
                        </Typography>
                      </Link>
                      <Typography display="inline" variant="caption" color="#999">
                        to create an account
                      </Typography>
                    </Box>
                  )}
                  {webAuthnEnabled && (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={AuthenticateWithBiometrics}
                      startIcon={<FontAwesomeIcon icon={faFingerprint} />}
                      sx={{
                        mt: 2,
                      }}
                    >
                      with biometrics
                    </Button>
                  )}
                  {userName && !pressedLogOut && (
                    <Box textAlign="center" mt={2}>
                      <Typography display="inline" variant="caption" color="#999">
                        Not you?&nbsp;
                      </Typography>
                      <Typography
                        display="inline"
                        color="primary"
                        fontWeight="bold"
                        variant="caption"
                        onClick={() => handlePressedLogOut()}
                        style={{ cursor: 'pointer' }}
                      >
                        Click here&nbsp;
                      </Typography>
                      <Typography display="inline" variant="caption" color="#999">
                        to log in with your email and password.
                      </Typography>
                    </Box>
                  )}
                  {userName && pressedLogOut && (
                    <Box>
                      <Button fullWidth color="error" variant="text" onClick={() => handleLogout()} sx={{ mt: 2 }}>
                        yes, log me out
                      </Button>
                      <Typography variant="caption" color="#999" textAlign="center" mt={2}>
                        After logging out, you will have to enter your <strong>email</strong> and <strong>password</strong> again.
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {error.status && (
                    <Typography variant="caption" fontSize="10px" color="error">
                      {error.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};
