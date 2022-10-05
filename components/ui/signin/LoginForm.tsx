import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { startAuthentication } from '@simplewebauthn/browser';
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthentication from '../../../hooks/useAuthentication';
import axios from '../../../libs/axios';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const { User, Auth, Logout } = useAuthentication();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webAuthnEnabled, setWebAuthnEnabled] = useState(false);
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [pressedLogOut, setPressedLogOut] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const req = await axios.post('/api/signin', data);

    const { user } = req.data;

    if (user) Auth(user);
  };

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
        message: `catch block:72 -> ${JSON.stringify(error, null, 2)}`,
      });
    }

    try {
      const opts = resp.data as PublicKeyCredentialCreationOptionsJSON;

      asseResp = await startAuthentication(opts);
    } catch (error: any) {
      setError({
        status: true,
        message: `catch block:87 -> ${JSON.stringify(error.message)}`,
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

  const handleLogout = () => {
    Logout();
  };

  const handlePressedLogOut = () => {
    setPressedLogOut(true);
  };

  return (
    <>
      {!isLoggedIn && (
        <Card sx={{ maxWidth: 350, mt: 5, paddingY: 2, borderRadius: '10px' }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {userName && (
                    <Box textAlign="center">
                      <Box>
                        <Typography display="inline" color="primary" variant="h5">
                          Hello
                        </Typography>
                        <Typography
                          display="inline"
                          color="primary"
                          variant="h5"
                          style={{ fontWeight: 'bold' }}
                        >
                          {' '}
                          {userName}
                        </Typography>
                        <Typography display="inline" color="primary" variant="h5">
                          , welcome back!
                        </Typography>
                      </Box>
                      <Box>
                        <Typography display="inline" style={{ fontSize: '0.8rem' }}>
                          Not you? Click
                        </Typography>
                        <Typography
                          display="inline"
                          color="primary"
                          style={{ fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={() => handleLogout()}
                        >
                          {' '}
                          here{' '}
                        </Typography>
                        <Typography display="inline" style={{ fontSize: '0.8rem' }}>
                          to log in with your email and password.
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Grid>
                {!userName && (
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
                )}
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
                  {!userName && (
                    <Box textAlign="center" mt={1}>
                      <Typography mt={2} display="inline" style={{ fontSize: '0.9rem' }}>
                        Dont have an account? Click{' '}
                      </Typography>
                      <Link href="/signup">
                        <Typography
                          mt={2}
                          display="inline"
                          color="primary"
                          style={{ fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}
                        >
                          HERE
                        </Typography>
                      </Link>
                      <Typography mt={2} display="inline" style={{ fontSize: '0.9rem' }}>
                        {' '}
                        to Sign Up and open an account!
                      </Typography>
                    </Box>
                  )}
                  {webAuthnEnabled && (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={AuthenticateWithBiometrics}
                      startIcon={<FontAwesomeIcon icon={faFingerprint} />}
                      sx={{ mt: 2 }}
                    >
                      with biometrics
                    </Button>
                  )}
                  {userName && !pressedLogOut && (
                    <Box>
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={() => handlePressedLogOut()}
                        sx={{ mt: 2 }}
                      >
                        Log out
                      </Button>
                    </Box>
                  )}
                  {userName && pressedLogOut && (
                    <Box>
                      <Button
                        fullWidth
                        color="error"
                        variant="contained"
                        onClick={() => handleLogout()}
                        sx={{ mt: 2 }}
                      >
                        Confirm Log out
                      </Button>
                      <Typography mt={2} align="center" style={{ fontSize: '0.9rem' }}>
                        After logging out, you will have to enter your email and password again.
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
