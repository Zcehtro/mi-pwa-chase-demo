import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, FC, useContext, useEffect, useState } from 'react';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { USERContext } from '../context/user';
import Link from 'next/link';
import {
  platformAuthenticatorIsAvailable,
  browserSupportsWebAuthn,
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';

import { authenticate, BASE_URL, registration } from '../libs/auth';
import axios from 'axios';

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  TextField,
  Typography,
  Divider,
} from '@mui/material';

{
  /* Form input definitions */
}
type Inputs = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  return (
    <AuthLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 420, backgroundColor: 'primary.main' }}
        paddingY={7}
      >
        {/* Company Logo */}
        <Typography variant="h3" color="white" fontWeight="bold" textAlign="center">
          LOGO
        </Typography>

        {/*Login Form */}
        <LoginForm />
      </Box>
      {/* Links */}
      <BottomLinks />
    </AuthLayout>
  );
};

const LoginForm: FC = () => {
  const { loginUser, logoutUser, isLoggedIn, registerWebauthn, email } = useContext(USERContext);
  const [webAuthnModal, setWebAuthnModal] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post('https://pwa-chase-api.vercel.app/api/signin', {
        email,
        password,
      });

      const user = res.data.user;

      const webAuthnAvailable = await platformAuthenticatorIsAvailable();

      loginUser(
        user._id,
        user.name,
        user.surname,
        user.email,
        user.password,
        user.publicKey,
        true,
        user.webAuthnEnabled,
      );
      if (!user.webAuthnEnabled && webAuthnAvailable) {
        setWebAuthnModal(true);
      }

      //if is webauthn enabled
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!webAuthnModal && isLoggedIn) router.push("/");
  // }, [isLoggedIn, router, webAuthnModal]);

  // const WebauthnRegistration = async () => {
  //   registration().then((success) => {
  //     console.log("WebAuthn Registration Success:", success);
  //     router.push("/");
  //     axios({
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       url: "https://pwa-chase-api.vercel.app/api/enablewebauthn",
  //       data: {
  //         email,
  //       },
  //     });
  //   });
  // };
  const webauthnRegistration = async () => {
    const resp = await fetch(`${BASE_URL}/generate-registration-options`);
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
      if (err.name === 'InvalidStateError') {
        console.error('[DEBUG] Error: Authenticator was probably already registered by user');
      } else {
        console.error('[DEBUG] Error:', err);
      }

      throw err;
    }
    const verificationResp = await fetch(`${BASE_URL}/verify-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attResp),
    });

    const verificationJSON = await verificationResp.json();
    console.log('[DEBUG] Server Response', JSON.stringify(verificationJSON, null, 2));

    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] `Authenticator registered!`');
    } else {
      console.log(
        '[DEBUG]',
        `Oh no, something went wrong! Response: <pre>${JSON.stringify(verificationJSON)}</pre>`,
      );
    }
  };

  // useEffect(() => {
  //   const auth = async () => {
  //     const res = await axios.get(`${BASE_URL}/generate-authentication-options`);
  //     const opts = res.data;
  //     console.log("[DEBUG] Get generate-authentication-options", res);
  //     console.log("[DEBUG] Authentication Options (Autofill)", opts);

  //     //Assertion
  //     startAuthentication(opts, true)
  //       .then(async (asseResp) => {
  //         console.log("[DEBUG] startAuthentication: asseResp: ", asseResp);
  //         const verificationResp = await axios({
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           url: `${BASE_URL}/verify-authentication`,
  //           data: JSON.stringify(asseResp),
  //         });
  //         const verificationJSON = verificationResp.data;

  //         if (!verificationJSON && !verificationJSON.verified) {
  //           console.log("[DEBUG] Authentication Failed:", verificationJSON);
  //         } else {
  //           console.log("[DEBUG] Authentication Successful:", verificationJSON);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("[ERROR] Authentication Failed", err);
  //       });
  //   };

  //   auth();
  // }, []);

  const auth = async () => {
    const resp = await fetch(`${BASE_URL}/generate-authentication-options`);
    let asseResp;

    try {
      const opts = await resp.json();
      console.log('[DEBUG] Authentication Options', JSON.stringify(opts, null, 2));

      asseResp = await startAuthentication(opts);
      console.log('[DEBUG] Authentication Response', JSON.stringify(asseResp, null, 2));
    } catch (error) {
      console.error('[DEBUG] error:', error);

      throw error;
    }

    const verificationResp = await fetch(`${BASE_URL}/verify-authentication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(asseResp),
    });

    const verificationJSON = await verificationResp.json();
    console.log('[DEBUG] Server Response', JSON.stringify(verificationJSON, null, 2));

    if (verificationJSON && verificationJSON.verified) {
      console.log('[DEBUG] User authenticated!');
    } else {
      console.log(
        '[DEBUG] error',
        `Oh no, something went wrong! Response: <pre>${JSON.stringify(verificationJSON)}</pre>`,
      );
    }
    // //Assertion
    // startAuthentication(opts)
    //   .then(async (asseResp) => {
    //     console.log("[DEBUG] startAuthentication: asseResp: ", asseResp);

    //     try {
    //       const verificationResp = await axios({
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         url: `${BASE_URL}/verify-authentication`,
    //         data: JSON.stringify(asseResp),
    //       });
    //       const verificationJSON = verificationResp.data;

    //       if (!verificationJSON && !verificationJSON.verified) {
    //         console.log("[DEBUG] Authentication Failed:", verificationJSON);
    //       } else {
    //         console.log("[DEBUG] Authentication Successful:", verificationJSON);
    //       }
    //     } catch (error) {
    //       console.error("[DEBUG] [ERROR] verify-authentication", error);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("[DEBUG] [ERROR] Authentication Failed", err);
    //   });
  };

  const handleSignIn = () => {
    auth();
  };

  const handleRegisterWebAuthn = () => {
    webauthnRegistration();
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && browserSupportsWebAuthn()) {
      console.log('[DEBUG] supportsWebAuthn');
    } else {
      console.log('[DEBUG] No supportsWebAuthn');
    }
  }, []);

  return (
    <Fragment>
      {webAuthnModal ? (
        <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h5" color="primary" fontWeight="bold" textAlign="center">
              WebAuthn
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography
              variant="body1"
              color="#555"
              fontSize="15px"
              fontWeight="bold"
              textAlign="center"
            >
              ¿Do you want to register WebAuthn for 2fa?
            </Typography>
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={webauthnRegistration}>
              Yes
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              //on click navigate to home
              onClick={() => router.push('/')}
            >
              No
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 350, mt: 5, paddingY: 3, borderRadius: '10px' }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                {/*Email Input */}
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
                {/*Password Input */}
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
                {/*Remember Me Checkbox */}
                <Grid item xs={6}>
                  <Checkbox defaultChecked />
                  <Typography variant="caption" color="primary">
                    Remember me
                  </Typography>
                </Grid>
                {/*Use token checkbox */}
                <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                  <Link href="/forgot-password">
                    <Typography variant="caption" color="primary">
                      ¿Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                {/*Submit button */}
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" onClick={handleSignIn} sx={{ mt: 2 }}>
                    Sign In
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleRegisterWebAuthn}
                    sx={{ mt: 2 }}
                  >
                    Register WebAuthn
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};

const BottomLinks: FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2} flexWrap="wrap">
      <Link href="/about">
        <Typography color="primary.main" fontWeight="bold" component="a">
          About
        </Typography>
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link href="/signup">
        <Typography color="primary.main" fontWeight="bold" component="a">
          Open an Account
        </Typography>
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link href="/privacy">
        <Typography color="primary.main" fontWeight="bold" component="a">
          Privacy
        </Typography>
      </Link>
    </Box>
  );
};

export default SignIn;

/*
  const credential = await navigator.credentials.create({
        publicKey: {
          rp: {
            name: "Chase",
          },
          user: {
            id: new TextEncoder().encode(user._id),
            name: user.name,
            displayName: user.name,
          },
          challenge: new TextEncoder().encode("challenge"),
          pubKeyCredParams: [
            {
              type: "public-key",
              alg: -7,
            },
          ],
          authenticatorSelection: {
            authenticatorAttachment: "cross-platform",
            requireResidentKey: false,
            userVerification: "preferred",
          },
          timeout: 60000,
          attestation: "direct",
        },
      });
*/
