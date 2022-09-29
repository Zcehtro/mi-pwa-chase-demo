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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webAuthnEnabled, setWebAuthnEnabled] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setIsLoggedIn(User.isLoggedIn);
    setWebAuthnEnabled(User.webAuthnEnabled);
  }, [User]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

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
    let resp: any;
    let asseResp;

    try {
      resp = await axios.post('/api/auth/generate-authentication-options', {
        id: User.email,
      });
    } catch (error) {
      //! IN SCREEN DEBUG
      setError({
        status: true,
        message: `catch block:72 -> ${JSON.stringify(error, null, 2)}`,
      });
    }

    try {
      const opts = resp.data;
      asseResp = await startAuthentication(opts, false);
    } catch (error: any) {
      //! IN SCREEN DEBUG
      setError({
        status: true,
        message: `catch block:87 -> ${JSON.stringify(error.message)}`,
      });
      // throw error;
      return;
    }

    const verificationResp = await axios.post('/api/auth/verify-authentication', {
      attestation: asseResp,
      id: User.email,
    });

    const verificationJSON = await verificationResp.data;

    let msg;
    if (verificationJSON && verificationJSON.verified) {
      //? Authenticate User
      const req = await axios.post('/api/user', {
        email: User.email,
      });

      const user = req.data;

      if (user) {
        Auth(user);
        router.push('/');
      } else {
        //! IN SCREEN DEBUG
        setError({
          status: true,
          message: 'User was not found in database',
        });
      }
    } else {
      msg = `Oh no, something went wrong! Response: ${JSON.stringify(verificationJSON.error)}`;
      //! IN SCREEN DEBUG
      setError({
        status: true,
        message: msg,
      });
    }
  };

  return (
    <>
      {!isLoggedIn && (
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
